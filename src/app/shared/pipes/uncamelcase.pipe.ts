import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'unCamelCase'})
export class UnCamelCasePipe implements PipeTransform {
  transform(value: string): string {
    value = value || '';
    const unCamelCased = value.split(/(?=[A-Z])/).join(' ');
    const formattedValue = unCamelCased.charAt(0).toUpperCase() + unCamelCased.substr(1);
    return formattedValue;
  }
}
