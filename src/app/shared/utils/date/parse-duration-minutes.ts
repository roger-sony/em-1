import * as moment from 'moment';

export function parseDurationMinutes(value: string): number {
  const numberValue = Number(value);
  if (!isNaN(numberValue)) {
    return numberValue;
  }

  const durationValue = String(value).toUpperCase().replace(' ', '');
  const minutes = moment.duration(`PT${durationValue}`).asMinutes();
  return Math.round(minutes);
}
