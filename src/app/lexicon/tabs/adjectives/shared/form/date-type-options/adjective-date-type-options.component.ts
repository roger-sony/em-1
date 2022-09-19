import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'adjective-date-type-options',
  templateUrl: './adjective-date-type-options.component.html',
  styleUrls: ['./adjective-date-type-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectiveDateTypeOptionsComponent {
  @Input()
  public options: string[];

  @Input()
  public value: string;

  @Output()
  public valueChange = new EventEmitter<string>();

  public onClick(option: string) {
    this.valueChange.emit(option);
  }
}
