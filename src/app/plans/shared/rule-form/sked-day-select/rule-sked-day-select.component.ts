import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SkedDay} from '../sked-day';

@Component({
  selector: 'rule-sked-day-select',
  templateUrl: './rule-sked-day-select.component.html',
  styleUrls: ['./rule-sked-day-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleSkedDaySelectComponent {
  @Input()
  public control: FormControl;

  @Output()
  public valueChange = new EventEmitter<string>();

  public readonly options = Object.values(SkedDay);

  public onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}
