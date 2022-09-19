import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, withLatestFrom} from 'rxjs/operators';
import {detectTriggerFormPage} from '../../../shared/utils/plans/detect-trigger-from-page';
import {CadenceForm, CadenceFormPage} from '../../model/form/cadence-form';
import {TriggerForm, TriggerFormPage} from '../../model/form/trigger-form';
import {selectRouterParam} from '../router/router.selector';
import {
  FormsActionType,
  UpdateCadenceFormAction,
  UpdateCadenceFormSuccessAction,
  UpdateTriggerFormAction,
  UpdateTriggerFormSuccessAction,
} from './forms.action';

@Injectable()
export class FormsEffects {
  @Effect()
  public updateCadence$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateCadenceFormAction>(FormsActionType.UPDATE_CADENCE),
    withLatestFrom(
      this.store$.pipe(select(selectRouterParam('planId'))),
      this.store$.pipe(select(selectRouterParam('cadencePlanId'))),
      this.store$.pipe(select(selectRouterParam('cadenceId')))
    ),
    map(([action, planId, cadencePlanId, cadenceId]) => {
      const page: CadenceFormPage = planId ? CadenceFormPage.SetCadence : CadenceFormPage.CreatePlan;
      const cadenceForm: CadenceForm = {
        ...action.payload.cadenceForm,
        planId: cadencePlanId || planId,
        cadenceId,
        page: action.payload.page || page,
      };
      return new UpdateCadenceFormSuccessAction({cadenceForm});
    })
  );

  @Effect()
  public updateTrigger$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateTriggerFormAction>(FormsActionType.UPDATE_TRIGGER),
    withLatestFrom(
      this.store$.pipe(select(selectRouterParam('planId'))),
      this.store$.pipe(select(selectRouterParam('triggerId')))
    ),
    map(([action, planId, triggerId]) => {
      const page: TriggerFormPage = detectTriggerFormPage(planId, triggerId);
      const triggerForm: TriggerForm = {...action.payload.triggerForm, page};
      return new UpdateTriggerFormSuccessAction({triggerForm});
    })
  );

  constructor(private actions$: Actions, private store$: Store<{}>) {}
}
