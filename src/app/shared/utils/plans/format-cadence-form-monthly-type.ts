import * as moment from 'moment';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceMonthlyType} from '../../../core/model/form/cadence-monthly-type';
import {getOrdinalIndicator} from '../number/get-ordinal-indicator';

export function formatCadenceFormMonthlyType(cadenceForm: CadenceForm, titleCase = true): string {
  const on = titleCase ? 'On' : 'on';
  const startDate = cadenceForm?.startDateTime || moment();

  if (cadenceForm?.custom?.monthlyType === CadenceMonthlyType.DayOfWeek) {
    const dayOfWeekInMonth = Math.ceil(startDate.date() / 7);
    return `${on} the ${dayOfWeekInMonth + getOrdinalIndicator(dayOfWeekInMonth)} ${startDate.format('dddd')}`;
  } else {
    return `${on} day ${startDate.format('D')}`;
  }
}
