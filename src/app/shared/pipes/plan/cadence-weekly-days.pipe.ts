import {Pipe, PipeTransform} from '@angular/core';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {formatCadenceFormWeeklyDays} from '../../utils/plans/format-cadence-form-weekly-days';

@Pipe({
  name: 'cadenceWeeklyDays',
})
export class CadenceWeeklyDaysPipe implements PipeTransform {
  public transform(cadenceForm: CadenceForm): string {
    return formatCadenceFormWeeklyDays(cadenceForm);
  }
}
