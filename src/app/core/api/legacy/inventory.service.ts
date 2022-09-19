import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from '../../../services/message.service';
import {WEBROOT} from '../../../app.constants';

/* tslint:disable:no-any */
@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private inventoryUrl = `${WEBROOT}/inventory`;

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
      this.log(`Error: Something went wrong while trying to ${operation}. Please try again later.`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getInventory(): Observable<any> {
    return this.http.get(this.inventoryUrl).pipe(
      // tap(items => this.log(`fetched items`)),
      map((inventory: any) =>
        inventory.map((item: any) => {
          item['qty'] = item['qty']['$numberDecimal'];
          return item;
        })
      ),
      catchError(this.handleError('get inventory', []))
    );
  }

  getItem(id: string): Observable<any> {
    const url = `${this.inventoryUrl}/${id}`;
    return this.http.get(url).pipe(
      // tap(_ => this.log(`fetched item id=${id}`)),
      map((inventory: any) =>
        inventory.map((item: any) => {
          item['qty'] = item['qty']['$numberDecimal'];
          return item;
        })
      ),
      catchError(this.handleError('get item', []))
    );
  }

  addItem(item: any): Observable<any> {
    const url = `${this.inventoryUrl}/addItem`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, item, httpOptions).pipe(
      tap((i: any) => this.log(`Success! Your item has been saved.`)),
      catchError(this.handleError<any>('add item'))
    );
  }

  editItem(items: any[]): Observable<any> {
    const url = `${this.inventoryUrl}/editItem`;
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, items, httpOptions).pipe(
      tap((i: any) => this.log(`Success! Your item has been edited.`)),
      catchError(this.handleError<any>('edit item'))
    );
  }

  deleteItems(itemPatchObj: any): Observable<any> {
    const url = `${this.inventoryUrl}/delete`;
    return this.http.post(url, itemPatchObj).pipe(
      tap(_ => this.log(`Success! The noun has been deleted.`)),
      catchError(this.handleError('delete item', []))
    );
  }

  getItemAttributes(): Observable<any> {
    const url = `${this.inventoryUrl}/getItemAttributes`;
    return this.http.get(url).pipe(
      // tap(attrs => this.log(`Got attributes`)),
      catchError(this.handleError('get item attributes', []))
    );
  }

  getFieldValues(name?: string, value?: string): Observable<any> {
    let url = `${WEBROOT}/search/inventory/all`;
    if (name && value) {
      url += `?filterName=${name}&filterValue=${value}`;
    }
    return this.http.get(url).pipe(catchError(this.handleError('get field values', [])));
  }

  getFieldValuesForSubcategory(subcategory: string): Observable<any> {
    const encodeName = encodeURI(subcategory);
    const url = `${WEBROOT}/search/inventory/getFieldValues/${encodeName}`;
    return this.http.get(url).pipe(catchError(this.handleError<any>('fetching field values for subcategory')));
  }

  // TODO: Refactor into separate search service
  searchValuesForField(field: string): Observable<any> {
    const url = `${WEBROOT}/search/inventory/${field}`;
    return this.http.get(url).pipe(catchError(this.handleError(`search values for ${field}`, [])));
  }

  getAbstractNounSubcategories(): Observable<any> {
    const url = `${WEBROOT}/inventory/abstractNouns`;
    return this.http.get(url).pipe(catchError(this.handleError(`get all abstract noun subcategories`, [])));
  }

  setItemActiveState(itemId: string, activeState: boolean): Observable<any> {
    const url = `${this.inventoryUrl}/active/${itemId}`;
    const body = {active: activeState};
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return this.http.post(url, body, httpOptions).pipe(
      tap((i: any) => this.log(`Success! The item has been updated.`)),
      catchError(this.handleError<any>('toggle active state'))
    );
  }

  validateSubcategory(type: string, subcategory: string, editing: boolean): Observable<any> {
    const url = `${this.inventoryUrl}/validatesubcategory`;
    const body = {type: type, subcategory: subcategory, editing: editing};
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
    };
    return this.http.post(url, body, httpOptions).pipe(
      tap(res => console.log('/validatesubcategory response:', res)),
      catchError(this.handleError<any>('validating subcategory field'))
    );
  }
}
