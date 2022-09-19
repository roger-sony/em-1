import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'sked-template-use-dialog',
  templateUrl: './sked-template-use-dialog.component.html',
  styleUrls: ['./sked-template-use-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplateUseDialogComponent {
  constructor(public dialog: MatDialogRef<SkedTemplateUseDialogComponent, boolean>) {}

  public onUseTemplateClick() {
    this.dialog.close(true);
  }
}
