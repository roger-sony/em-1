import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'oph-card-chip',
  templateUrl: './oph-card-chip.component.html',
  styleUrls: ['./oph-card-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphCardChipComponent {
  @Input()
  @HostBinding('style.background-color')
  public backgroundColor: string;

  @Input()
  public disabled: boolean;

  @Input()
  public iconName: string;

  @Input()
  public tooltip: string;

  @HostBinding('class.oph-card-chip')
  public rootClass = true;
}
