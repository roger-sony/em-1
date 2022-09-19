import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SceneTemplateModel} from '../core/store/week-builder/week-builder-dummy-data';

@Injectable({
  providedIn: 'root',
})
export class ScenesService {
  private readonly url: string = '';

  constructor(private http: HttpClient) {}

  createScene(body: {name: string; color: string}): Observable<null> {
    return this.http.post<null>(this.url, body);
  }

  getAll(): Observable<SceneTemplateModel[]> {
    return this.http.get<SceneTemplateModel[]>(this.url);
  }
}
