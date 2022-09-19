import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {RuleScheduleDto} from './dto/rule-schedule.dto';

@Injectable({
  providedIn: 'root',
})
export class RuleScheduleApiService {
  public url = `${environment.apiUrl}/ruleSchedules`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<RuleScheduleDto[]> {
    return this.http.get<RuleScheduleDto[]>(this.url);
  }

  public getAllSortedByDisplayName(): Observable<RuleScheduleDto[]> {
    return this.http.get<RuleScheduleDto[]>(`${this.url}/sorted/displayname`);
  }

  public getById(ruleScheduleId: string): Observable<RuleScheduleDto> {
    return this.http.get<RuleScheduleDto[]>(`${this.url}/${ruleScheduleId}`).pipe(map(dtos => dtos && dtos[0]));
  }

  public create(ruleSchedule: RuleScheduleDto): Observable<RuleScheduleDto> {
    return this.http.post<RuleScheduleDto>(`${this.url}/addScheduledRule`, ruleSchedule);
  }

  public delete(ruleScheduleId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${ruleScheduleId}`);
  }
}
