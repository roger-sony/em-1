import {Injectable} from '@angular/core';
import {DialogService} from '../dialog.service';

@Injectable({
  providedIn: 'root',
})
export class TaskDialogService {
  constructor(private dialogService: DialogService) {}

  public openNewTaskDialog() {
    this.dialogService.navigateToDialog('task/new');
  }

  public openEditTaskDialog(taskId: string) {
    this.dialogService.navigateToDialog('task/' + taskId);
  }

  public openNewSubtaskDialog() {
    this.dialogService.navigateToDialog(`task/subtask/new`);
  }

  public openEditSubtaskDialog(subtaskIndex: string) {
    this.dialogService.navigateToDialog(`task/subtask/${subtaskIndex}`);
  }

  public openTaskDetailSubtaskConditionDialog(factIndex: string) {
    this.dialogService.navigateToDialog(`task/subtask/condition/${factIndex}`);
  }

  public openNewRuleTriggerDialog() {
    this.dialogService.navigateToDialog(`task/ruleTrigger/new`);
  }

  public openEditRuleTriggerDialog(ruleTriggerIndex: string) {
    this.dialogService.navigateToDialog(`task/ruleTrigger/${ruleTriggerIndex}`);
  }

  public openScheduleTaskDialog(paragraphId: string) {
    this.dialogService.navigateToDialog(`paragraph/schedule/${paragraphId}`);
  }

  public openNewSentenceDialog() {
    this.dialogService.navigateToDialog(`paragraph/sentence/new`);
  }

  public openEditSentenceDialog(sentenceIndex: string) {
    this.dialogService.navigateToDialog(`paragraph/sentence/${sentenceIndex}`);
  }
}
