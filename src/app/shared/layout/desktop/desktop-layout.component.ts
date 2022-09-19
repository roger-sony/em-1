import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectRouterUrl} from '../../../core/store/router/router.selector';
import {selectActiveUserPrivileges} from '../../../core/store/active-user/active-user.selector';
import {map} from 'rxjs/operators';

@Component({
  selector: 'desktop-layout',
  templateUrl: './desktop-layout.component.html',
  styleUrls: ['./desktop-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopLayoutComponent implements OnInit {
  public routerUrl$: Observable<string>;
  public privileges$: Observable<string[]>;

  public username: string;

  constructor(private store$: Store<{}>) {}

  ngOnInit() {
    this.routerUrl$ = this.store$.pipe(select(selectRouterUrl));
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;

    this.privileges$ = this.store$.select(selectActiveUserPrivileges);
  }

  isSchedulerWeekView() {
    return this.routerUrl$.pipe(map(url => url?.indexOf('/scheduler/week') === 0));
  }
}
