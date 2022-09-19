import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ParagraphDto} from './dto/paragraph.dto';
import {TaskDto} from './dto/task.dto';

@Injectable({
  providedIn: 'root',
})
export class TaskApiService {
  private url = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.url);
  }

  public getAllTaskInstances(): Observable<ParagraphDto[]> {
    return this.http.get<ParagraphDto[]>(`${environment.apiUrl}/paragraphinstances`);
  }

  public create(task: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(`${this.url}/addtask`, task);
  }

  public patch(taskId: string, taskChange: Partial<TaskDto>): Observable<TaskDto> {
    return this.http.patch<TaskDto>(`${this.url}/${taskId}`, taskChange);
  }

  public delete(taskId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${taskId}`);
  }
}
