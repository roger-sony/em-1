import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'new-plan-progress-indicator',
  templateUrl: './new-plan-progress-indicator.component.html',
  styleUrls: ['./new-plan-progress-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanProgressIndicatorComponent implements OnInit {
  @Input()
  public completed: number;

  @Input()
  public total: number;

  constructor() {}

  ngOnInit(): void {}
}
