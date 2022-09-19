import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AdjectiveDto} from './dto/adjective.dto';
@Injectable({
  providedIn: 'root',
})
export class AdjectivesApiService {
  readonly url: string = `${environment.apiUrl}/adjectives`;

  constructor(private http: HttpClient) {}

  getAdjectives(params: {[key: string]: string | string[]} = null): Observable<AdjectiveDto[]> {
    return this.http.get<AdjectiveDto[]>(this.url, {params});
  }

  getAdjective(id: string): Observable<AdjectiveDto> {
    return this.http.get<AdjectiveDto>(`${this.url}/id`);
  }

  create(adjective: AdjectiveDto): Observable<AdjectiveDto> {
    return this.http.post<AdjectiveDto>(this.url, adjective);
  }

  public update(adjectiveId: string, adjective: AdjectiveDto): Observable<AdjectiveDto> {
    return this.http.put<AdjectiveDto>(`${this.url}/${adjectiveId}`, adjective);
  }

  public delete(id: string): Observable<Object> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
