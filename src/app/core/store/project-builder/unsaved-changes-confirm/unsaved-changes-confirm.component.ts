import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'unsaved-changes-confirm',
  templateUrl: './unsaved-changes-confirm.component.html',
  styleUrls: ['./unsaved-changes-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnsavedChangesConfirmComponent {
  constructor(private dialogRef: MatDialogRef<UnsavedChangesConfirmComponent>) {}

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
