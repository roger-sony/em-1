import {ScrollDispatcher} from '@angular/cdk/overlay';
import {ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {selectRouterUrl} from 'src/app/core/store/router/router.selector';
import {selectActiveUserPrivileges} from '../../../core/store/active-user/active-user.selector';

@Component({
  selector: 'mobile-layout',
  templateUrl: './mobile-layout.component.html',
  styleUrls: ['./mobile-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileLayoutComponent implements OnInit, OnDestroy {
  public routerUrl$: Observable<string>;
  public privileges$: Observable<string[]>;

  public scrolled$ = new BehaviorSubject(false);
  public readonly showBottomNav: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private subscriptions = new Subscription();

  constructor(
    private ngZone: NgZone,
    private scrollDispatcher: ScrollDispatcher,
    private router: Router,
    private store$: Store
  ) {}

  public ngOnInit() {
    this.routerUrl$ = this.store$.select(selectRouterUrl);
    this.privileges$ = this.store$.select(selectActiveUserPrivileges);

    this.subscriptions.add(this.subscribeToScrolled());
    this.subscriptions.add(
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationStart),
          filter((event: NavigationStart) => !event.url.split('?')[0].includes('(dialog:'))
        )
        .subscribe(res => {
          this.showBottomNav.next(!res.url?.includes('/current-sked/'));
        })
    );
  }

  private subscribeToScrolled() {
    return this.scrollDispatcher
      .scrolled(100)
      .pipe(
        map(() => window.scrollY > 0),
        distinctUntilChanged()
      )
      .subscribe(scrolled => {
        this.ngZone.run(() => this.scrolled$.next(scrolled));
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
