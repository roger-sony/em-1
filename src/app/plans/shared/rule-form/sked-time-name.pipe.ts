import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'skedTimeName',
})
export class SkedTimeNamePipe implements PipeTransform {
  public transform(skedTime: string): string {
    switch (skedTime) {
      case '01':
        return '12am';
      case '02':
        return '2am';
      case '03':
        return '4am';
      case '04':
        return '6am';
      case '05':
        return '8am';
      case '06':
        return '10am';
      case '07':
        return '12pm';
      case '08':
        return '2pm';
      case '09':
        return '4pm';
      case '10':
        return '6pm';
      case '11':
        return '8pm';
      case '12':
        return '10pm';
      default:
        return '';
    }
  }
}
