import {Pipe, PipeTransform} from '@angular/core';

const MORE_URLS = ['/nouns', '/reports', '/metrics', '/users', '/mobile-sked'];

@Pipe({
  name: 'moreButtonActive',
})
export class MoreButtonActivePipe implements PipeTransform {
  public transform(routerUrl: string, hideNouns?: boolean): boolean {
    return routerUrl && MORE_URLS.filter(url => !hideNouns || url !== '/nouns').some(url => routerUrl.startsWith(url));
  }
}
