import {Verb} from './../model/verb';
import {VerbDto} from './dto/verb.dto';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VerbsApiService {
  private url = `${environment.apiUrl}/verbs`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<VerbDto[]> {
    return this.http.get<VerbDto[]>(this.url);
  }

  public create(verb: Verb): Observable<Verb> {
    return this.http.post<Verb>(`${this.url}`, verb);
  }

  public delete(verbId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${verbId}`);
  }
}
