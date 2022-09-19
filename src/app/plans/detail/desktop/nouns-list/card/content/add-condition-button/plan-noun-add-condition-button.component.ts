import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'plan-noun-add-condition-button',
  templateUrl: './plan-noun-add-condition-button.component.html',
  styleUrls: ['./plan-noun-add-condition-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounAddConditionButtonComponent {
  @Input()
  public global: boolean;

  constructor() {}
}
