import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {UserDto} from './dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.url);
  }
}
