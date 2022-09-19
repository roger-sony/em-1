import * as moment from 'moment';

export function formatDurationMinutes(value: string | number): string {
  const duration = moment.duration(`PT${value}M`);
  let result = '';

  const days = duration.days();
  if (days > 0) {
    result += days === 1 ? '1 day ' : `${days} days `;
  }

  const hours = duration.hours();
  if (hours > 0) {
    result += hours === 1 ? '1 hour ' : `${hours} hours `;
  }

  const minutes = duration.minutes();
  if (minutes > 0 || result.length === 0) {
    result += minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }

  return result.trim();
}
