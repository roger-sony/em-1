import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'delete-privilege-dialog',
  templateUrl: './delete-role-dialog.component.html',
  styleUrls: ['./delete-role-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteRoleDialogComponent {}
