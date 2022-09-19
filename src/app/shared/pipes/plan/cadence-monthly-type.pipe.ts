import {Pipe, PipeTransform} from '@angular/core';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {formatCadenceFormMonthlyType} from '../../utils/plans/format-cadence-form-monthly-type';

@Pipe({
  name: 'cadenceMonthlyType',
})
export class CadenceMonthlyTypePipe implements PipeTransform {
  public transform(cadenceForm: CadenceForm): string {
    return formatCadenceFormMonthlyType(cadenceForm);
  }
}
