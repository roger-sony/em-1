import {createSelector} from '@ngrx/store';
import {CadenceFormPage} from '../../model/form/cadence-form';
import {TriggerFormPage} from '../../model/form/trigger-form';
import {AppState} from '../app-state';
import {selectRouterParam} from '../router/router.selector';

export const selectFormsState = (state: AppState) => state.forms;

export const selectCadenceForm = createSelector(selectFormsState, forms => forms.cadence);
export const selectCadenceFormByPage = (page: CadenceFormPage) =>
  createSelector(
    selectCadenceForm,
    selectRouterParam('planId'),
    selectRouterParam('cadencePlanId'),
    selectRouterParam('cadenceId'),
    (cadenceForm, planId, cadencePlanId, cadenceId) => {
      if (cadenceForm?.page !== page) {
        return null;
      }

      if (page === CadenceFormPage.CreatePlan) {
        return cadenceForm;
      } else if (page === CadenceFormPage.SetCadence) {
        return cadenceForm?.planId === (cadencePlanId || planId) && cadenceForm.cadenceId === cadenceId
          ? cadenceForm
          : null;
      }
    }
  );

export const selectPlanForm = createSelector(selectFormsState, forms => forms.plan);

export const selectTaskForm = createSelector(selectFormsState, forms => forms.task);

export const selectTriggerForm = createSelector(selectFormsState, forms => forms.trigger);
export const selectTriggerFormByPage = (page: TriggerFormPage) =>
  createSelector(selectTriggerForm, triggerForm => (triggerForm?.page === page ? triggerForm : null));

export const selectChapterForm = createSelector(selectFormsState, forms => forms.chapter);

export const selectTaskFormEdited = createSelector(selectFormsState, forms => forms.taskFormEdited);
