import {Pipe, PipeTransform} from '@angular/core';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {CadenceIntervalType} from '../../../core/model/form/cadence-interval-type';
import {formatCadenceFormMonthlyType} from '../../utils/plans/format-cadence-form-monthly-type';
import {formatCadenceFormWeeklyDays} from '../../utils/plans/format-cadence-form-weekly-days';

@Pipe({
  name: 'cadenceRepetition',
})
export class CadenceRepetitionPipe implements PipeTransform {
  public transform(cadenceForm: CadenceForm): string {
    if (!cadenceForm?.repetition || cadenceForm.repetition === CadenceRepetition.DoNotRepeat) {
      return 'Does not repeat';
    } else if (cadenceForm.repetition === CadenceRepetition.Custom) {
      const {intervalNumber, intervalType} = cadenceForm.custom;
      const interval =
        intervalNumber > 1 ? `${intervalNumber} ${intervalType.toLowerCase()}s` : intervalType.toLowerCase();

      switch (intervalType) {
        case CadenceIntervalType.Week:
          return `Repeats every ${interval} ${formatCadenceFormWeeklyDays(cadenceForm, false)}`;
        case CadenceIntervalType.Month:
          return `Repeats every ${interval} ${formatCadenceFormMonthlyType(cadenceForm, false)}`;
        default:
          return `Repeats every ${interval}`;
      }
    } else {
      return `Repeats ${cadenceForm.repetition.toLowerCase()}`;
    }
  }
}
