import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'skedMidnightTime',
})
export class SkedMidnightTimePipe implements PipeTransform {
  transform(value: string): unknown {
    if (value === '11:59 PM') {
      return 'Midnight';
    }
    return value;
  }
}
