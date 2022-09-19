import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'floating-menu-button',
  templateUrl: './floating-menu-button.component.html',
  styleUrls: ['./floating-menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingMenuButtonComponent {
  @Input()
  public default: boolean;

  @Input()
  public iconName: string;

  @Input()
  public small: boolean;
}
