import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DesignModule} from '../../design/design.module';
import {NotificationsButtonComponent} from './notifications-button/notifications-button.component';
import {UserGroupActivePipe} from './pipes/user-group-active.pipe';
import {UserAvatarComponent} from './user-menu/button/avatar/user-avatar.component';
import {UserButtonComponent} from './user-menu/button/user-button.component';
import {UserMenuComponent} from './user-menu/user-menu.component';
import {PlotGroupActivePipe} from './pipes/plot-group-active.pipe';
import {SideBarComponent} from './side-bar/side-bar.component';
import {SidebarItemComponent} from './side-bar/item/sidebar-item.component';
import {SidebarGroupComponent} from './side-bar/group/sidebar-group.component';
import {SidebarGroupItemComponent} from './side-bar/group/item/sidebar-group-item.component';
import {PageTitleComponent} from './page-title/page-title.component';

@NgModule({
  imports: [CommonModule, DesignModule, RouterModule],
  declarations: [
    NotificationsButtonComponent,
    UserButtonComponent,
    UserAvatarComponent,
    UserMenuComponent,
    UserGroupActivePipe,
    PlotGroupActivePipe,
    SideBarComponent,
    SidebarItemComponent,
    SidebarGroupComponent,
    SidebarGroupItemComponent,
    PageTitleComponent,
  ],
  exports: [
    DesignModule,
    NotificationsButtonComponent,
    UserMenuComponent,
    RouterModule,
    UserGroupActivePipe,
    PlotGroupActivePipe,
    SideBarComponent,
    UserAvatarComponent,
    PageTitleComponent,
  ],
})
export class SharedLayoutModule {}
