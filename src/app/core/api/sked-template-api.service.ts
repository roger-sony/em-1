import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SkedTemplateDto} from './dto/sked-template.dto';

@Injectable({
  providedIn: 'root',
})
export class SkedTemplateApiService {
  private url = `${environment.apiUrl}/skedtemplates`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<SkedTemplateDto[]> {
    return this.http.get<SkedTemplateDto[]>(this.url);
  }
}
