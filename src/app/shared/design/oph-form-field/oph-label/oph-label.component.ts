import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'oph-label',
  templateUrl: './oph-label.component.html',
  styleUrls: ['./oph-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphLabelComponent {
  @Input()
  public inputId: string;

  @HostBinding('class.oph-label')
  public rootClass = true;

  public disabled: boolean;
  public highlighted: string;
}
