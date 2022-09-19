import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CadenceFormControl} from './cadence-form-control';
import {CadenceRepetition} from './cadence-repetition';

export function cadenceFormValidator(required: boolean): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    if (!required) {
      return null;
    }

    const date = form.get(CadenceFormControl.Date).value;
    const time = form.get(CadenceFormControl.Time).value;
    const repetition = form.get(CadenceFormControl.Repetition).value;

    switch (repetition) {
      case CadenceRepetition.EveryMinute:
        return null;
      case CadenceRepetition.Hourly:
      case CadenceRepetition.Daily:
        return time ? null : {time: true};
      default:
        return date && time ? null : {date: true, time: true};
    }
  };
}
