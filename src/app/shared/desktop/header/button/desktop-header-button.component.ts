import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'desktop-header-button',
  templateUrl: './desktop-header-button.component.html',
  styleUrls: ['./desktop-header-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopHeaderButtonComponent {
  @Input()
  public accent: boolean;

  @Input()
  public disabled: boolean;

  @Input()
  public iconName: string;

  @Input()
  public iconSize: number;

  @HostBinding('class.desktop-header-button')
  public rootClass = true;
}
