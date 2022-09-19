import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogHeaderComponent {
  @Input()
  public iconCircle: boolean;

  @Input()
  public iconName: string;

  @Input()
  public title: string;

  @Input()
  public preventClose: boolean;

  @Output()
  public close = new EventEmitter();

  // tslint:disable-next-line:no-any
  constructor(public dialog: MatDialogRef<any>) {}

  public onCloseClick() {
    this.close.emit();
    if (!this.preventClose) {
      this.dialog.close();
    }
  }
}
