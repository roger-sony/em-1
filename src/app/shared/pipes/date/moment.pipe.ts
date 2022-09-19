import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  public transform(value: Date | Moment, format: string, utc?: boolean): string {
    if (!value) {
      return '';
    } else if (utc) {
      return moment.utc(value).format(format);
    } else {
      return moment(value).format(format);
    }
  }
}
