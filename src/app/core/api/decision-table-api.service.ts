import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DecisionTablePreviewDtoChange} from './dto/decision-table-preview-change.dto';
import {DecisionTablePreviewDto} from './dto/decision-table-preview.dto';
import {DecisionTableDto} from './dto/decision-table.dto';
import {OnDemandOptionsDto} from './dto/on-demand-options.dto';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DecisionTableApiService {
  private url = `${environment.apiUrl}/dtable`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<DecisionTableDto[]> {
    return this.http.get<DecisionTableDto[]>(this.url);
  }

  public getById(decisionTableId: string): Observable<DecisionTableDto> {
    return this.http.get<DecisionTableDto[]>(`${this.url}/${decisionTableId}`).pipe(
      map(dtos => {
        if (dtos && dtos[0]) {
          return dtos && dtos[0];
        }

        throw Error(`Decision table with ID ${decisionTableId} not found`);
      })
    );
  }

  public create(decisionTable: DecisionTableDto): Observable<DecisionTableDto> {
    return this.http.post<DecisionTableDto>(`${this.url}/addDTable`, decisionTable);
  }

  public update(decisionTable: DecisionTableDto): Observable<DecisionTableDto> {
    return this.http.put<DecisionTableDto>(`${this.url}/${decisionTable._id}`, decisionTable);
  }

  public patch(decisionTableId: string, decisionTableChange: Partial<DecisionTableDto>): Observable<DecisionTableDto> {
    return this.http.patch<DecisionTableDto>(`${this.url}/${decisionTableId}`, decisionTableChange);
  }

  public delete(decisionTableId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${decisionTableId}`);
  }

  public runOnDemand(decisionTableId: string, options: OnDemandOptionsDto): Observable<DecisionTablePreviewDto> {
    const urlOptions = `${options.preview || false}/${options.saveReport || false}/${options.triggerActions || false}`;
    return this.http.get<DecisionTablePreviewDto>(`${this.url}/ondemand/${decisionTableId}/${urlOptions}`);
  }

  public addReport(dto: DecisionTablePreviewDtoChange): Observable<DecisionTablePreviewDtoChange> {
    return this.http.post<DecisionTablePreviewDtoChange>(`${environment.apiUrl}/reports/addReport`, dto);
  }
}
