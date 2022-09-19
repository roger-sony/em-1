import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';
import {RoleDto} from '../dto/role.dto';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private rolesUrl = `${WEBROOT}/roles`;

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

  getRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(this.rolesUrl).pipe(
      // tap(roles => this.log(`fetched roles`)),
      catchError(this.handleError('get Roles', []))
    );
  }

  getRole(id: string): Observable<any> {
    const url = `${this.rolesUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched role id=${id}`)),
      catchError(this.handleError('get Role', [])) //request returns array w/ single role
    );
  }

  addRole(role: any): Observable<any> {
    const url = `${this.rolesUrl}/addrole`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, role, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your role has been created.`)),
      catchError(this.handleError<any>('add Role'))
    );
  }

  updateRole(role: any): Observable<any> {
    const url = `${this.rolesUrl}/${role._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, role, httpOptions).pipe(
      tap(_ => this.log(`Success! Your role has been updated.`)),
      catchError(this.handleError<any>('update Role'))
    );
  }

  deleteRule(id: string): Observable<any> {
    const url = `${this.rolesUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your role has been deleted.`)),
      catchError(this.handleError('delete Role', [])) //TODO: Determine appropriate data type to mimic response
    );
  }

  deleteRole(id: string): Observable<any> {
    const url = `${this.rolesUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! The role has been deleted.`)),
      catchError(this.handleError('delete Role', [])) //TODO: Determine appropriate data type to mimic response
    );
  }
}
