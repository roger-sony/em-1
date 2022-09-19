import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface DeleteNounDialogDataModel {
  batchDelete: boolean;
}

@Component({
  templateUrl: './delete-noun-confirm.component.html',
  styleUrls: ['./delete-noun-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteNounConfirmComponent {
  public removeBatch: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: DeleteNounDialogDataModel,
    private dialogRef: MatDialogRef<DeleteNounConfirmComponent>
  ) {}

  onConfirmClick() {
    this.dialogRef.close({
      removeBatch: this.removeBatch,
    });
  }
}
