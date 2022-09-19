import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Sentence} from 'src/app/core/model/sentence';

@Component({
  selector: 'subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubtaskListComponent {
  //TODO: Variable name
  @Input() public sentences: Sentence[];
  @Input() public canEdit: boolean;

  @Output() public edit = new EventEmitter<number>();
  @Output() public delete = new EventEmitter<number>();

  public menuOpen: boolean = false;
  public hoveredIndex: number;

  public onMouseEnter(index: number) {
    this.hoveredIndex = index;
  }

  public onMouseLeave() {
    this.hoveredIndex = null;
  }
}
