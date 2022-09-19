import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'plans-noun-list-empty',
  templateUrl: './plans-noun-list-empty.component.html',
  styleUrls: ['./plans-noun-list-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansNounListEmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
