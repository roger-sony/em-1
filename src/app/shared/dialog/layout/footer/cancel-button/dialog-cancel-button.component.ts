import {ChangeDetectionStrategy, Component, Output, EventEmitter, Input} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dialog-cancel-button',
  templateUrl: './dialog-cancel-button.component.html',
  styleUrls: ['./dialog-cancel-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCancelButtonComponent {
  @Output()
  public close = new EventEmitter();

  @Input()
  public preventClose: boolean;

  // tslint:disable-next-line:no-any
  constructor(public dialog: MatDialogRef<any>) {}

  public onClick() {
    this.close.emit();
    if (!this.preventClose) {
      this.dialog.close();
    }
  }
}
