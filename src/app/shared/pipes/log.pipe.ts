import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'log',
})
export class LogPipe implements PipeTransform {
  // tslint:disable-next-line:no-any
  public transform(value: any, label?: string): any {
    console.log(label || 'LogPipe', value);
    return value;
  }
}
