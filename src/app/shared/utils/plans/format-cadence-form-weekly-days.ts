import * as moment from 'moment';
import {CadenceForm} from '../../../core/model/form/cadence-form';

export function formatCadenceFormWeeklyDays(cadenceForm: CadenceForm, titleCase = true): string {
  const startDate = cadenceForm?.startDateTime || moment();
  const weeklyDays = cadenceForm?.custom?.weeklyDays || [startDate.day()];

  return `${titleCase ? 'On' : 'on'} ${weeklyDays.map(day => moment(String(day), 'd').format('ddd')).join(', ')}`;
}
