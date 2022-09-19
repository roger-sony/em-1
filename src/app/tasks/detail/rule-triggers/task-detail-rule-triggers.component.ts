import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';
import {TaskDialogService} from 'src/app/dialog/task/task-dialog.service';
import {TaskRuleTriggerDeleteDialogComponent} from './delete-dialog/task-rule-trigger-delete-dialog.component';

@Component({
  selector: 'task-detail-rule-triggers',
  templateUrl: './task-detail-rule-triggers.component.html',
  styleUrls: ['./task-detail-rule-triggers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailRuleTriggersComponent {
  @Input()
  public storedRuleTriggers: TaskRuleTrigger[];

  @Input()
  public plansMap: Record<string, DecisionTable>;

  @Output()
  public delete = new EventEmitter<number>();

  constructor(private taskDialogService: TaskDialogService, private router: Router, private dialog: MatDialog) {}

  public onAdd() {
    this.taskDialogService.openNewRuleTriggerDialog();
  }

  public onEdit(index: string) {
    this.taskDialogService.openEditRuleTriggerDialog(index);
  }

  public onDelete(index: number) {
    const dialog = this.dialog.open(TaskRuleTriggerDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.delete.emit(index);
        this.router.navigate([], {queryParams: {edited: true}});
      }
    });
  }
}
