import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent {
  @Input()
  public title: string;

  @Input()
  public hideHeader: boolean;

  @Input()
  public width: number;

  constructor(public dialog: MatDialogRef<DeleteDialogComponent, boolean>) {}

  public onDeleteClick() {
    this.dialog.close(true);
  }
}
