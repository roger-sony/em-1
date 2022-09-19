import {Pipe, PipeTransform} from '@angular/core';
import {CadenceForm} from '../../../core/model/form/cadence-form';

@Pipe({
  name: 'cadenceStart',
})
export class CadenceStartPipe implements PipeTransform {
  public transform(cadenceForm: CadenceForm): string {
    if (cadenceForm?.startDateTime) {
      return `Starts on ${cadenceForm.startDateTime.format('MMM D')}`;
    } else {
      return '';
    }
  }
}
