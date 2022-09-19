/* tslint:disable */
import {ParagraphDto} from './dto/paragraph.dto';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParagraphApiService {
  private url = `${environment.apiUrl}/paragraphs`;

  constructor(private http: HttpClient) {}

  public getAll(params: HttpParams): Observable<ParagraphDto[]> {
    return this.http.get<ParagraphDto[]>(this.url, {params});
  }

  // public getAllTaskInstances(): Observable<TaskInstanceDto[]> {
  //   return this.http.get<TaskInstanceDto[]>(`${environment.apiUrl}/taskinstances`);
  // }

  public create(paragraph: ParagraphDto): Observable<ParagraphDto> {
    return this.http.post<ParagraphDto>(`${this.url}`, paragraph);
  }

  public put(paragraphId: string, paragraphChange: Partial<ParagraphDto>, edited?: boolean): Observable<any> {
    return this.http.put<any>(`${this.url}/${paragraphId}`, paragraphChange, {
      params: {editedSchedule: String(edited)},
    });
  }

  public delete(paragraphId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${paragraphId}`);
  }
}
