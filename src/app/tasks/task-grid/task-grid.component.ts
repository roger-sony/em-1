import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Chapter} from 'src/app/core/model/chapter';
import {Paragraph} from './../../core/model/paragraph';

@Component({
  selector: 'task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskGridComponent implements OnChanges {
  public pageSize: number;
  public pageIndex: number;

  @Input() public filteredTasksPage: Paragraph[];
  @Input() public paragraphsCount: number;
  @Input() public filteredTasks: Paragraph[];
  @Input() public chapters: Chapter[];
  @Input() public paginationTo: number;
  @Input() public paginationFrom: number;
  @Input() public hideHeaderBottomBorder: boolean;
  @Input() public canEdit: boolean;

  @Output() public pageEvent = new EventEmitter<PageEvent>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.paginationTo || changes.paginationFrom) {
      const paginationFrom = this.paginationFrom || 0;
      const paginationTo = this.paginationTo || 20;
      this.pageSize = paginationTo - paginationFrom;
      this.pageIndex = paginationFrom / this.pageSize;
    }
  }

  pageEventChange(event: PageEvent): void {
    this.pageEvent.emit(event);
  }
}
