import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UnitOfMeasureDto} from './dto/unit-of-measure.dto';

@Injectable({
  providedIn: 'root',
})
export class UnitOfMeasureApiService {
  private url = `${environment.apiUrl}/unitofmeasures`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<UnitOfMeasureDto[]> {
    return this.http.get<UnitOfMeasureDto[]>(this.url);
  }
}
