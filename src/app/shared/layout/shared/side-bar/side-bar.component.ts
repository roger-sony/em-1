import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {SidebarGroupComponent} from './group/sidebar-group.component';
import {AuthenticationService} from '../../../../auth/auth.service';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  @Input()
  public routerUrl: string;

  @Input()
  public privileges: string[];

  @Output()
  public close = new EventEmitter();

  @ViewChildren(SidebarGroupComponent)
  public sidebarGroups: QueryList<SidebarGroupComponent>;

  get executionInterfacePermissions(): string[] {
    return this.authService.executionInterfacePermissions;
  }
  get lexiconPermissions(): string[] {
    return this.authService.lexiconPermissions;
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

  constructor(private router: Router, private authService: AuthenticationService) {}

  public onGroupExpand(originIndex: number) {
    if (originIndex === 0) {
      this.router.navigate(['paragraphs']);
      this.close.emit();
    }
    return;
    // (this.sidebarGroups || []).forEach((sidebarGroup, index) => {
    //   if (index !== originIndex && originIndex !== 0) {
    //     sidebarGroup.collapse();
    //   }
    // });
  }

  public onClick() {
    this.close.emit();
  }

  hasAccessToUsers() {
    const usersPrivileges = [...this.usersPermissions, ...this.rolesPermissions, ...this.privilegesPermissions];

    return usersPrivileges?.some(permission => this.privileges?.includes(permission));
  }

  hasExecutionInterfacePermissions() {
    return this.executionInterfacePermissions.some(permission => this.privileges?.includes(permission));
  }

  hasLexiconPermissions() {
    return this.lexiconPermissions.some(permission => this.privileges?.includes(permission));
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
