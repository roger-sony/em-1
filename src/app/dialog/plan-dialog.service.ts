import {Injectable} from '@angular/core';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class PlanDialogService {
  constructor(private dialogService: DialogService) {}

  public openNewPlanDialog() {
    this.dialogService.navigateToDialog('plan/new');
  }

  public openNewPlanDialogName() {
    this.dialogService.navigateToDialog('plan/new/name');
  }

  public openNewPlanDialogCadence() {
    this.dialogService.navigateToDialog('plan/new/cadence');
  }

  public openNewPlanDialogTrigger() {
    this.dialogService.navigateToDialog('plan/new/trigger');
  }

  public openNewTriggerDialog(planId: string) {
    this.dialogService.navigateToDialog(`plan/${planId}/trigger/new`);
  }

  public openEditNounTriggerDialog(planId: string, triggerId: string) {
    this.dialogService.navigateToDialog(`plan/${planId}/trigger/${triggerId}/noun`);
  }

  public openEditTaskTriggerDialog(planId: string, triggerId: string) {
    this.dialogService.navigateToDialog(`plan/${planId}/trigger/${triggerId}/task`);
  }

  public openSetCadenceDialog(planId: string, cadenceId = '') {
    this.dialogService.navigateToDialog(`plan/${planId}/cadence/${cadenceId}`);
  }

  public openPlanPreviewDialog(planId: string) {
    this.dialogService.navigateToDialog(`plan/${planId}/preview`);
  }

  public openNewPlanConditionDialog() {
    this.dialogService.navigateToDialog('plan/new-condition');
  }

  public openEditPlanConditionDialog(conditionId: number) {
    this.dialogService.navigateToDialog(`plan/edit-condition/${conditionId}`);
  }
}
