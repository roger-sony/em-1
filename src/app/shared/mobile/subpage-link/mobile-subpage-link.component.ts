import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'mobile-subpage-link',
  templateUrl: './mobile-subpage-link.component.html',
  styleUrls: ['./mobile-subpage-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSubpageLinkComponent {
  @Input()
  public arrowHidden: boolean;

  @Input()
  public iconName: string;
}
