import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {GetAllUsersAction} from '../core/store/users/users.action';
import {GetAllRolesAction} from '../core/store/roles/roles.action';
import {selectAllUsers} from '../core/store/users/users.selector';
import {selectAllRoles} from '../core/store/roles/roles.selector';
import {combineLatest, Observable} from 'rxjs';
import {User} from '../core/model/user';
import {Role} from '../core/model/role';
import {SetActiveUser, SetActiveUserPrivileges} from '../core/store/active-user/active-user.action';

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  private users$: Observable<User[]>;
  private roles$: Observable<Role[]>;

  constructor(private store: Store) {}

  async initApp() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || null);

    if (currentUser) {
      this.store.dispatch(new GetAllUsersAction({}));
      this.store.dispatch(new GetAllRolesAction({}));

      this.users$ = this.store.pipe(select(selectAllUsers));
      this.roles$ = this.store.pipe(select(selectAllRoles));

      return new Promise(resolve => {
        combineLatest([this.users$, this.roles$]).subscribe(([users, roles]) => {
          if (users.length && roles.length) {
            const user = users.find(u => u.userName === currentUser.username);
            const filteredRoles = roles.filter(r => user.roles.includes(r.id));
            const uniquePrivileges = Array.from(
              new Set<string>(filteredRoles.reduce((res, cur) => [...res, ...cur.privileges], []).map(p => p.name))
            );

            if (user && uniquePrivileges) {
              this.store.dispatch(new SetActiveUser({user}));
              this.store.dispatch(new SetActiveUserPrivileges({privileges: uniquePrivileges}));
            }

            resolve(true);
          }
        });
      });
    } else {
      return Promise.resolve(true);
    }
  }
}
