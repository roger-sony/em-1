import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Privilege} from '../../../app.constants';

@Component({
  selector: 'privilege-details-dialog',
  templateUrl: './privilege-details-dialog.component.html',
  styleUrls: ['./privilege-details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivilegeDetailsDialogComponent {
  public privilegeCopy: Privilege;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {privilege: Privilege},
    private dialogRef: MatDialogRef<PrivilegeDetailsDialogComponent>
  ) {
    this.privilegeCopy = {...data.privilege};
  }

  save() {
    this.dialogRef.close(this.privilegeCopy);
  }
}
