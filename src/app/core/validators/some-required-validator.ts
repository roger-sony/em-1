import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function someRequiredValidator(...fieldNames: string[]): ValidatorFn {
  return (form: FormGroup): ValidationErrors | null => {
    return fieldNames.some(fieldName => form.get(fieldName).value) ? null : {someRequired: true};
  };
}
