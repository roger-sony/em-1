import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FieldValuesDto, SubcategoryFieldValuesDto} from './dto/field-values.dto';

@Injectable({
  providedIn: 'root',
})
export class SearchApiService {
  private url = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) {}

  public getAllFieldValues(filterName: string = '', filterValue: string = ''): Observable<FieldValuesDto> {
    return this.http.get<FieldValuesDto>(`${this.url}/inventory/all`, {params: {filterName, filterValue}});
  }

  public getFieldValuesBySubcategory(subcategory: string): Observable<SubcategoryFieldValuesDto> {
    return this.http.get<SubcategoryFieldValuesDto>(`${this.url}/inventory/getFieldValues/${subcategory}`);
  }

  public getAllTaskFieldValues(): Observable<FieldValuesDto> {
    return this.http.get<FieldValuesDto>(`${this.url}/tasks/all`);
  }
}
