import * as moment from 'moment';
import {Moment, MomentInput} from 'moment';

export function roundTimePickerMinutes(date: MomentInput): Moment {
  if (!date) {
    return null;
  }

  const time = moment(date).add(30, 'seconds').startOf('minute');

  const minutesDiff = Math.round(time.minutes() / 5) * 5 - time.minutes();
  return time.add(minutesDiff, 'minutes');
}
