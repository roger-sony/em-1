import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MobileSelectOption} from '../mobile-select-option';

@Component({
  selector: 'mobile-select-option',
  templateUrl: './mobile-select-option.component.html',
  styleUrls: ['./mobile-select-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSelectOptionComponent {
  @Input()
  public option: MobileSelectOption;

  @Input()
  public selected: boolean;
}
