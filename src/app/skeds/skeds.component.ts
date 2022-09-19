import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {selectRouterUrl} from '../core/store/router/router.selector';

@Component({
  selector: 'skeds-layout',
  templateUrl: './skeds.component.html',
  styleUrls: ['./skeds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedsComponent implements OnInit {
  public hideNavigation$: Observable<boolean>;
  private url$: Observable<string>;

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.url$ = this.store$.pipe(select(selectRouterUrl));
    this.hideNavigation$ = this.observeUrl();
  }

  private observeUrl(): Observable<boolean> {
    return this.url$.pipe(map(url => url.startsWith('/skeds/templates/')));
  }
}
