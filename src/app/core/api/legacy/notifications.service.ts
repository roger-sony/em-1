import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsURL = `${WEBROOT}/notifications`;

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

  /*****************************************************************************
                        Get, Add, Delete Notifications
  *****************************************************************************/
  getNotifications(): Observable<any> {
    const url = `${this.notificationsURL}`;
    return this.http.get(url).pipe(catchError(this.handleError('get Notifications', [])));
  }

  addNotification(notification: any): Observable<any> {
    const url = `${this.notificationsURL}/addNotification`;
    return this.http.post(url, notification).pipe(
      tap(_ => this.log(`Success! Your Alert has been created.`)),
      catchError(this.handleError('add Notification', []))
    );
  }

  deleteNotification(id: string): Observable<any> {
    const url = `${this.notificationsURL}/${id}`;
    return this.http.delete(url).pipe(
      tap(_ => this.log(`Success! Your Alert has been dismissed.`)),
      catchError(this.handleError('delete Notification', []))
    );
  }
}
