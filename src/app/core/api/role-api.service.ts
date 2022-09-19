import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {RoleDto} from './dto/role.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleApiService {
  private url = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(this.url);
  }

  public create(role: RoleDto): Observable<RoleDto> {
    return this.http.post<RoleDto>(`${this.url}/addRole`, role);
  }

  public update(roleId: string, role: RoleDto): Observable<RoleDto> {
    return this.http.put<RoleDto>(`${this.url}/${roleId}`, role);
  }

  public delete(roleId: string) {
    return this.http.delete(`${this.url}/${roleId}`);
  }

  public getById(roleIds: string[]) {
    return this.getAll().pipe(map(result => result.filter(role => roleIds.includes(role._id))));
  }
}
