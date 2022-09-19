import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {TaskRuleTriggerDto} from './dto/task-rule-trigger.dto';

@Injectable({
  providedIn: 'root',
})
export class TaskRuleTriggerApiService {
  public url = `${environment.apiUrl}/taskRuleTriggers`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<TaskRuleTriggerDto[]> {
    return this.http.get<TaskRuleTriggerDto[]>(this.url);
  }

  public getById(triggerId: string): Observable<TaskRuleTriggerDto> {
    return this.http.get<TaskRuleTriggerDto[]>(`${this.url}/${triggerId}`).pipe(
      map(dtos => {
        if (dtos && dtos[0]) {
          return dtos && dtos[0];
        }

        throw Error(`Task rule trigger with ID ${triggerId} not found`);
      })
    );
  }

  public create(trigger: TaskRuleTriggerDto): Observable<TaskRuleTriggerDto> {
    return this.http.post<TaskRuleTriggerDto>(`${this.url}/addTaskRuleTrigger`, trigger);
  }

  public delete(triggerId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${triggerId}`);
  }
}
