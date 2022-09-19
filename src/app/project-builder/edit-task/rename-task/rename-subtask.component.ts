import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'rename-subtask',
  templateUrl: './rename-subtask.component.html',
  styleUrls: ['./rename-subtask.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameSubtaskComponent implements OnInit {
  public readonly form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {currentName: string},
    private dialogRef: MatDialogRef<RenameSubtaskComponent>
  ) {
    this.form.get('name')?.patchValue(data.currentName);
  }

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.get('name')?.value);
  }
}
