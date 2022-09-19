import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'rule-form-button',
  templateUrl: './rule-form-button.component.html',
  styleUrls: ['./rule-form-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleFormButtonComponent {
  @Input()
  public disabled: boolean;

  @Input()
  public icon: string;

  @Input()
  public title: string;
}
