import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'plan-conditions-delete-dialog',
  templateUrl: './plan-conditions-delete-dialog.component.html',
  styleUrls: ['./plan-conditions-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanConditionsDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {global: boolean}) {}
}
