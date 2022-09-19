import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ChapterDialogService} from 'src/app/dialog/chapter-dialog.service';

@Component({
  selector: 'chapters-control-panel',
  templateUrl: './chapters-control-panel.component.html',
  styleUrls: ['./chapters-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersControlPanelComponent {
  constructor(private chapterDialogService: ChapterDialogService) {}

  public onCreateClick() {
    this.chapterDialogService.openNewChapterDialog();
  }
}
