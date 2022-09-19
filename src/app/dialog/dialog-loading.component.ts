import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'dialog-loading',
  template: 'Loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogLoadingComponent {}
