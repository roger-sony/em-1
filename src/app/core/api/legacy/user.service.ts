import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';
import {UserDto} from '../dto/user.dto';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = `${WEBROOT}/users`;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  private log(message: string) {
    this.messageService.add(message);
  }

  /**
   * Handle any Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`Error: Something went wrong while trying to ${operation}. Please try again.`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.usersUrl).pipe(
      // tap(users => this.log(`fetched users`)),
      catchError(this.handleError('get Users', []))
    );
  }

  getUser(id: string): Observable<any> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError('get User', [])) //request returns array w/ single user
    );
  }

  addUser(user: any): Observable<any> {
    const url = `${this.usersUrl}/register`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, user, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your user has been created.`)),
      catchError(this.handleError<any>('add User'))
    );
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.usersUrl}/${user._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => this.log(`Success! Your user has been updated.`)),
      catchError(this.handleError<any>('update User'))
    );
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! The user has been deleted.`)),
      catchError(this.handleError('delete User', [])) //TODO: Determine appropriate data type to mimic response
    );
  }
}
