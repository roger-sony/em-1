import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHeaderComponent {
  @Input()
  public borderShown: boolean;

  @Output()
  public back = new EventEmitter();

  public onBack() {
    this.back.emit();
  }
}
