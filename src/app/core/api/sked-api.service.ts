import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {FlexSkedTemplateDto} from './dto/flex-sked-template.dto';

@Injectable({
  providedIn: 'root',
})
export class SkedApiService {
  private templateUrl = `${environment.apiUrl}/flexskedtemplates`;

  constructor(private http: HttpClient) {}

  public getAllTemplates(params: {[key: string]: string | string[]}): Observable<FlexSkedTemplateDto[]> {
    return this.http.get<FlexSkedTemplateDto[]>(this.templateUrl, {params});
  }

  public getSingleTemplate(templateId: string): Observable<FlexSkedTemplateDto> {
    return this.http.get<FlexSkedTemplateDto>(`${this.templateUrl}/${templateId}`);
  }

  public createTemplate(skedTemplate: FlexSkedTemplateDto): Observable<FlexSkedTemplateDto> {
    return this.http.post<FlexSkedTemplateDto>(this.templateUrl, skedTemplate);
  }

  public updateTemplate(skedId: string, skedTemplate: Partial<FlexSkedTemplateDto>): Observable<FlexSkedTemplateDto> {
    return this.http.patch<FlexSkedTemplateDto>(`${this.templateUrl}/${skedId}`, skedTemplate);
  }

  public deleteTemplate(skedTemplateId: string): Observable<Object> {
    return this.http.delete(`${this.templateUrl}/${skedTemplateId}`);
  }

  public reinstantiateWeek() {
    return this.http.get(`${environment.apiUrl}/flexskeds/instantiateweek`);
  }
}
