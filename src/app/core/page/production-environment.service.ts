import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductionEnvironmentService {
  public hostname$ = new BehaviorSubject<string>('');

  constructor() {
    this.hostname$.next(window.location.hostname);
  }

  public observeHostname(): Observable<boolean> {
    return this.hostname$.pipe(map(hostname => hostname === 'ophanim.timbergrove.com'));
  }
}
