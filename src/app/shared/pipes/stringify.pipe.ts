import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'stringify',
})
export class StringifyPipe implements PipeTransform {
  // tslint:disable-next-line:no-any
  public transform(value: any): string {
    return value || value === 0 ? String(value) : '';
  }
}
