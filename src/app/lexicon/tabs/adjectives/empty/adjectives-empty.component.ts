import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'adjectives-empty',
  templateUrl: './adjectives-empty.component.html',
  styleUrls: ['./adjectives-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectivesEmptyComponent {
  @Output()
  public create = new EventEmitter();

  public onCreate() {
    this.create.emit();
  }
}
