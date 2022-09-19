import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'adjective-chip-list-chip',
  templateUrl: './adjective-chip-list-chip.component.html',
  styleUrls: ['./adjective-chip-list-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectiveChipListChipComponent {
  @Input()
  public name: string;

  @Output()
  public remove = new EventEmitter();

  public onClose() {
    this.remove.emit();
  }
}
