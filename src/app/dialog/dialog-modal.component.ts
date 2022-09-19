import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'dialog-modal',
  templateUrl: './dialog-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogModalComponent {}
