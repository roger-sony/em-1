import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'delete-privilege-dialog',
  templateUrl: './delete-privilege-dialog.component.html',
  styleUrls: ['./delete-privilege-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePrivilegeDialogComponent {}
