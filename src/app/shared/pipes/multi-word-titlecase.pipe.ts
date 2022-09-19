import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'multiWordTitlecase',
})
export class MultiWordTitlecasePipe implements PipeTransform {
  transform(value: string): string {
    return `${value[0]?.toUpperCase()}${value?.slice(1)}` || '';
  }
}
