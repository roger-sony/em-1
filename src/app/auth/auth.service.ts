import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as Sentry from '@sentry/browser';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {WEBROOT} from '../app.constants';
import {LoginDto} from '../core/api/dto/login.dto';
import {Store} from '@ngrx/store';
import {SetActiveUser, SetActiveUserPrivileges} from '../core/store/active-user/active-user.action';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  public readonly executionInterfacePermissions: string[] = [
    'Can view Execution Interface',
    'Can edit Execution Interface',
  ];
  public readonly lexiconPermissions: string[] = ['Can view Lexicon', 'Can edit Lexicon'];
  public readonly currentChapterPermissions: string[] = ['Can view Current Chapter', 'Can edit Current Chapter'];
  public readonly paragraphPermissions: string[] = ['Can view Paragraphs', 'Can edit Paragraphs'];
  public readonly chapterPermissions: string[] = ['Can view Chapters', 'Can edit Chapters'];
  public readonly usersPermissions: string[] = ['Can view Users', 'Can edit Users'];
  public readonly rolesPermissions: string[] = ['Can view Roles', 'Can edit Roles'];
  public readonly privilegesPermissions: string[] = ['Can view Privileges', 'Can edit Privileges'];

  get isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient, private store: Store) {}

  login(username: string, password: string) {
    return this.http.post<LoginDto>(`${WEBROOT}/login`, {username: username, password: password}).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.configureSentryUserScope(user.username);
          this.loggedIn.next(true);
        }
        return user;
      })
    );
  }

  logout() {
    this.store.dispatch(new SetActiveUser({user: null}));
    this.store.dispatch(new SetActiveUserPrivileges({privileges: null}));

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

    this.configureSentryUserScope(null);
    this.loggedIn.next(false);
  }

  private configureSentryUserScope(username: string) {
    if (!environment.sentryDsn) {
      return;
    }

    Sentry.configureScope(scope => {
      scope.setUser(username ? {username} : null);
    });
  }
}
