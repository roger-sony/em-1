import * as moment from 'moment';
import {Moment} from 'moment';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {parseCadenceRepetition} from './parse-cadence-repetition';

export function parseCadenceDateTime(schedule: string): Moment {
  if (!schedule) {
    return null;
  }

  const repetition = parseCadenceRepetition(schedule);

  const [minute, hour, date, month, day] = removeMultipleTimes(schedule)
    .split(' ')
    .map(value => Number(value) || 0);
  const millisecond = 0;

  switch (repetition) {
    case CadenceRepetition.DoNotRepeat:
      return moment(schedule);
    case CadenceRepetition.EveryMinute:
      return moment().set({millisecond});
    case CadenceRepetition.Hourly:
      return moment().set({minute, millisecond});
    case CadenceRepetition.Daily:
      return moment().set({hour, minute, millisecond});
    case CadenceRepetition.Weekly:
      return moment().set({day, hour, minute, millisecond});
    case CadenceRepetition.Monthly:
      return moment().set({date, hour, minute, millisecond});
    case CadenceRepetition.Yearly:
      return moment().set({month, date, hour, minute, millisecond});
    default:
      return null;
  }
}

function removeMultipleTimes(schedule: string): string {
  return schedule.replace(/,[0-9,]+/g, '');
}
