import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'createButtonUrl',
})
export class CreateButtonUrlPipe implements PipeTransform {
  public transform(routerUrl: string): string {
    if (!routerUrl) {
      return '';
    }

    if (routerUrl.startsWith('/chapters')) {
      return '/chapters/new';
    }

    if (routerUrl.startsWith('/noun')) {
      return '/nouns/new';
    }

    if (routerUrl.startsWith('/task')) {
      return '/task/new';
    }

    if (routerUrl.startsWith('/plans')) {
      return '/plans/new';
    }

    if (routerUrl.startsWith('/rule-trigger')) {
      return '/rule-trigger/new';
    }

    if (routerUrl.startsWith('/user')) {
      return '/user/new';
    }

    if (routerUrl.startsWith('/role')) {
      return '/role/new';
    }

    return '';
  }
}
