import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {MonthModel, WeekModel} from '../core/store/scheduler/scheduler-dummy-data';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchedulerService {
  constructor(private http: HttpClient) {}

  fetchMonth(): Observable<MonthModel[]> {
    return this.http.get<MonthModel[]>(`${environment.apiUrl}/seasons`);
  }

  createWeek(week: WeekModel): Observable<WeekModel> {
    return this.http.post<WeekModel>(`${environment.apiUrl}/weeks`, week);
  }

  fetchWeek(id: string): Observable<WeekModel[]> {
    return this.http.get<WeekModel[]>(`${environment.apiUrl}/weeks/${id}`);
  }

  updateWeek(week: WeekModel): Observable<WeekModel> {
    return this.http.put<WeekModel>(`${environment.apiUrl}/weeks/${week._id}`, week);
  }
}
