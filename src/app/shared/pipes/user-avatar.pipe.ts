import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userAvatar',
})
export class UserAvatarPipe implements PipeTransform {
  transform(value: string): string {
    const [firstName, lastName] = value.split(' ');
    return (firstName[0] || '') + (lastName[0] || '');
  }
}
