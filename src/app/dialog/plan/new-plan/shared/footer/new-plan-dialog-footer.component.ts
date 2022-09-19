import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {ClearAllFormsAction} from 'src/app/core/store/forms/forms.action';
import {PlanDialogService} from '../../../../plan-dialog.service';

@Component({
  selector: 'new-plan-dialog-footer',
  templateUrl: './new-plan-dialog-footer.component.html',
  styleUrls: ['./new-plan-dialog-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanDialogFooterComponent {
  @Input()
  public completed: number;

  @Input()
  public doneDisabled: boolean;

  @Input()
  public nextDisabled: boolean;

  @Output()
  public done = new EventEmitter();

  public readonly total = 3;

  constructor(private planDialogService: PlanDialogService, private store$: Store<{}>) {}

  public onCancelClick() {
    this.store$.dispatch(new ClearAllFormsAction());
  }

  public onPreviousClick() {
    switch (this.completed) {
      case 2:
        return this.planDialogService.openNewPlanDialogName();
      case 3:
        return this.planDialogService.openNewPlanDialogCadence();
      default:
        return;
    }
  }

  public onNextClick() {
    if (this.nextDisabled) {
      return;
    }

    switch (this.completed) {
      case 0:
      case 1:
        return this.planDialogService.openNewPlanDialogCadence();
      case 2:
        return this.planDialogService.openNewPlanDialogTrigger();
      default:
        return;
    }
  }

  public onDoneClick() {
    if (this.doneDisabled) {
      return;
    }

    this.done.emit();
  }
}
