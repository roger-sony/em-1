import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'condition-form-conjunction',
  templateUrl: './condition-form-conjunction.component.html',
  styleUrls: ['./condition-form-conjunction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionFormConjunctionComponent {
  @Input()
  public value: string;

  @Output()
  public valueChange = new EventEmitter<string>();
}
