import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'condition-form-decision',
  templateUrl: './condition-form-decision.component.html',
  styleUrls: ['./condition-form-decision.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionFormDecisionComponent {
  @Input()
  public buttonText: string[];

  @Output()
  public option1 = new EventEmitter();

  @Output()
  public option2 = new EventEmitter();
}
