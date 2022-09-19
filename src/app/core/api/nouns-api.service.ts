import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Noun, NounDto, NounFromServiceDto} from './dto/noun.dto';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

interface CreateNounModel {
  noun: NounDto;
  createBatch: boolean;
  batchAmount?: number;
  batchStart?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NounsApiService {
  private url = `${environment.apiUrl}/nouns`;

  constructor(private http: HttpClient) {}

  public getFilteredNouns(params: HttpParams): Observable<NounDto[]> {
    return this.http
      .get<NounFromServiceDto[]>(this.url, {params})
      .pipe(map(nouns => nouns.map(n => new Noun(n).getNoun())));
  }

  public updateNoun(noun: NounFromServiceDto) {
    return this.http.put(`${this.url}/${noun._id}`, noun);
  }

  public activateNoun(id: string) {
    return this.http.post(`${this.url}/active/${id}`, {active: true});
  }

  public disableNoun(id: string) {
    return this.http.post(`${this.url}/active/${id}`, {active: false});
  }

  public deleteNoun(noun: NounDto, removeBatch: boolean = false) {
    const url = removeBatch ? `${this.url}/batch/${noun.batchID}` : `${this.url}/${noun.id}`;

    return this.http.delete(url);
  }

  public createNoun({noun, createBatch, batchAmount, batchStart}: CreateNounModel) {
    const url = createBatch ? `${this.url}/batch` : this.url;
    const params = createBatch
      ? new HttpParams({
          fromObject: {
            batchAmount: `${batchAmount || null}`,
            batchStart: `${batchStart || null}`,
          },
        })
      : new HttpParams();
    return this.http.post(url, noun, {params});
  }
}
