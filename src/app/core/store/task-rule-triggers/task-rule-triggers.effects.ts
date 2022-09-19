import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {TaskRuleTriggerDto} from '../../api/dto/task-rule-trigger.dto';
import {TaskRuleTriggerApiService} from '../../api/task-rule-trigger-api.service';
import {convertTaskRuleTriggerDtoToModel} from '../../api/utils/convert-task-rule-trigger-dto-to-model';
import {convertTaskRuleTriggerModelToDto} from '../../api/utils/convert-task-rule-trigger-model-to-dto';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  CreateTaskRuleTriggerAction,
  CreateTaskRuleTriggerSuccessAction,
  DeleteTaskRuleTriggerAction,
  DeleteTaskRuleTriggerSuccessAction,
  GetAllTaskRuleTriggersAction,
  GetAllTaskRuleTriggersSuccessAction,
  GetSingleTaskRuleTriggerAction,
  GetSingleTaskRuleTriggerSuccessAction,
  SetTaskRuleTriggersLoadedAction,
  TaskRuleTriggersActionType,
} from './task-rule-triggers.action';

@Injectable()
export class TaskRuleTriggersEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllTaskRuleTriggersAction>(TaskRuleTriggersActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.taskRuleTriggerApiService.getAll().pipe(
        map((dtos: TaskRuleTriggerDto[]) => dtos.map(dto => convertTaskRuleTriggerDtoToModel(dto))),
        mergeMap(triggers => [
          new GetAllTaskRuleTriggersSuccessAction({triggers}),
          new SetTaskRuleTriggersLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, triggers),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getSingle$: Observable<Action> = this.actions$.pipe(
    ofType<GetSingleTaskRuleTriggerAction>(TaskRuleTriggersActionType.GET_SINGLE),
    mergeMap(action => {
      const {id, ignoreErrors, onSuccess, onFailure} = action.payload;

      return this.taskRuleTriggerApiService.getById(id).pipe(
        map((dto: TaskRuleTriggerDto) => convertTaskRuleTriggerDtoToModel(dto)),
        mergeMap(trigger => [
          new GetSingleTaskRuleTriggerSuccessAction({trigger}),
          ...createCallbackActions(onSuccess, trigger),
        ]),
        catchError(error => emitErrorActions(error, onFailure, ignoreErrors))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateTaskRuleTriggerAction>(TaskRuleTriggersActionType.CREATE),
    mergeMap(action => {
      const {trigger, onSuccess, onFailure} = action.payload;
      const dto = convertTaskRuleTriggerModelToDto(trigger);

      return this.taskRuleTriggerApiService.create(dto).pipe(
        map((createdDto: TaskRuleTriggerDto) => convertTaskRuleTriggerDtoToModel(createdDto)),
        mergeMap(createdTrigger => [
          new CreateTaskRuleTriggerSuccessAction({trigger: createdTrigger}),
          ...createCallbackActions(onSuccess, createdTrigger),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTaskRuleTriggerAction>(TaskRuleTriggersActionType.DELETE),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.taskRuleTriggerApiService.delete(id).pipe(
        mergeMap(() => [new DeleteTaskRuleTriggerSuccessAction({id}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private taskRuleTriggerApiService: TaskRuleTriggerApiService) {}
}
