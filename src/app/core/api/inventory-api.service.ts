import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {InventoryItemDto} from './dto/inventory-item.dto';
import {catchError, map} from 'rxjs/operators';
import {MessageService} from '../../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryApiService {
  private url = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  public getAllItems(): Observable<InventoryItemDto[]> {
    return this.http.get<InventoryItemDto[]>(this.url).pipe(
      map((inventory: InventoryItemDto[]) =>
        inventory.map((item: InventoryItemDto) => {
          // @ts-ignore
          item.qty = item.qty?.$numberDecimal;
          return item;
        })
      ),
      catchError(this.handleError('get inventory', []))
    );
  }

  public getAbstractNouns(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/abstractNouns`);
  }

  public addToChapter(inventoryItemId: string, chapterId: string): Observable<InventoryItemDto> {
    return this.http.put<InventoryItemDto>(`${this.url}/${inventoryItemId}/chapters/${chapterId}`, {});
  }

  public removeFromChapter(inventoryItemId: string, chapterId: string): Observable<InventoryItemDto> {
    return this.http.delete<InventoryItemDto>(`${this.url}/${inventoryItemId}/chapters/${chapterId}`);
  }

  public patch(nounId: string, nounChange: Partial<InventoryItemDto>): Observable<InventoryItemDto> {
    return this.http.patch<InventoryItemDto>(`${this.url}/${nounId}`, nounChange);
  }

  public deleteInventoryItem(inventoryItemId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${inventoryItemId}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    // tslint:disable-next-line:no-any
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`Error: Something went wrong while trying to ${operation}. Please try again later.`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(message);
  }
}
