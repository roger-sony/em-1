import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NounDto} from '../../../../../../core/api/dto/noun.dto';

@Component({
  templateUrl: './update-values.component.html',
  styleUrls: ['./update-values.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateValuesComponent {
  noun: NounDto;

  constructor(@Inject(MAT_DIALOG_DATA) data: {noun: NounDto}, private dialogRef: MatDialogRef<UpdateValuesComponent>) {
    this.noun = data.noun;
  }

  onUpdateClick() {
    this.dialogRef.close(this.noun);
  }
}
