import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';

@Pipe({
  name: 'formArrayControl',
})
export class FormArrayControlPipe implements PipeTransform {
  public transform(formArray: FormArray, index: number): AbstractControl {
    return formArray && formArray.at(index);
  }
}
