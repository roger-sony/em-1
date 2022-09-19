import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {NounTriggerFormControl, TaskTriggerFormControl, TriggerFormControl} from './trigger-form-control';
import {TriggerFormType} from '../../../core/model/form/trigger-form-type';

export function triggerFormValidator(required: boolean): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    const type = form.get(TriggerFormControl.Type).value;
    const nounId = form.get(TriggerFormControl.Noun).get(NounTriggerFormControl.Id).value;
    const nounName = form.get(TriggerFormControl.Noun).get(NounTriggerFormControl.DisplayName).value;
    const taskId = form.get(TriggerFormControl.Task).get(TaskTriggerFormControl.Id).value;
    const taskName = form.get(TriggerFormControl.Task).get(TaskTriggerFormControl.DisplayName).value;
    const taskEvent = form.get(TriggerFormControl.Task).get(TaskTriggerFormControl.Event).value;

    if (required && type === TriggerFormType.Noun && !nounId) {
      return {nounId: true};
    }

    if (type === TriggerFormType.Noun && nounName && !nounId) {
      return {nounId: true};
    }

    if (required && type === TriggerFormType.Task && !taskId) {
      return {taskId: true};
    }

    if (type === TriggerFormType.Task && taskName && !taskId) {
      return {taskId: true};
    }

    if (type === TriggerFormType.Task && taskId && !taskEvent) {
      return {taskEvent: true};
    }

    return null;
  };
}
