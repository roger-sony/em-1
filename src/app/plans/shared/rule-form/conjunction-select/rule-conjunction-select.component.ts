import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RuleConjunction} from '../rule-conjunction';

@Component({
  selector: 'rule-conjunction-select',
  templateUrl: './rule-conjunction-select.component.html',
  styleUrls: ['./rule-conjunction-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleConjunctionSelectComponent {
  @Input()
  public control: FormControl;

  @Input()
  public global: boolean;

  @Output()
  public valueChange = new EventEmitter<string>();

  public readonly conjunctions = RuleConjunction;

  public onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}
