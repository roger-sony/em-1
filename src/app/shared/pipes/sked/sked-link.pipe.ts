import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'skedLink',
})
export class SkedLinkPipe implements PipeTransform {
  public transform(sked: string): string[] {
    if (sked?.length === 4) {
      return ['/skeds-legacy', 'templates', sked];
    }

    return ['/skeds-legacy', 'current'];
  }
}
