import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'plans-search-result',
  templateUrl: './plans-search-result.component.html',
  styleUrls: ['./plans-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansSearchResultComponent implements OnInit {
  @Input()
  public iconName: string;

  @Input()
  public displayName: string;

  constructor() {}

  ngOnInit(): void {}
}
