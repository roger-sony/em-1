import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChaptersListComponent} from './chapters-list.component';
import {ChaptersListHeaderComponent} from './header/chapters-list-header.component';
import {ChaptersListToolbarComponent} from './toolbar/chapters-list-toolbar.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {DesktopModule} from 'src/app/shared/desktop/desktop.module';
import {ChapterCardModule} from '../shared/card/chapter-card.module';
import {ChaptersListEmptyComponent} from './chapters-list-empty/chapters-list-empty.component';
import {ChaptersControlPanelComponent} from './header/control-panel/chapters-control-panel.component';
import {ChaptersSharedModule} from '../shared/chapters-shared.module';

@NgModule({
  declarations: [
    ChaptersListComponent,
    ChaptersListHeaderComponent,
    ChaptersListToolbarComponent,
    ChaptersListEmptyComponent,
    ChaptersControlPanelComponent,
  ],
  imports: [CommonModule, SharedModule, DesktopModule, ChapterCardModule, ChaptersSharedModule],
})
export class ChaptersListModule {}
