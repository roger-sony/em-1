import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'trigger-type-button',
  templateUrl: './trigger-type-button.component.html',
  styleUrls: ['./trigger-type-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriggerTypeButtonComponent {
  @Input()
  public active: boolean;

  @Input()
  public text: string;
}
