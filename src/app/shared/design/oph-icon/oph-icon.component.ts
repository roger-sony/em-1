import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'oph-icon',
  templateUrl: './oph-icon.component.html',
  styleUrls: ['./oph-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphIconComponent {
  @Input()
  public name: string;

  @HostBinding('style.height.px')
  @HostBinding('style.width.px')
  @Input()
  public size = 24;

  @HostBinding('class.oph-icon')
  public rootClass = true;
}
