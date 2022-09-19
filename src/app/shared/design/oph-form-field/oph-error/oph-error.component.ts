import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';

@Component({
  selector: 'oph-error',
  templateUrl: './oph-error.component.html',
  styleUrls: ['./oph-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphErrorComponent {
  @HostBinding('class.oph-error')
  public rootClass = true;
}
