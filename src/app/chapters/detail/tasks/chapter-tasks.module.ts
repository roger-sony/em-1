import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {OphIconModule} from '../../../shared/design/oph-icon/oph-icon.module';
import {AddMenuModule} from '../../../shared/desktop/add-menu/add-menu.module';
import {SharedTasksModule} from '../../../shared/tasks/shared-tasks.module';
import {ChapterTasksComponent} from './chapter-tasks.component';
import {ChapterTasksControlPanelComponent} from './control-panel/chapter-tasks-control-panel.component';
import {ChapterTasksEmptyComponent} from './empty/chapter-tasks-empty.component';

@NgModule({
  imports: [CommonModule, SharedTasksModule, OphIconModule, MatButtonModule, AddMenuModule],
  declarations: [ChapterTasksComponent, ChapterTasksEmptyComponent, ChapterTasksControlPanelComponent],
  exports: [ChapterTasksComponent],
})
export class ChapterTasksModule {}
