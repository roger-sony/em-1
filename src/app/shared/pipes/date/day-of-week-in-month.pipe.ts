import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Pipe({
  name: 'dayOfWeekInMonth',
})
export class DayOfWeekInMonthPipe implements PipeTransform {
  public transform(value: Date | Moment): number {
    return Math.ceil(moment(value).date() / 7);
  }
}
