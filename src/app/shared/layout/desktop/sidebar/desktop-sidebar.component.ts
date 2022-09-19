import {ChangeDetectionStrategy, Component, Input, QueryList, ViewChildren} from '@angular/core';
import {SidebarGroupComponent} from './group/sidebar-group.component';
import {selectActiveUser, selectActiveUserPrivileges} from '../../../../core/store/active-user/active-user.selector';
import {Store} from '@ngrx/store';
import {AuthenticationService} from '../../../../auth/auth.service';

@Component({
  selector: 'desktop-sidebar',
  templateUrl: './desktop-sidebar.component.html',
  styleUrls: ['./desktop-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesktopSidebarComponent {
  @Input()
  public routerUrl: string;

  @Input()
  public privileges: string[];

  @ViewChildren(SidebarGroupComponent)
  public sidebarGroups: QueryList<SidebarGroupComponent>;

  public readonly activeUser$ = this.store.select(selectActiveUser);
  public readonly activeUserPrivileges$ = this.store.select(selectActiveUserPrivileges);

  get executionInterfacePermissions(): string[] {
    return this.authService.executionInterfacePermissions;
  }
  get lexiconPermissions(): string[] {
    return this.authService.lexiconPermissions;
  }
  get currentChapterPermissions(): string[] {
    return this.authService.currentChapterPermissions;
  }
  get paragraphPermissions(): string[] {
    return this.authService.paragraphPermissions;
  }
  get chapterPermissions(): string[] {
    return this.authService.chapterPermissions;
  }
  get usersPermissions(): string[] {
    return this.authService.usersPermissions;
  }
  get rolesPermissions(): string[] {
    return this.authService.rolesPermissions;
  }
  get privilegesPermissions(): string[] {
    return this.authService.privilegesPermissions;
  }

  constructor(private store: Store, private authService: AuthenticationService) {}

  isSelected(module: string): boolean {
    return this.routerUrl?.includes(`/${module}`);
  }

  hasExecutionInterfacePermissions() {
    return this.executionInterfacePermissions.some(permission => this.privileges?.includes(permission));
  }

  hasLexiconPermissions() {
    return this.lexiconPermissions.some(permission => this.privileges?.includes(permission));
  }

  hasCurrentChapterPermissions() {
    return this.currentChapterPermissions.some(permission => this.privileges?.includes(permission));
  }

  hasParagraphPermissions() {
    return this.paragraphPermissions.some(permission => this.privileges?.includes(permission));
  }

  hasChapterPermissions() {
    return this.chapterPermissions.some(permission => this.privileges?.includes(permission));
  }

  hasUsersPermissions() {
    return this.usersPermissions.some(permission => this.privileges?.includes(permission));
  }

  hasRolesPermissions() {
    return this.rolesPermissions.some(permission => this.privileges?.includes(permission));
  }

  hasPrivilegesPermissions() {
    return this.privilegesPermissions.some(permission => this.privileges?.includes(permission));
  }
}
