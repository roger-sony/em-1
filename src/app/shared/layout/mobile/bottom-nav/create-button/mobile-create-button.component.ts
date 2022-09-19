import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'mobile-create-button',
  templateUrl: './mobile-create-button.component.html',
  styleUrls: ['./mobile-create-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileCreateButtonComponent {}
