import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {mergeMap} from 'rxjs/operators';
import {
  CreateSkedTemplateAction,
  CreateSkedTemplateSuccessAction,
  CreateWeekAction,
  CreateWeekSuccessAction,
  FetchCurrentMonthAction,
  FetchCurrentMonthSuccessAction,
  FetchCurrentWeekAction,
  SchedulerActionType,
  UpdateWeekAction,
} from './scheduler.action';
import {SchedulerService} from '../../../services/scheduler.service';
import {createCallbackActions} from '../store.utils';

@Injectable()
export class SchedulerEffects {
  @Effect()
  createSked$: Observable<Action> = this.actions$.pipe(
    ofType<CreateSkedTemplateAction>(SchedulerActionType.CREATE_SKED),
    mergeMap(() => {
      // return this.projectsService.createProject(project)
      //   .pipe(
      //     mergeMap(() => ([...createCallbackActions(onSuccess)])),
      //   );
      return [new CreateSkedTemplateSuccessAction()];
    })
  );

  @Effect()
  fetchMonth$: Observable<Action> = this.actions$.pipe(
    ofType<FetchCurrentMonthAction>(SchedulerActionType.FETCH_CURRENT_MONTH),
    mergeMap(action => {
      return this.schedulerService.fetchMonth().pipe(
        mergeMap(result => {
          const {onSuccess} = action.payload;

          return [
            ...createCallbackActions(onSuccess, result[0]),
            new FetchCurrentMonthSuccessAction({month: result[0]}),
          ];
        })
      );
    })
  );

  @Effect()
  createWeek$: Observable<Action> = this.actions$.pipe(
    ofType<CreateWeekAction>(SchedulerActionType.CREATE_WEEK),
    mergeMap(action => {
      const {onSuccess, startDate} = action.payload;
      return this.schedulerService
        .createWeek({label: '', startDate})
        .pipe(
          mergeMap(result => [...createCallbackActions(onSuccess, result), new CreateWeekSuccessAction({week: result})])
        );
    })
  );

  @Effect()
  updateWeek$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateWeekAction>(SchedulerActionType.UPDATE_WEEK),
    mergeMap(action => {
      return this.schedulerService.updateWeek(action.week).pipe(
        mergeMap(() => [
          // new SetSaveInProgressAction(false),
          new FetchCurrentWeekAction(action.week._id),
        ])
      );
    })
  );

  @Effect()
  fetchCurrentWeek$: Observable<Action> = this.actions$.pipe(
    ofType<FetchCurrentWeekAction>(SchedulerActionType.FETCH_CURRENT_WEEK),
    mergeMap(action => {
      return this.schedulerService
        .fetchWeek(action.weekId)
        .pipe(mergeMap(result => [new CreateWeekSuccessAction({week: result[0]})]));
    })
  );

  constructor(private actions$: Actions, private schedulerService: SchedulerService) {}
}
