import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChapterCardComponent} from './chapter-card.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ChaptersCardItemComponent} from './chapters-card-item/chapters-card-item.component';
import {ChaptersCardProgressComponent} from './chapters-card-progress/chapters-card-progress.component';
import {ChaptersCardChipComponent} from './chapters-card-chip/chapters-card-chip.component';

@NgModule({
  declarations: [
    ChapterCardComponent,
    ChaptersCardItemComponent,
    ChaptersCardProgressComponent,
    ChaptersCardChipComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [ChapterCardComponent, ChaptersCardItemComponent],
})
export class ChapterCardModule {}
