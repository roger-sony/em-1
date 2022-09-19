import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Chapter} from 'src/app/core/model/chapter';
import {Paragraph} from './../../../core/model/paragraph';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  @Input() public task: Paragraph;
  @Input() public chapters: Chapter[];
  @Input() public hideHeaderBottomBorder: boolean;
  @Input() public canEdit: boolean;

  constructor(private router: Router) {}

  onCardClick() {
    this.router.navigate(['paragraphs', this.task.id]);
  }
}
