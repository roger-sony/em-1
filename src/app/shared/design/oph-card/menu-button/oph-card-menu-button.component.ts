import {ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'oph-card-menu-button',
  templateUrl: './oph-card-menu-button.component.html',
  styleUrls: ['./oph-card-menu-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphCardMenuButtonComponent {
  constructor(public element: ElementRef) {}
}
