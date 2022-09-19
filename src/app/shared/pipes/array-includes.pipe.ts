import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'arrayIncludes',
})
export class ArrayIncludesPipe implements PipeTransform {
  public transform(array: unknown[], item: unknown): boolean {
    return (array || []).includes(item);
  }
}
