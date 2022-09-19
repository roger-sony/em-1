import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'chapters-list-empty',
  templateUrl: './chapters-list-empty.component.html',
  styleUrls: ['./chapters-list-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersListEmptyComponent {
  @Output()
  public create = new EventEmitter();

  public onCreateButtonClick() {
    this.create.emit();
  }
}
