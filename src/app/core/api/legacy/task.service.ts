import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';
import {TaskDto} from '../dto/task.dto';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskUrl = `${WEBROOT}/tasks`;

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
      // TODO: send errors to remote logging infrastructure
      console.error(error);
      this.log(`Error: Something went wrong while trying to ${operation}. Please try again.`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.taskUrl).pipe(
      // tap(tasks => this.log(`fetched tasks`)),
      catchError(this.handleError('get Tasks', []))
    );
  }

  getTask(id: string): Observable<any> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError('get Task', [])) // The real request returns array w/ single task
    );
  }

  addTask(task: any): Observable<any> {
    const url = `${this.taskUrl}/addtask`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, task, httpOptions).pipe(
      tap((t: any) => this.log(`Success! Your task has been created.`)),
      catchError(this.handleError<any>('add Task'))
    );
  }

  updateTask(task: any): Observable<any> {
    const url = `${this.taskUrl}/${task._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, task, httpOptions).pipe(
      tap(_ => this.log(`Success! Your task has been updated.`)),
      catchError(this.handleError<any>('update Task'))
    );
  }

  deleteTask(id: string): Observable<any> {
    const url = `${this.taskUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your task has been deleted.`)),
      catchError(this.handleError('delete Task', [])) //TODO: Determine appropriate data type to mimic response
    );
  }

  // this method is for task delete confirmation
  getRelatedTaskData(id: string): Observable<any> {
    const url = `${this.taskUrl}/getrelateddata/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`Success! Your task has been deleted.`)),
      catchError(this.handleError('get related task data', [])) //TODO: Determine appropriate data type to mimic response
    );
  }

  getFieldValues(name?: string, value?: string): Observable<any> {
    let url = `${WEBROOT}/search/tasks/all`;
    if (name && value) {
      url += `?filterName=${name}&filterValue=${value}`;
    }
    return this.http.get(url).pipe(catchError(this.handleError('get field values', [])));
  }
}
