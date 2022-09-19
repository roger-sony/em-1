import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChapterChipsComponent} from './chapter-chips.component';
import {ChapterChipComponent} from './chip/chapter-chip.component';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [ChapterChipsComponent, ChapterChipComponent],
  imports: [CommonModule, OphIconModule, PipesModule],
  exports: [ChapterChipsComponent],
})
export class ChapterChipsModule {}
