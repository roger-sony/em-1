import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Pipe({
  name: 'childFormControl',
})
export class ChildFormControlPipe implements PipeTransform {
  public transform(formGroup: AbstractControl, controlName: string): AbstractControl {
    return formGroup && formGroup.get(controlName);
  }
}
