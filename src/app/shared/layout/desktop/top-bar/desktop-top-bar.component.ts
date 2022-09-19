import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectRouterUrl} from '../../../../core/store/router/router.selector';

@Component({
  selector: 'desktop-top-bar',
  templateUrl: './desktop-top-bar.component.html',
  styleUrls: ['./desktop-top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopTopBarComponent implements OnInit {
  public readonly url$ = this.store$.pipe(select(selectRouterUrl));

  constructor(private store$: Store) {}

  ngOnInit() {}
}
