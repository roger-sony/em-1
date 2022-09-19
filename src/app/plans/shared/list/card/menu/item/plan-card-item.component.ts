import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'plan-card-item',
  templateUrl: './plan-card-item.component.html',
  styleUrls: ['./plan-card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardItemComponent {
  @Input()
  public icon: string;

  @Input()
  public text: string;

  constructor() {}
}
