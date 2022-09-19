import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'chapter-delete-dialog',
  templateUrl: './chapter-delete-dialog.component.html',
  styleUrls: ['./chapter-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterDeleteDialogComponent {}
