import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'task-delete-dialog',
  templateUrl: './task-delete-dialog.component.html',
  styleUrls: ['./task-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDeleteDialogComponent {}
