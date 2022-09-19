import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {WEBROOT} from '../../../app.constants';
import {MessageService} from '../../../services/message.service';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class SkedService {
  private skedTemplateUrl = `${WEBROOT}/skedtemplates`;
  private skedUrl = `${WEBROOT}/skeds`;
  private flexSkedUrl = `${WEBROOT}/flexskeds`;

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
      if (error === 'Unauthorized') {
        this.log(`Error: This task is currently in progress and cannot be deleted.`);
      } else {
        this.log(`Error: Something went wrong while trying to ${operation}. Please try again later.`);
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /*******************************************************************************
   Sked Templates
   *******************************************************************************/
  getSkedTemplate(id: string): Observable<any> {
    const url = `${this.skedTemplateUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  getSkedTemplateWithSortedTasks(id: string): Observable<any> {
    const url = `${this.skedTemplateUrl}/tasks-sorted/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  getSkedTemplates(): Observable<any> {
    return this.http.get(this.skedTemplateUrl).pipe(
      // tap(s => this.log(`fetched skeds`)),
      catchError(this.handleError('get Skeds', []))
    );
  }

  updateSkedTemplate(skedTemplate: any): Observable<any> {
    const url = `${this.skedTemplateUrl}/${skedTemplate._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, skedTemplate, httpOptions).pipe(
      tap(_ =>
        this.log(`Success! Your Sked Template has been updated. (Changes will be reflected starting next week.)`)
      ),
      catchError(this.handleError<any>('update Sked Template'))
    );
  }

  /*******************************************************************************
   Skeds
   *******************************************************************************/
  getSkeds(): Observable<any> {
    return this.http.get(this.skedUrl).pipe(
      // tap(s => this.log(`fetched skeds`)),
      catchError(this.handleError('get Skeds', []))
    );
  }

  getSked(id: string): Observable<any> {
    const url = `${this.skedUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  getSkedWithSortedTasks(id: string): Observable<any> {
    const url = `${this.skedUrl}/tasks-sorted/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  getCurrentSked(): Observable<any> {
    const url = `${this.skedUrl}/current`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  getCurrentFlexSked(): Observable<any> {
    const url = `${this.flexSkedUrl}/current`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  getSkedSubtasks(id: string): Observable<any> {
    const url = `${this.skedUrl}/subtasks/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  getFlexSkedSubtasks(id: string): Observable<any> {
    const url = `${this.flexSkedUrl}/subtasks/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched sked id=${id}`)),
      catchError(this.handleError('get Sked', []))
    );
  }

  updateSked(skedUpdate: any, skedId: string): Observable<any> {
    const url = `${this.skedUrl}/addTasksToSked/${skedId}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.patch(url, skedUpdate, httpOptions).pipe(
      tap(_ => this.log(`Success! Your sked has been updated.`)),
      catchError(this.handleError<any>('update sked task'))
    );
  }

  updatetaskinSked(task: any, skedId: string, onCurrentSked: boolean): Observable<any> {
    const message = onCurrentSked
      ? 'Success! Your sked has been updated.'
      : 'Warning: This task is from a previous sked, and your task was moved or abandoned. Your subtasks were saved.';
    const url = `${this.skedUrl}/updatetaskinSked/${skedId}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.patch(url, task, httpOptions).pipe(
      tap(_ => this.log(message)),
      catchError(this.handleError<any>('update current sked task'))
    );
  }

  updatetaskinFlexSked(task: any, skedId: string, onCurrentSked: boolean): Observable<any> {
    const message = onCurrentSked
      ? 'Success! Your sked has been updated.'
      : 'Warning: This task is from a previous sked, and your task was moved or abandoned. Your subtasks were saved.';
    const url = `${this.flexSkedUrl}/updatetaskinSked/${skedId}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.patch(url, task, httpOptions).pipe(
      tap(_ => this.log(message)),
      catchError(this.handleError<any>('update current sked task'))
    );
  }

  deletetaskinSked(instanceTaskId: any, skedId: string): Observable<any> {
    const url = `${this.skedUrl}/deleteTaskInSked/${skedId}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.patch(url, instanceTaskId, httpOptions).pipe(
      tap(_ => this.log(`Success! Your sked has been updated.`)),
      catchError(this.handleError<any>('update current sked task'))
    );
  }

  updateSkedStatus(sked: any): Observable<any> {
    const url = `${this.skedUrl}/${sked._id}/statusUpdate`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, sked, httpOptions).pipe(
      tap(_ => this.log(`Success! Your task has been updated.`)),
      catchError(this.handleError<any>('update sked task'))
    );
  }
}
