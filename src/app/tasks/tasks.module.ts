import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksListComponent} from './list/tasks-list.component';
import {TasksRoutingModule} from './tasks-routing.module';
import {DesktopSearchPanelModule} from '../shared/desktop/search-panel/desktop-search-panel.module';
import {OphCardModule} from '../shared/design/oph-card/oph-card.module';
import {OphIconModule} from '../shared/design/oph-icon/oph-icon.module';
import {TasksListHeaderComponent} from './list/header/tasks-list-header.component';
import {CreateTasksButtonComponent} from './shared/create-button/create-tasks-button.component';
import {TasksControlPanelComponent} from './list/header/control-panel/tasks-control-panel.component';
import {SharedTasksModule} from '../shared/tasks/shared-tasks.module';
import {TaskCardComponent} from './shared/task-card/task-card.component';
import {TaskContentComponent} from './shared/task-card/task-content/task-content.component';
import {MatButtonModule} from '@angular/material/button';
import {ChapterChipsModule} from '../shared/chapters/chapter-chips/chapter-chips.module';
import {TaskMenuComponent} from './shared/task-card/task-menu/task-menu.component';
import {OphMenuModule} from '../shared/design/oph-menu/oph-menu.module';
import {SharedModule} from '../shared/shared.module';
import {TaskTableComponent} from './shared/task-table/task-table.component';
import {TaskDetailModule} from './detail/task-detail.module';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {TaskGridComponent} from './task-grid/task-grid.component';
import {OphSelectModule} from '../shared/design/oph-select/oph-select.module';
import {OphFormFieldModule} from '../shared/design/oph-form-field/oph-form-field.module';
import {TableToolbarComponent} from './list/header/table-toolbar/table-toolbar.component';
import {PipesModule} from '../shared/pipes/pipes.module';
import {LoadingModule} from '../shared/design/loading/loading.module';

@NgModule({
  declarations: [
    TasksListComponent,
    TasksListHeaderComponent,
    CreateTasksButtonComponent,
    TasksControlPanelComponent,
    TaskCardComponent,
    TaskContentComponent,
    TaskMenuComponent,
    TaskTableComponent,
    TaskGridComponent,
    TableToolbarComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    DesktopSearchPanelModule,
    OphCardModule,
    OphIconModule,
    SharedTasksModule,
    MatButtonModule,
    ChapterChipsModule,
    OphMenuModule,
    SharedModule,
    MatListModule,
    MatTableModule,
    OphSelectModule,
    OphFormFieldModule,
    PipesModule,
    TaskDetailModule,
    LoadingModule,
  ],
})
export class TasksModule {}
