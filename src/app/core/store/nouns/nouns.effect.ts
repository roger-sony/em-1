import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  CreateNounAction,
  CreateNounSuccessAction,
  GetNounsAction,
  GetNounsSuccessAction,
  GetPossibleColumnsAction,
  GetPossibleColumnsSuccessAction,
  NounsActionType,
  SetNounsLoadedAction,
  UpdateNounAction,
} from './nouns.action';
import {selectNounsLoaded, selectPossibleColumns} from './nouns.selector';
import {InventoryService} from '../../api/legacy/inventory.service';
import {InventoryAttributesDto} from '../../api/dto/inventory-attributes.dto';
import {NounsApiService} from '../../api/nouns-api.service';
import {GetAllAdjectivesAction} from '../adjectives/adjectives.action';
import {convertNounDtoToModel} from '../../api/utils/convert-noun-dto-to-model';
import {NounFromServiceDto} from '../../api/dto/noun.dto';
import {convertNounModelToDto} from '../../api/utils/convert-noun-model-to-dto';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class NounsEffects {
  @Effect()
  public get$: Observable<Action> = this.actions$.pipe(
    ofType<GetNounsAction>(NounsActionType.GET),
    withLatestFrom(this.store$.pipe(select(selectNounsLoaded))),
    filter(([action, loaded]) => !loaded || action.payload.force),
    mergeMap(([action]) => {
      const {queries, onSuccess, onFailure} = action.payload;

      const params: {[key: string]: string} = {};

      if (queries.sortField || queries.sortDirection) {
        params.sortBy = `${queries.sortField || 'name'} ${queries.sortDirection || 'asc'}`;
      }

      if (queries.name) {
        params.name = `${queries.name}`;
      }

      if (queries.hideDisabled) {
        params.active = 'true';
      }

      return this.nounsApiService.getFilteredNouns(new HttpParams({fromObject: params})).pipe(
        mergeMap(nouns => {
          // if (nouns?.[0]?.adjectives?.[1]) {
          //   nouns[0].adjectives[1].type = 'date';
          // }

          return [
            new GetNounsSuccessAction({nouns}),
            new SetNounsLoadedAction({loaded: true}),
            ...createCallbackActions(onSuccess, nouns),
          ];
        }),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateNounAction>(NounsActionType.CREATE),
    mergeMap(action => {
      const {noun, createBatch, batchAmount, batchStart, onSuccess, onFailure} = action.payload;

      return this.nounsApiService.createNoun({noun, createBatch, batchAmount, batchStart}).pipe(
        map((dto: NounFromServiceDto) => convertNounDtoToModel(dto)),
        mergeMap(createdNoun => [
          new CreateNounSuccessAction({noun: createdNoun}),
          new GetAllAdjectivesAction({}),
          ...createCallbackActions(onSuccess, createdNoun),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateNounAction>(NounsActionType.UPDATE),
    mergeMap(action => {
      const {noun, onSuccess, onFailure} = action.payload;

      return this.nounsApiService.updateNoun(convertNounModelToDto(noun)).pipe(
        map((dto: NounFromServiceDto) => convertNounDtoToModel(dto)),
        mergeMap(createdNoun => [
          new CreateNounSuccessAction({noun: createdNoun}),
          new GetAllAdjectivesAction({}),
          ...createCallbackActions(onSuccess, createdNoun),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getPossibleColumns$: Observable<Action> = this.actions$.pipe(
    ofType<GetPossibleColumnsAction>(NounsActionType.GET_POSSIBLE_COLUMNS),
    withLatestFrom(this.store$.pipe(select(selectPossibleColumns))),
    mergeMap(([action]) => {
      const {onSuccess, onFailure} = action.payload;

      return this.inventoryService.getItemAttributes().pipe(
        map((dtos: InventoryAttributesDto) => {
          const exceptions = ['edit_reason', 'type', 'expiry_date', 'model', 'sku'];
          const possibleColumns = Object.keys(dtos).filter(
            (i: string) => i.charAt(0) !== '_' && !exceptions.includes(i)
          );
          possibleColumns.unshift('display_name');
          possibleColumns.unshift('last_updated');
          possibleColumns.push('adjust_inventory');
          possibleColumns.push('active');
          possibleColumns.push('details');

          return possibleColumns;
        }),
        mergeMap(columns => [
          new GetPossibleColumnsSuccessAction({possibleColumns: columns}),
          ...createCallbackActions(onSuccess, columns),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private nounsApiService: NounsApiService,
    private inventoryService: InventoryService,
    private store$: Store<{}>
  ) {}
}
