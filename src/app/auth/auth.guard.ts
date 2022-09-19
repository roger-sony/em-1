import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.continueOrRedirectToLogin(state.url);
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean {
    const redirectUrl = segments.reduce((url, segment) => url + '/' + segment.path, '');
    return this.continueOrRedirectToLogin(redirectUrl);
  }

  private continueOrRedirectToLogin(returnUrl: string): boolean {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl}});
    return false;
  }
}
