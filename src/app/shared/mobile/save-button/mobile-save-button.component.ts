import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'mobile-save-button',
  templateUrl: './mobile-save-button.component.html',
  styleUrls: ['./mobile-save-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSaveButtonComponent {
  @Input()
  public disabled: boolean;

  @Input()
  public soft: boolean;

  @Output()
  public save = new EventEmitter();

  public onButtonClick() {
    this.save.emit();
  }
}
