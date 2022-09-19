import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent {
  @HostBinding('style.height.px')
  @HostBinding('style.width.px')
  @Input()
  public size: number;
}
