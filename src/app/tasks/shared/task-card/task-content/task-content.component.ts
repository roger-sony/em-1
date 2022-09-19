import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';
import {Paragraph} from './../../../../core/model/paragraph';

@Component({
  selector: 'task-content',
  templateUrl: './task-content.component.html',
  styleUrls: ['./task-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskContentComponent implements OnChanges {
  @Input()
  public paragraph: Paragraph;

  @Input()
  public chapters: Chapter[];

  public hasInstructions: Boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.paragraph && this.paragraph) {
      // this.hasInstructions = !!this.task.instructions;
    }
  }
}
