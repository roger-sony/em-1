import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DecisionTable} from 'src/app/core/model/decision-table';

@Component({
  selector: 'plan-delete-dialog',
  templateUrl: './plan-delete-dialog.component.html',
  styleUrls: ['./plan-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public plan: DecisionTable) {}
}
