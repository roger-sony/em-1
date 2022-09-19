import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'plans-list-mobile',
  templateUrl: './plans-list-mobile.component.html',
  styleUrls: ['./plans-list-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansListMobileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
