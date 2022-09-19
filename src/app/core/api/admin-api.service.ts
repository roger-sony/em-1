import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TenantForm} from '../model/tenant-form';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  private url = `${environment.apiUrl}/multiTenant`;

  constructor(private http: HttpClient) {}

  public createTenant(data: TenantForm): Observable<TenantForm> {
    return this.http.post<TenantForm>(`${this.url}`, data);
  }
}
