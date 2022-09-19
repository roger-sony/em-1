import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'oph-card',
  templateUrl: './oph-card.component.html',
  styleUrls: ['./oph-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphCardComponent {
  @HostBinding('style.background-color')
  @Input()
  public backgroundColor = '#ffffff';

  @Input()
  public iconName: string;

  @HostBinding('class.selected')
  @Input()
  public selected: boolean;

  @Input()
  public title: string;

  @Input()
  public hideHeader: boolean;

  @Input()
  public hideHeaderBottomBorder: boolean;

  @HostBinding('class.oph-card')
  public rootClass = true;

  constructor(public element: ElementRef<HTMLElement>) {}
}
