import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'rename-project',
  templateUrl: './rename-project.component.html',
  styleUrls: ['./rename-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenameProjectComponent implements OnInit {
  public readonly form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  constructor(@Inject(MAT_DIALOG_DATA) data: {title: string}, private dialogRef: MatDialogRef<RenameProjectComponent>) {
    this.form.get('title')?.patchValue(data.title);
  }

  ngOnInit(): void {}

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.get('title')?.value);
  }
}
