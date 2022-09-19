import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  @Input()
  @HostBinding('style.height.px')
  @HostBinding('style.width.px')
  public size = 36;

  @Output()
  public back = new EventEmitter();

  public onBackClick() {
    this.back.emit();
  }
}
