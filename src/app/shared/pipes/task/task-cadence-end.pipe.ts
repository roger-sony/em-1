import {Pipe, PipeTransform} from '@angular/core';
import {CadenceEndType} from 'src/app/core/model/form/cadence-end-type';
import {CadenceForm} from 'src/app/core/model/form/cadence-form';
import * as moment from 'moment';

@Pipe({
  name: 'taskCadenceEnd',
})
export class TaskCadenceEndPipe implements PipeTransform {
  public transform(cadenceForm: CadenceForm): string {
    switch (cadenceForm?.end?.endType) {
      case CadenceEndType.EndDate:
        return `ends on ${moment(cadenceForm.end.endDate)?.format('dddd, MMM D')}`;
      case CadenceEndType.MaxSkedsNumber:
        return `ends after ${cadenceForm.end.maxSkedsNumber} skeds`;
      default:
        return 'does not end';
    }
  }
}
