import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'plan-card-nouns',
  templateUrl: './plan-card-nouns.component.html',
  styleUrls: ['./plan-card-nouns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardNounsComponent implements OnInit {
  @Input()
  public count: number;

  constructor() {}

  ngOnInit(): void {}
}
