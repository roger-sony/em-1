import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import {DeleteTaskRuleTriggerAction} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.action';
import {DeleteNounRuleTriggerAction} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.action';
import {PlanDialogService} from '../../../../../dialog/plan-dialog.service';
import {TaskRuleTrigger} from '../../../../../core/model/task-rule-trigger';
import {NounRuleTrigger} from '../../../../../core/model/noun-rule-trigger';

@Component({
  selector: 'plan-triggers-menu',
  templateUrl: './plan-triggers-menu.component.html',
  styleUrls: ['./plan-triggers-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggersMenuComponent {
  @Input()
  type: string;

  @Input()
  trigger: TaskRuleTrigger | NounRuleTrigger;

  @Input()
  planId: string;

  constructor(private planDialogService: PlanDialogService, private store$: Store<{}>) {}

  public clickEdit(): void {
    if (this.type === 'noun') {
      this.planDialogService.openEditNounTriggerDialog(this.planId, this.trigger.id);
    } else {
      this.planDialogService.openEditTaskTriggerDialog(this.planId, this.trigger.id);
    }
  }

  public clickDelete(): void {
    if (this.type === 'noun') {
      this.store$.dispatch(new DeleteNounRuleTriggerAction({id: this.trigger.id}));
    } else {
      this.store$.dispatch(new DeleteTaskRuleTriggerAction({id: this.trigger.id}));
    }
  }
}
