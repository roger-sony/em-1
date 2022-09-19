import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'task-rule-trigger-delete-dialog',
  templateUrl: './task-rule-trigger-delete-dialog.component.html',
  styleUrls: ['./task-rule-trigger-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRuleTriggerDeleteDialogComponent {}
