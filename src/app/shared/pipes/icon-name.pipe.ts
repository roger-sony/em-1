import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'iconName',
})
export class IconNamePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/\s+/g, '-').toLowerCase();
  }
}
