import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'skedName',
})
export class SkedNamePipe implements PipeTransform {
  public transform(sked: string): string {
    if (sked?.length !== 4) {
      return sked;
    }

    const skedDay = sked?.slice(0, 2);
    const day = moment.utc(skedDay, 'dd').format('dddd');

    const skedHour = String((Number(sked.slice(2)) - 1) * 2);
    const time = moment.utc(skedHour, 'H').format('ha');

    return `${day} ${time} sked`;
  }
}
