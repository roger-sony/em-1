import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {RuleConsequenceFormControl} from './rule-form-control';
import {SkedDay} from './sked-day';

export const consequenceFormValidator: ValidatorFn = (form: FormGroup): ValidationErrors | null => {
  const skedDay = form.get(RuleConsequenceFormControl.SkedDay).value;
  const skedTime = form.get(RuleConsequenceFormControl.SkedTime).value;

  if (skedDay !== SkedDay.CurrentSked && !skedTime) {
    return {skedTime: true};
  }

  return null;
};
