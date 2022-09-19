import {TriggerFormPage} from '../../../core/model/form/trigger-form';

export function detectTriggerFormPage(planId: string, triggerId: string): TriggerFormPage {
  if (planId && triggerId) {
    return TriggerFormPage.EditTrigger;
  } else if (planId) {
    return TriggerFormPage.AddTrigger;
  } else {
    return TriggerFormPage.CreatePlan;
  }
}
