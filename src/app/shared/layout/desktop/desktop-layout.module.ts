import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DesignModule} from '../../design/design.module';
import {SharedLayoutModule} from '../shared/shared-layout.module';
import {DesktopLayoutComponent} from './desktop-layout.component';
import {DesktopSidebarComponent} from './sidebar/desktop-sidebar.component';
import {SidebarGroupItemComponent} from './sidebar/group/item/sidebar-group-item.component';
import {SidebarGroupComponent} from './sidebar/group/sidebar-group.component';
import {SidebarItemComponent} from './sidebar/item/sidebar-item.component';
import {DesktopTopBarComponent} from './top-bar/desktop-top-bar.component';
import {DesktopToolbarSearchComponent} from './top-bar/search/desktop-toolbar-search.component';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  imports: [
    SharedLayoutModule,
    DesignModule,
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  declarations: [
    DesktopLayoutComponent,
    DesktopTopBarComponent,
    DesktopToolbarSearchComponent,
    DesktopSidebarComponent,
    SidebarItemComponent,
    SidebarGroupComponent,
    SidebarGroupItemComponent,
  ],
  exports: [DesktopLayoutComponent, DesktopSidebarComponent],
})
export class DesktopLayoutModule {}
