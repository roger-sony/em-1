import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'mobile-nav-button',
  templateUrl: './mobile-nav-button.component.html',
  styleUrls: ['./mobile-nav-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavButtonComponent {
  @Input()
  public active: boolean;

  @Input()
  public iconName: string;

  @Input()
  public text: string;

  constructor(public element: ElementRef<HTMLElement>) {}
}
