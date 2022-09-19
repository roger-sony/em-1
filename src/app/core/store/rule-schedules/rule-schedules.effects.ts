import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {RuleScheduleDto} from '../../api/dto/rule-schedule.dto';
import {RuleScheduleApiService} from '../../api/rule-schedule-api.service';
import {convertRuleScheduleDtoToModel} from '../../api/utils/convert-rule-schedule-dto-to-model';
import {convertRuleScheduleModelToDto} from '../../api/utils/convert-rule-schedule-model-to-dto';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  CreateRuleScheduleAction,
  CreateRuleScheduleSuccessAction,
  DeleteRuleScheduleAction,
  DeleteRuleScheduleSuccessAction,
  GetAllRuleSchedulesAction,
  GetAllRuleSchedulesSuccessAction,
  GetSingleRuleScheduleAction,
  GetSingleRuleScheduleSuccessAction,
  RuleSchedulesActionType,
  SetRuleSchedulesLoadedAction,
} from './rule-schedules.action';

@Injectable()
export class RuleSchedulesEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllRuleSchedulesAction>(RuleSchedulesActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.ruleScheduleApiService.getAll().pipe(
        map((dtos: RuleScheduleDto[]) => dtos.map(dto => convertRuleScheduleDtoToModel(dto))),
        mergeMap(ruleSchedules => [
          new GetAllRuleSchedulesSuccessAction({ruleSchedules}),
          new SetRuleSchedulesLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, ruleSchedules),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getSingle$: Observable<Action> = this.actions$.pipe(
    ofType<GetSingleRuleScheduleAction>(RuleSchedulesActionType.GET_SINGLE),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.ruleScheduleApiService.getById(id).pipe(
        map((dto: RuleScheduleDto) => convertRuleScheduleDtoToModel(dto)),
        mergeMap(ruleSchedule => [
          new GetSingleRuleScheduleSuccessAction({ruleSchedule}),
          ...createCallbackActions(onSuccess, ruleSchedule),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateRuleScheduleAction>(RuleSchedulesActionType.CREATE),
    mergeMap(action => {
      const {ruleSchedule, onSuccess, onFailure} = action.payload;
      const dto = convertRuleScheduleModelToDto(ruleSchedule);

      return this.ruleScheduleApiService.create(dto).pipe(
        map((createdDto: RuleScheduleDto) => convertRuleScheduleDtoToModel(createdDto)),
        mergeMap(createdRuleSchedule => [
          new CreateRuleScheduleSuccessAction({ruleSchedule: createdRuleSchedule}),
          ...createCallbackActions(onSuccess, createdRuleSchedule),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteRuleScheduleAction>(RuleSchedulesActionType.DELETE),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.ruleScheduleApiService.delete(id).pipe(
        mergeMap(() => [new DeleteRuleScheduleSuccessAction({id}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private ruleScheduleApiService: RuleScheduleApiService) {}
}
