import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'plan-card-triggers',
  templateUrl: './plan-card-triggers.component.html',
  styleUrls: ['./plan-card-triggers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardTriggersComponent implements OnInit {
  @Input()
  public count: number;

  constructor() {}

  ngOnInit(): void {}
}
