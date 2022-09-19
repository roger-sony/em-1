import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {NounRuleTriggerDto} from '../../api/dto/noun-rule-trigger.dto';
import {NounRuleTriggerApiService} from '../../api/noun-rule-trigger-api.service';
import {convertNounRuleTriggerDtoToModel} from '../../api/utils/convert-noun-rule-trigger-dto-to-model';
import {convertNounRuleTriggerModelToDto} from '../../api/utils/convert-noun-rule-trigger-model-to-dto';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  CreateNounRuleTriggerAction,
  CreateNounRuleTriggerSuccessAction,
  DeleteNounRuleTriggerAction,
  DeleteNounRuleTriggerSuccessAction,
  GetAllNounRuleTriggersAction,
  GetAllNounRuleTriggersSuccessAction,
  GetSingleNounRuleTriggerAction,
  GetSingleNounRuleTriggerSuccessAction,
  NounRuleTriggersActionType,
  SetNounRuleTriggersLoadedAction,
} from './noun-rule-triggers.action';

@Injectable()
export class NounRuleTriggersEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllNounRuleTriggersAction>(NounRuleTriggersActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.nounRuleTriggerApiService.getAll().pipe(
        map((dtos: NounRuleTriggerDto[]) => dtos.map(dto => convertNounRuleTriggerDtoToModel(dto))),
        mergeMap(triggers => [
          new GetAllNounRuleTriggersSuccessAction({triggers}),
          new SetNounRuleTriggersLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, triggers),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getSingle$: Observable<Action> = this.actions$.pipe(
    ofType<GetSingleNounRuleTriggerAction>(NounRuleTriggersActionType.GET_SINGLE),
    mergeMap(action => {
      const {id, ignoreErrors, onSuccess, onFailure} = action.payload;

      return this.nounRuleTriggerApiService.getById(id).pipe(
        map((dto: NounRuleTriggerDto) => convertNounRuleTriggerDtoToModel(dto)),
        mergeMap(trigger => [
          new GetSingleNounRuleTriggerSuccessAction({trigger}),
          ...createCallbackActions(onSuccess, trigger),
        ]),
        catchError(error => emitErrorActions(error, onFailure, ignoreErrors))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateNounRuleTriggerAction>(NounRuleTriggersActionType.CREATE),
    mergeMap(action => {
      const {trigger, onSuccess, onFailure} = action.payload;
      const dto = convertNounRuleTriggerModelToDto(trigger);

      return this.nounRuleTriggerApiService.create(dto).pipe(
        map((createdDto: NounRuleTriggerDto) => convertNounRuleTriggerDtoToModel(createdDto)),
        mergeMap(createdTrigger => [
          new CreateNounRuleTriggerSuccessAction({trigger: createdTrigger}),
          ...createCallbackActions(onSuccess, createdTrigger),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteNounRuleTriggerAction>(NounRuleTriggersActionType.DELETE),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.nounRuleTriggerApiService.delete(id).pipe(
        mergeMap(() => [new DeleteNounRuleTriggerSuccessAction({id}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private nounRuleTriggerApiService: NounRuleTriggerApiService) {}
}
