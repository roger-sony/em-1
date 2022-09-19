import {Injectable} from '@angular/core';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class SkedDialogService {
  constructor(private dialogService: DialogService) {}

  public openSkedDialog() {
    this.dialogService.navigateToDialog('sked/edit-sked');
  }

  public openNewSkedTemplateDialog() {
    this.dialogService.navigateToDialog('sked/new-template');
  }

  public openSkedTaskListDialog(taskIds: string) {
    this.dialogService.navigateToDialog('sked/task-list/' + taskIds);
  }
}
