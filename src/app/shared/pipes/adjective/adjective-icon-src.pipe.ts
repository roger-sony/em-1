import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'adjectiveIconSrc',
})
export class AdjectiveIconSrcPipe implements PipeTransform {
  transform(value: string): string {
    const iconSrc = '/adjectives/';
    return `${iconSrc}${value}`;
  }
}
