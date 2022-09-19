import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'plans-list-header',
  templateUrl: './plans-list-header.component.html',
  styleUrls: ['./plans-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansListHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
