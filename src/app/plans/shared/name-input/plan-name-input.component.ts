import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PatchDecisionTableAction} from '../../../core/store/decision-tables/decision-tables.action';
import {MessageService} from '../../../services/message.service';
import {Store} from '@ngrx/store';
import {DecisionTable} from '../../../core/model/decision-table';

@Component({
  selector: 'plan-name-input',
  templateUrl: './plan-name-input.component.html',
  styleUrls: ['./plan-name-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNameInputComponent {
  @Input()
  public plan: DecisionTable;

  constructor(private messageService: MessageService, private store$: Store<{}>) {}

  public onBlur(event: FocusEvent) {
    const element = event.target as HTMLDivElement;
    const newName = element.textContent.trim();

    if (!newName) {
      this.messageService.add('Error: Plan name cannot be empty.');
      element.textContent = this.plan.displayName;
    } else if (newName !== this.plan.displayName) {
      this.updatePlanName(newName);
    }
  }

  private updatePlanName(displayName: string) {
    this.store$.dispatch(
      new PatchDecisionTableAction({
        decisionTableId: this.plan.id,
        decisionTableChange: {displayName},
        onSuccess: () => this.onUpdatePlanNameSuccess(),
        onFailure: () => this.onUpdatePlanNameFailure(),
      })
    );
  }

  private onUpdatePlanNameSuccess() {
    this.messageService.add('Success! Plan name has been changed.');
  }

  private onUpdatePlanNameFailure() {
    this.messageService.add('Error: Failed to change the plan name.');
  }

  public onEnterKeyDown(event: KeyboardEvent) {
    event.preventDefault();

    const element = event.target as HTMLDivElement;
    element.blur();
  }
}
