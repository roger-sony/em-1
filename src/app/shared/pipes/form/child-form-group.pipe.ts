import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

@Pipe({
  name: 'childFormGroup',
})
export class ChildFormGroupPipe implements PipeTransform {
  public transform(formGroup: AbstractControl, controlName: string): FormGroup {
    return formGroup && (formGroup.get(controlName) as FormGroup);
  }
}
