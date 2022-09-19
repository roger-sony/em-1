import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'desktop-header',
  templateUrl: './desktop-header.component.html',
  styleUrls: ['./desktop-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopHeaderComponent {
  @Input()
  public iconName: string;

  @Input()
  public title: string;

  @Output()
  public back = new EventEmitter();

  public onBack() {
    this.back.emit();
  }
}
