import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'oph-menu-item',
  templateUrl: './oph-menu-item.component.html',
  styleUrls: ['./oph-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphMenuItemComponent implements OnChanges {
  @Input()
  public active: boolean;

  @Input()
  public fontSize = 16;

  @Input()
  public hideIcon: boolean;

  @Input()
  public iconName: string;

  @Input()
  public text: string;

  @Input()
  public mobile: boolean;

  @HostBinding('style.height.px')
  public height = 40;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mobile) {
      this.height = this.mobile ? 44 : 40;
    }
  }
}
