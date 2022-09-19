import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {WEBROOT} from '../../../app.constants';
import {MessageService} from '../../../services/message.service';
import {DecisionTableDto} from '../dto/decision-table.dto';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class DecisionTableService {
  private dTableUrl = `${WEBROOT}/dtable`;

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

  getDTables(): Observable<DecisionTableDto[]> {
    return this.http.get<DecisionTableDto[]>(this.dTableUrl).pipe(
      // tap(facts => this.log(`fetched work order templates`)),
      catchError(this.handleError('get Decision Tables', []))
    );
  }

  getDTable(id: string): Observable<any> {
    const url = `${this.dTableUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => console.log(`fetched dtable`, _)),
      catchError(this.handleError('get Decision Table', [])) // The real request returns array w/ single fact
    );
  }

  addDTable(dt: any): Observable<any> {
    const url = `${this.dTableUrl}/addDTable`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, dt, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your decision table has been saved.`)),
      catchError(this.handleError<any>('add Decision Table'))
    );
  }

  updateDTable(dt: any): Observable<any> {
    const url = `${this.dTableUrl}/${dt._id}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, dt, httpOptions).pipe(
      tap(_ => this.log(`Success! Your Decision Table has been updated.`)),
      catchError(this.handleError<any>('update Decision Table'))
    );
  }

  deleteDTable(id: string): Observable<any> {
    const url = `${this.dTableUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your Decision Table has been deleted.`)),
      catchError(this.handleError('delete Decision Table', []))
    );
  }

  getRelatedData(dTableId: string): Observable<any> {
    const url = `${this.dTableUrl}/getRelatedData/${dTableId}`;
    return this.http.get(url).pipe(
      // tap(_ => console.log(`fetched dtable`, _)),
      catchError(this.handleError('get data related to Decision Table', []))
    );
  }

  getCurrentSkedDTables(): Observable<any> {
    const url = `${this.dTableUrl}/returnRunFromSked`;
    return this.http.get(url).pipe(
      // tap(_ => console.log(`fetched dtable`, _)),
      catchError(this.handleError('get Decision Tables associated with current Sked', []))
    );
  }
}
