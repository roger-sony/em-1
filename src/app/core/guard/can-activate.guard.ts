import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  UrlSegment,
  Route,
} from '@angular/router';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectActiveUser, selectActiveUserPrivileges} from '../store/active-user/active-user.selector';
import {AuthenticationService} from '../../auth/auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate, CanLoad {
  constructor(private store: Store, private router: Router, private authenticationService: AuthenticationService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserPrivileges(route, null);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserPrivileges(route, state);
  }

  checkUserPrivileges(route: Route | ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return combineLatest([this.store.select(selectActiveUser), this.store.select(selectActiveUserPrivileges)]).pipe(
      map(([user, privileges]) => {
        if (!!user && privileges?.length) {
          const canActivate = route.data?.privileges?.every((priv: string) => privileges.includes(priv)) || true;

          if (state?.url === '/login') {
            this.router.navigate(['/dashboard']);
            return false;
          } else if (canActivate) {
            return true;
          } else {
            this.router.navigate(['/dashboard']);
            return false;
          }
        }

        if (state?.url === '/login') {
          return true;
        } else {
          this.authenticationService.logout();
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
