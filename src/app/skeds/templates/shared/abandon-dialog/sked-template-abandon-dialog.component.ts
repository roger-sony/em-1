import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'sked-template-abandon-dialog',
  templateUrl: './sked-template-abandon-dialog.component.html',
  styleUrls: ['./sked-template-abandon-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplateAbandonDialogComponent {
  constructor(public dialog: MatDialogRef<SkedTemplateAbandonDialogComponent, boolean>) {}

  public onAbandonTemplateClick() {
    this.dialog.close(true);
  }
}
