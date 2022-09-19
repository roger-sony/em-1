import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {ClearAllFormsAction} from '../../../core/store/forms/forms.action';

@Component({
  selector: 'new-plan-dialog',
  templateUrl: './new-plan-dialog.component.html',
  styleUrls: ['./new-plan-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanDialogComponent {
  constructor(private store$: Store<{}>) {}

  public onClose() {
    this.store$.dispatch(new ClearAllFormsAction());
  }
}
