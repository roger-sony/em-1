import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';

@Component({
  selector: 'empty-toggle',
  templateUrl: './empty-toggle.component.html',
  styleUrls: ['./empty-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyToggleComponent {
  @Input()
  public value: boolean;

  @Output()
  public valueChange = new EventEmitter<boolean>();

  public onChange(event: MatSlideToggleChange) {
    this.valueChange.emit(event.checked);
  }
}
