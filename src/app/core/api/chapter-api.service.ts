import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ChapterTasksDto} from './dto/chapter-tasks.dto';
import {ChapterDto} from './dto/chapter.dto';
import {DecisionTableDto} from './dto/decision-table.dto';
import {InventoryItemDto} from './dto/inventory-item.dto';

@Injectable({
  providedIn: 'root',
})
export class ChapterApiService {
  private url = `${environment.apiUrl}/chapters`;

  constructor(private http: HttpClient) {}

  public getAll(): Observable<ChapterDto[]> {
    return this.http.get<ChapterDto[]>(this.url);
  }

  public getById(chapterId: string): Observable<ChapterDto> {
    return this.http.get<ChapterDto>(`${this.url}/${chapterId}`);
  }

  public getTasks(chapterId: string): Observable<ChapterTasksDto> {
    return this.http.get<ChapterTasksDto>(`${this.url}/${chapterId}/tasks`);
  }

  public getNouns(chapterId: string): Observable<InventoryItemDto[]> {
    return this.http.get<InventoryItemDto[]>(`${this.url}/${chapterId}/inventory`);
  }

  public getPlans(chapterId: string): Observable<DecisionTableDto[]> {
    return this.http.get<DecisionTableDto[]>(`${this.url}/${chapterId}/plans`);
  }

  public create(chapter: ChapterDto): Observable<ChapterDto> {
    return this.http.post<ChapterDto>(this.url, chapter);
  }

  public update(chapterId: string, chapter: ChapterDto): Observable<ChapterDto> {
    return this.http.patch<ChapterDto>(`${this.url}/${chapterId}`, chapter);
  }

  public delete(chapterId: string): Observable<Object> {
    return this.http.delete(`${this.url}/${chapterId}`);
  }
}
