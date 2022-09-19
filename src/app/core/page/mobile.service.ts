import {BreakpointObserver} from '@angular/cdk/layout';
import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map, startWith, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  public observeMobile(): Observable<boolean> {
    return this.breakpointObserver.observe('(max-width: 959px)').pipe(
      map(breakpointState => breakpointState.matches),
      startWith(this.breakpointObserver.isMatched('(max-width: 959px)'))
    );
  }

  private observeSingleSwitch(nextMobile: boolean): Observable<boolean> {
    return this.observeMobile().pipe(
      filter(mobile => mobile === nextMobile),
      take(1)
    );
  }

  public observeSingleDesktopSwitch(): Observable<boolean> {
    return this.observeSingleSwitch(false);
  }

  public subscribeToDesktopSwitch(callback: () => void): Subscription {
    return this.observeSingleDesktopSwitch().subscribe(callback);
  }

  public observeSingleMobileSwitch(): Observable<boolean> {
    return this.observeSingleSwitch(true);
  }

  public subscribeToMobileSwitch(callback: () => void): Subscription {
    return this.observeSingleMobileSwitch().subscribe(callback);
  }
}
