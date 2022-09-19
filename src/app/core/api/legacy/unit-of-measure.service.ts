import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';
import {UnitOfMeasureDto} from '../dto/unit-of-measure.dto';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class UnitOfMeasureService {
  private measurementUrl = `${WEBROOT}/unitofmeasures`;

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
      // TODO: Handle this error differently based on status code
      if (!(operation === 'get Measurement Configuration')) {
        this.log(`Error: Something went wrong while trying to ${operation}. Please try again.`);
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUOMConfigs(): Observable<UnitOfMeasureDto[]> {
    const url = `${this.measurementUrl}`;
    return this.http.get<UnitOfMeasureDto[]>(url).pipe(
      // tap(tasks => this.log(`fetched tasks`)),
      catchError(this.handleError('get Measurement Configuration', []))
    );
  }

  getUOMByNounSubcategory(subcategory: string): Observable<any> {
    const encodedName = encodeURIComponent(subcategory);
    const url = `${this.measurementUrl}/${encodedName}`;
    return this.http.get(url).pipe(
      // tap(tasks => this.log(`fetched tasks`)),
      catchError(this.handleError('get Measurement Configuration', []))
    );
  }

  addMeasurementConfig(config: any): Observable<any> {
    const url = `${this.measurementUrl}/addunitofmeasure`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, config, httpOptions).pipe(
      tap((t: any) => this.log(`Success! Your measurement settings have been created.`)),
      catchError(this.handleError<any>('add Measurement Settings'))
    );
  }

  updateMeasurementConfig(config: any): Observable<any> {
    const encodedName = encodeURIComponent(config.noun_subcategory);
    const url = `${this.measurementUrl}/${encodedName}`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.put(url, config, httpOptions).pipe(
      tap((t: any) => this.log(`Success! Your measurement settings have been updated.`)),
      catchError(this.handleError<any>('update Measurement Settings'))
    );
  }

  deleteMeasurementConfig(id: string): Observable<any> {
    const url = `${this.measurementUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => console.log('Unit of Measure was deleted')),
      catchError(this.handleError('delete unused Measurement Config', []))
    );
  }
}
