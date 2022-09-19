import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PrivilegeDto} from '../../app.constants';

@Injectable({
  providedIn: 'root',
})
export class PrivilegesApiService {
  private url = `${environment.apiUrl}/priveleges`;

  constructor(private http: HttpClient) {}

  fetch(): Observable<PrivilegeDto[]> {
    return this.http.get<PrivilegeDto[]>(this.url);
  }

  delete(privilegeId: string): Observable<null> {
    return this.http.delete<null>(`${this.url}/${privilegeId}`);
  }

  update(privilegeDto: PrivilegeDto): Observable<null> {
    return this.http.put<null>(`${this.url}/${privilegeDto._id}`, privilegeDto);
  }

  create(name: string): Observable<null> {
    return this.http.post<null>(this.url, {name});
  }
}
