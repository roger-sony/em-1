import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'oph-menu-item-new',
  templateUrl: './oph-menu-item-new.component.html',
  styleUrls: ['./oph-menu-item-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphMenuItemNewComponent implements OnChanges, OnInit {
  public iconClass: string;
  public size: number;

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

  @Input()
  public iconSize: number;

  @HostBinding('style.height.px')
  public height = 40;

  public ngOnInit(): void {
    this.iconClass = `ophanello ${this.iconName}`;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mobile) {
      this.size = this.mobile ? 32 : 24;
      this.height = this.mobile ? 44 : 40;
    }
  }
}
