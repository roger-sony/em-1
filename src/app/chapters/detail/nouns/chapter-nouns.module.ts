import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChapterNounsComponent} from './chapter-nouns.component';
import {ChapterNounsControlPanelComponent} from './control-panel/chapter-nouns-control-panel.component';
import {AddMenuModule} from 'src/app/shared/desktop/add-menu/add-menu.module';
import {SharedNounsModule} from 'src/app/shared/nouns/shared-nouns.module';
import {ChapterNounsEmptyComponent} from './empty/chapter-nouns-empty.component';
import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';

@NgModule({
  imports: [CommonModule, AddMenuModule, SharedNounsModule, OphIconModule],
  declarations: [ChapterNounsComponent, ChapterNounsControlPanelComponent, ChapterNounsEmptyComponent],
  exports: [ChapterNounsComponent],
})
export class ChapterNounsModule {}
