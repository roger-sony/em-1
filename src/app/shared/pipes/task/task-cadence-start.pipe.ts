import {Pipe, PipeTransform} from '@angular/core';
import {CadenceForm} from 'src/app/core/model/form/cadence-form';

@Pipe({
  name: 'taskCadenceStart',
})
export class TaskCadenceStartPipe implements PipeTransform {
  public transform(cadenceForm: CadenceForm): string {
    if (cadenceForm?.startDateTime) {
      return `${cadenceForm.startDateTime.format('dddd, MMMM D - h:mma')}`;
    } else {
      return '';
    }
  }
}
