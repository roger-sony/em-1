import {Pipe, PipeTransform} from '@angular/core';
import {SkedDay} from './sked-day';

@Pipe({
  name: 'skedDayName',
})
export class SkedDayNamePipe implements PipeTransform {
  public transform(skedDay: string): string {
    switch (skedDay) {
      case SkedDay.CurrentSked:
        return 'Current Sked';
      case SkedDay.Monday:
        return 'Monday';
      case SkedDay.Tuesday:
        return 'Tuesday';
      case SkedDay.Wednesday:
        return 'Wednesday';
      case SkedDay.Thursday:
        return 'Thursday';
      case SkedDay.Friday:
        return 'Friday';
      case SkedDay.Saturday:
        return 'Saturday';
      case SkedDay.Sunday:
        return 'Sunday';
      default:
        return '';
    }
  }
}
