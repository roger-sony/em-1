import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WEBROOT} from '../../../app.constants';
import {MessageService} from '../../../services/message.service';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private actionsUrl = `${WEBROOT}/actions`;
  private historicalActionsUrl = `${WEBROOT}/historicalactions`;

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

  getActions(): Observable<any> {
    return this.http.get(this.actionsUrl).pipe(
      // tap(facts => this.log(`fetched work order templates`)),
      catchError(this.handleError('get Actions', []))
    );
  }

  deleteAction(id: string): Observable<any> {
    const url = `${this.actionsUrl}/${id}`;
    return this.http.delete(url).pipe(
      // tap(_ => console.log(`fetched dtable`, _)),
      catchError(this.handleError('delete Action', [])) // The real request returns array w/ single fact
    );
  }

  getHistoricalActions(): Observable<any> {
    return this.http.get(this.historicalActionsUrl).pipe(
      // tap(facts => this.log(`fetched work order templates`)),
      catchError(this.handleError('get Actions', []))
    );
  }
}
