import {DeleteUserDialogComponent} from './delete-user-dialog/delete-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../core/api/legacy/user.service';
import {RoleService} from '../../core/api/legacy/role.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {TitleService} from '../../core/page/title.service';
import {RoleDto} from '../../core/api/dto/role.dto';
import {UserDto} from '../../core/api/dto/user.dto';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject, Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Router} from '@angular/router';
import {selectActiveUserPrivileges} from '../../core/store/active-user/active-user.selector';
import {Store} from '@ngrx/store';

/* tslint:disable:no-any */
@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: UserDto[];
  roles: Record<string, RoleDto>;

  public readonly activeUserPrivileges: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public readonly dataSource: BehaviorSubject<MatTableDataSource<UserDto>> = new BehaviorSubject<
    MatTableDataSource<UserDto>
  >(null);
  public readonly columnsToDisplay: string[] = ['UserName', 'Action'];
  public expandedElement: string;

  private readonly subscription: Subscription = new Subscription();

  get canEditUsers(): boolean {
    return this.activeUserPrivileges?.value?.includes('Can edit Users');
  }

  constructor(
    private dialog: MatDialog,
    private loading: SpinnerService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private titleService: TitleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Manage Users');

    this.loading.show();
    this.getUsers();
    this.getRoles();

    this.subscription.add(
      this.store.select(selectActiveUserPrivileges).subscribe(p => this.activeUserPrivileges.next(p))
    );
  }

  ngOnDestroy() {
    this.dataSource.unsubscribe();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(u => {
      this.users = u;
      this.dataSource.next(new MatTableDataSource<UserDto>(u));
      this.loading.hide();
    });
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(r => {
      this.roles = r.reduce((map: Record<string, RoleDto>, obj) => ((map[obj._id] = obj), map), {});
    });
  }

  onEditUser(userId: string, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([userId], {relativeTo: this.route});
  }

  onDeleteUser(userId: string, event: MouseEvent) {
    event.stopPropagation();
    this.openDeleteDialog(userId);
  }

  private openDeleteDialog(userId: string) {
    this.dialog
      .open(DeleteUserDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
      })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.userService.deleteUser(userId).subscribe(e => {
            this.getUsers();
          });
        }
      });
  }
}
