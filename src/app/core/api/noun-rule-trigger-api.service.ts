import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {NounRuleTriggerDto} from './dto/noun-rule-trigger.dto';

@Injectable({
  providedIn: 'root',
})
export class NounRuleTriggerApiService {
  public url = `${environment.apiUrl}/nounRuleTriggers`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<NounRuleTriggerDto[]> {
    return this.http.get<NounRuleTriggerDto[]>(this.url);
  }

  public getById(triggerId: string): Observable<NounRuleTriggerDto> {
    return this.http.get<NounRuleTriggerDto[]>(`${this.url}/${triggerId}`).pipe(
      map(dtos => {
        if (dtos && dtos[0]) {
          return dtos && dtos[0];
        }

        throw Error(`Noun rule trigger with ID ${triggerId} not found`);
      })
    );
  }

  public create(trigger: NounRuleTriggerDto): Observable<NounRuleTriggerDto> {
    return this.http.post<NounRuleTriggerDto>(`${this.url}/addNounRuleTrigger`, trigger);
  }

  public delete(triggerId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${triggerId}`);
  }
}
