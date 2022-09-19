import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {DEFAULT_ROWS} from '../app.constants';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  getDefaultRows(): Observable<number> {
    return of(DEFAULT_ROWS);
  }
}
