import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'task-detail-subtasks-delete-dialog',
  templateUrl: './task-detail-subtasks-delete-dialog.component.html',
  styleUrls: ['./task-detail-subtasks-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailSubtasksDeleteDialogComponent {}
