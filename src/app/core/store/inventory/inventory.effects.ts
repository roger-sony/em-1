import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, filter, map, mergeMap, withLatestFrom, take, switchMap} from 'rxjs/operators';
import {FieldValuesDto, SubcategoryFieldValuesDto} from '../../api/dto/field-values.dto';
import {InventoryItemDto} from '../../api/dto/inventory-item.dto';
import {InventoryApiService} from '../../api/inventory-api.service';
import {SearchApiService} from '../../api/search-api.service';
import {
  convertFieldValuesDtoToModel,
  convertSubcategoryFieldValuesDtoToModel,
} from '../../api/utils/convert-field-values-dto-to-model';
import {convertInventoryItemDtoToModel} from '../../api/utils/convert-inventory-item-dto-to-model';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  AddInventoryItemToChapterAction,
  AddInventoryItemToChapterSuccessAction,
  GetAbstractNounsAction,
  GetAbstractNounsSuccessAction,
  GetAllFieldValuesAction,
  GetAllFieldValuesSuccessAction,
  GetAllInventoryItemsAction,
  GetAllInventoryItemsSuccessAction,
  GetSubcategoryFieldValuesAction,
  GetSubcategoryFieldValuesSuccessAction,
  InventoryActionType,
  RemoveInventoryItemFromChapterAction,
  RemoveInventoryItemFromChapterSuccessAction,
  SetInventoryItemsLoadedAction,
  DeleteInventoryItemAction,
  DeleteInventoryItemSuccessAction,
} from './inventory.action';
import {selectInventoryItemsLoaded, selectInventoryItemById} from './inventory.selector';

@Injectable()
export class InventoryEffects {
  @Effect()
  public getAllItems$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllInventoryItemsAction>(InventoryActionType.GET_ALL_ITEMS),
    withLatestFrom(this.store$.pipe(select(selectInventoryItemsLoaded))),
    filter(([action, loaded]) => !loaded || action.payload.force),
    mergeMap(([action]) => {
      const {onSuccess, onFailure} = action.payload;

      return this.inventoryApiService.getAllItems().pipe(
        map((dtos: InventoryItemDto[]) =>
          dtos.map(dto => {
            // @ts-ignore
            dto.qty = dto.qty?.$numberDecimal;
            return convertInventoryItemDtoToModel(dto);
          })
        ),
        mergeMap(inventoryItems => [
          new GetAllInventoryItemsSuccessAction({inventoryItems}),
          new SetInventoryItemsLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, inventoryItems),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getAbstractNouns$: Observable<Action> = this.actions$.pipe(
    ofType<GetAbstractNounsAction>(InventoryActionType.GET_ABSTRACT_NOUNS),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.inventoryApiService.getAbstractNouns().pipe(
        mergeMap(abstractNouns => [
          new GetAbstractNounsSuccessAction({abstractNouns}),
          ...createCallbackActions(onSuccess, abstractNouns),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getAllFieldValues$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllFieldValuesAction>(InventoryActionType.GET_ALL_FIELD_VALUES),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.searchApiService.getAllFieldValues().pipe(
        map((dto: FieldValuesDto) => convertFieldValuesDtoToModel(dto)),
        mergeMap(fieldValues => [
          new GetAllFieldValuesSuccessAction({fieldValues}),
          ...createCallbackActions(onSuccess, fieldValues),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getSubcategoryFieldValues$: Observable<Action> = this.actions$.pipe(
    ofType<GetSubcategoryFieldValuesAction>(InventoryActionType.GET_SUBCATEGORY_FIELD_VALUES),
    mergeMap(action => {
      const {subcategory, onSuccess, onFailure} = action.payload;

      return this.searchApiService.getFieldValuesBySubcategory(subcategory).pipe(
        map((dto: SubcategoryFieldValuesDto) => convertSubcategoryFieldValuesDtoToModel(dto)),
        mergeMap(fieldValues => [
          new GetSubcategoryFieldValuesSuccessAction({subcategory, fieldValues}),
          ...createCallbackActions(onSuccess, fieldValues),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public deleteInventoryItem$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteInventoryItemAction>(InventoryActionType.DELETE),
    mergeMap(action => {
      const {inventoryItemId, onSuccess, onFailure} = action.payload;

      return this.inventoryApiService.deleteInventoryItem(inventoryItemId).pipe(
        mergeMap(() => [new DeleteInventoryItemSuccessAction({inventoryItemId}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public addToChapter$: Observable<Action> = this.actions$.pipe(
    ofType<AddInventoryItemToChapterAction>(InventoryActionType.ADD_TO_CHAPTER),
    mergeMap(action => {
      const {inventoryItemId, chapterId, onSuccess, onFailure} = action.payload;

      return this.store$.pipe(
        select(selectInventoryItemById(inventoryItemId)),
        take(1),
        filter(noun => !!noun),
        map(noun => ({_chapterIDs: (noun.chapterIds || []).filter(id => id !== chapterId).concat(chapterId)})),
        switchMap(nounChange => this.inventoryApiService.patch(inventoryItemId, nounChange)),
        map(dto => convertInventoryItemDtoToModel(dto)),
        mergeMap(inventoryItem => [
          new AddInventoryItemToChapterSuccessAction({inventoryItem}),
          ...createCallbackActions(onSuccess, inventoryItem),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public removeFromChapter$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveInventoryItemFromChapterAction>(InventoryActionType.REMOVE_FROM_CHAPTER),
    mergeMap(action => {
      const {inventoryItemId, chapterId, onSuccess, onFailure} = action.payload;

      return this.store$.pipe(
        select(selectInventoryItemById(inventoryItemId)),
        take(1),
        filter(noun => !!noun),
        map(noun => ({_chapterIDs: (noun.chapterIds || []).filter(id => id !== chapterId)})),
        switchMap(nounChange => this.inventoryApiService.patch(inventoryItemId, nounChange)),
        map(dto => convertInventoryItemDtoToModel(dto)),
        mergeMap(noun => [
          new RemoveInventoryItemFromChapterSuccessAction({inventoryItem: noun}),
          ...createCallbackActions(onSuccess, noun),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private inventoryApiService: InventoryApiService,
    private searchApiService: SearchApiService,
    private store$: Store<{}>
  ) {}
}
