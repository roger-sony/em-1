import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'replace'})
export class ReplacePipe implements PipeTransform {
  transform(value: string, substringToReplace: string, newSubstring: string): string {
    value = value || '';
    substringToReplace = substringToReplace || '';
    newSubstring = newSubstring || '';
    return value.replace(new RegExp(substringToReplace, 'g'), newSubstring);
  }
}
