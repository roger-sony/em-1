import {Pipe, PipeTransform} from '@angular/core';

/* tslint:disable:no-any */
@Pipe({name: 'convert24To12'})
export class TimeFormatPipe implements PipeTransform {
  transform(inputTime: any, shortTime?: string): any {
    let hour = inputTime.split(':')[0];
    let min = inputTime.split(':')[1];
    const part = hour >= 12 ? 'pm' : 'am';
    min = (min + '').length === 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour.toString().charAt(0) === '0' ? hour.slice(1) : hour;
    if (hour === '0') {
      hour = '12';
    }
    if (shortTime) {
      let time = `${hour}${part}`;
      if (time === '12am') {
        time = 'Midnight';
      }
      if (time === '12pm') {
        time = 'Noon';
      }
      return time;
    }
    return `${hour}:${min} ${part}`;
  }
}

@Pipe({name: 'formatWeekday'})
export class WeekdayFormatPipe implements PipeTransform {
  transform(day: string): any {
    day = day.slice(0, 2);
    switch (day) {
      case 'MO':
        return 'Mon';
      case 'TU':
        return 'Tue';
      case 'WE':
        return 'Wed';
      case 'TH':
        return 'Thu';
      case 'FR':
        return 'Fri';
      case 'SA':
        return 'Sat';
      case 'SU':
        return 'Sun';
    }
  }
}
