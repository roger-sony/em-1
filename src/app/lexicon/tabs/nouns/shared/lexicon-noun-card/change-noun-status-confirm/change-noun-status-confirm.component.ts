import {Component, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NounDto} from '../../../../../../core/api/dto/noun.dto';

@Component({
  templateUrl: './change-noun-status-confirm.component.html',
  styleUrls: ['./change-noun-status-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeNounStatusConfirmComponent {
  get noun(): NounDto {
    return this.data?.noun;
  }
  get isActivate(): boolean {
    return this.data?.action === 'activate';
  }
  get isDisabling(): boolean {
    return this.data?.action === 'disable';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {noun: NounDto; action: 'activate' | 'disable'},
    private dialogRef: MatDialogRef<ChangeNounStatusConfirmComponent>
  ) {}

  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
