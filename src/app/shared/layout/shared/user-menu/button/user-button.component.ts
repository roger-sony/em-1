import {ChangeDetectionStrategy, Component, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'user-button',
  templateUrl: './user-button.component.html',
  styleUrls: ['./user-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserButtonComponent {
  @Input()
  public avatarSize: number;

  @Input()
  public caretShown: boolean;

  constructor(public element: ElementRef<HTMLElement>) {}
}
