import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'plan-card-conditions',
  templateUrl: './plan-card-conditions.component.html',
  styleUrls: ['./plan-card-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardConditionsComponent implements OnInit {
  @Input()
  public count: number;

  constructor() {}

  ngOnInit(): void {}
}
