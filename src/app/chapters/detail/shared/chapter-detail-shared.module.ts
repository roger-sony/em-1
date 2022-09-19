import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {RouterModule} from '@angular/router';
import {DeleteDialogModule} from '../../../shared/dialog/delete/delete-dialog.module';
import {DialogLayoutModule} from '../../../shared/dialog/layout/dialog-layout.module';
import {BackButtonModule} from '../../../shared/design/back-button/back-button.module';
import {OphIconModule} from '../../../shared/design/oph-icon/oph-icon.module';
import {OphMenuModule} from '../../../shared/design/oph-menu/oph-menu.module';
import {DesktopModule} from '../../../shared/desktop/desktop.module';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {ChapterDetailHeaderComponent} from './header/chapter-detail-header.component';
import {ChapterDatePickerComponent} from './header/date-picker/chapter-date-picker.component';
import {ChapterDetailMenuComponent} from './header/menu/chapter-detail-menu.component';
import {ChapterDetailNavigationComponent} from './navigation/chapter-detail-navigation.component';
import {ChapterTaskSchedulerComponent} from './task-scheduler/chapter-task-scheduler.component';
import {ChapterDeleteDialogComponent} from './header/delete-dialog/chapter-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BackButtonModule,
    DesktopModule,
    OphMenuModule,
    OphIconModule,
    DialogLayoutModule,
    MatButtonModule,
    DeleteDialogModule,
    MatDatepickerModule,
    PipesModule,
    MatTabsModule,
  ],
  declarations: [
    ChapterDetailHeaderComponent,
    ChapterDetailNavigationComponent,
    ChapterTaskSchedulerComponent,
    ChapterDatePickerComponent,
    ChapterDetailMenuComponent,
    ChapterDeleteDialogComponent,
  ],
  exports: [
    ChapterDetailHeaderComponent,
    ChapterDetailNavigationComponent,
    ChapterTaskSchedulerComponent,
    ChapterDatePickerComponent,
  ],
})
export class ChapterDetailSharedModule {}
