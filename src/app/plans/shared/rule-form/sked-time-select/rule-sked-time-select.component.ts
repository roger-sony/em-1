import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'rule-sked-time-select',
  templateUrl: './rule-sked-time-select.component.html',
  styleUrls: ['./rule-sked-time-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleSkedTimeSelectComponent {
  @Input()
  public control: FormControl;

  public readonly options = new Array(12).fill(0).map((value, index) => String(index + 1).padStart(2, '0'));
}
