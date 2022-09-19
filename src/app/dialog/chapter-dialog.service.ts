import {Injectable} from '@angular/core';
import {DialogService} from './dialog.service';

@Injectable({
  providedIn: 'root',
})
export class ChapterDialogService {
  constructor(private dialogService: DialogService) {}

  public openNewChapterDialog() {
    this.dialogService.navigateToDialog('chapter/new');
  }

  public openEditChapterDialog(id: string) {
    this.dialogService.navigateToDialog(`chapter/${id}/edit`);
  }

  public openUpdateProgressChapterDialog(id: string) {
    this.dialogService.navigateToDialog(`chapter/${id}/update-progress`);
  }
}
