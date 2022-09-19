import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'oph-card-icon',
  templateUrl: './oph-card-icon.component.html',
  styleUrls: ['./oph-card-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphCardIconComponent {
  @Input()
  public name: string;

  @Input()
  @HostBinding('style.height.px')
  @HostBinding('style.min-width.px')
  @HostBinding('style.width.px')
  public size = 32;
}
