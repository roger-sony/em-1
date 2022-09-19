import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userGroupActive',
})
export class UserGroupActivePipe implements PipeTransform {
  public transform(url: string): boolean {
    return url && (url.startsWith('/user') || url.startsWith('/roles') || url.startsWith('/privileges'));
  }
}
