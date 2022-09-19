import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'tasks-list-header',
  templateUrl: './tasks-list-header.component.html',
  styleUrls: ['./tasks-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListHeaderComponent {}
