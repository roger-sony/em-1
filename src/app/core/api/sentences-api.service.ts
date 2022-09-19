import {SentenceDto} from './dto/sentence.dto';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Sentence} from '../model/sentence';

@Injectable({
  providedIn: 'root',
})
export class SentencesApiService {
  private url = `${environment.apiUrl}/sentences`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<SentenceDto[]> {
    return this.http.get<SentenceDto[]>(this.url);
  }

  public create(sentence: Sentence): Observable<Sentence> {
    return this.http.post<Sentence>(`${this.url}`, sentence);
  }

  public delete(sentenceId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${sentenceId}`);
  }
}
