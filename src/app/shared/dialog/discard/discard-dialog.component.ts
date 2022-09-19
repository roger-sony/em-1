import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'discard-dialog',
  templateUrl: './discard-dialog.component.html',
  styleUrls: ['./discard-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiscardDialogComponent {
  constructor(public dialog: MatDialogRef<DiscardDialogComponent, boolean>) {}

  public onDiscardClick() {
    this.dialog.close(true);
  }
}
