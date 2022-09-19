import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteUserDialogComponent {}
