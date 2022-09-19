import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';
import {DecisionTableReportDto} from '../dto/decision-table-report.dto';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class DecisionTableReportsService {
  private dTableReportUrl = `${WEBROOT}/reports`;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`Error: Something went wrong while trying to ${operation}. Please try again.`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getReports(): Observable<any> {
    return this.http.get(this.dTableReportUrl).pipe(
      // tap(r => console.log(`fetched dtable reports`, r)),
      map((reports: DecisionTableReportDto[]) =>
        reports.map(r => {
          r.table_rules = r.table_rules.map((t: any) => {
            if (t.ruleResults.qty.$numberDecimal) {
              t.ruleResults.qty = parseFloat(t.ruleResults.qty.$numberDecimal);
            }
            return t;
          });
          return r;
        })
      ),
      catchError(this.handleError('get Reports', []))
    );
  }

  getReport(id: string): Observable<any> {
    const url = `${this.dTableReportUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched dtable report id=${id}`)),
      catchError(this.handleError('get Report', []))
    );
  }

  addReport(report: any): Observable<any> {
    const url = `${this.dTableReportUrl}/addReport`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, report, httpOptions).pipe(
      tap((r: any) => this.log(`Success! Your Report has been saved.`)),
      catchError(this.handleError<any>('add Report'))
    );
  }

  deleteReport(id: string): Observable<any> {
    const url = `${this.dTableReportUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your report has been deleted.`)),
      catchError(this.handleError('delete Report', []))
    );
  }
}
