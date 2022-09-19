import {Pipe, PipeTransform} from '@angular/core';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceEndType} from '../../../core/model/form/cadence-end-type';
import * as moment from 'moment';
@Pipe({
  name: 'cadenceEnd',
})
export class CadenceEndPipe implements PipeTransform {
  public transform(cadenceForm: CadenceForm): string {
    switch (cadenceForm?.end?.endType) {
      case CadenceEndType.EndDate:
        return `Ends on ${moment(cadenceForm.end.endDate)?.format('dddd, MMM D')}`;
      case CadenceEndType.MaxSkedsNumber:
        return `Ends after ${cadenceForm.end.maxSkedsNumber} skeds`;
      default:
        return 'Does not end';
    }
  }
}
