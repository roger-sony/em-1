import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChapterPlansComponent} from './chapter-plans.component';
import {ChapterPlansControlPanelComponent} from './control-panel/chapter-plans-control-panel.component';
import {AddMenuModule} from 'src/app/shared/desktop/add-menu/add-menu.module';
import {ChapterPlansEmptyComponent} from './empty/chapter-plans-empty.component';
import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';
import {PlansSearchPanelModule} from 'src/app/shared/plans/search-panel/plans-search-panel.module';
import {PlansListModule} from 'src/app/shared/plans/list/plans-list.module';

@NgModule({
  imports: [CommonModule, AddMenuModule, OphIconModule, PlansSearchPanelModule, PlansListModule],
  declarations: [ChapterPlansComponent, ChapterPlansControlPanelComponent, ChapterPlansEmptyComponent],
  exports: [ChapterPlansComponent],
})
export class ChapterPlansModule {}
