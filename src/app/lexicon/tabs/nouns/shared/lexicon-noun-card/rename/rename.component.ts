import {Component, ChangeDetectionStrategy, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameComponent {
  @Input() nounName: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: {nounName: string}, private dialogRef: MatDialogRef<RenameComponent>) {
    this.nounName = data.nounName;
  }

  onUpdateClick() {
    this.dialogRef.close(this.nounName);
  }
}
