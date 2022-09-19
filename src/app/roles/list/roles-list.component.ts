import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Role} from 'src/app/core/model/role';
import {DeleteRoleAction} from 'src/app/core/store/roles/roles.action';
import {MessageService} from 'src/app/services/message.service';
import {DeleteRoleDialogComponent} from './delete-role-dialog/delete-role-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SpinnerService} from '../../core/page/spinner.service';
import {RoleService} from '../../core/api/legacy/role.service';
import {TitleService} from '../../core/page/title.service';
import {selectActiveUserPrivileges} from '../../core/store/active-user/active-user.selector';

@Component({
  selector: 'roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RolesListComponent implements OnInit, OnDestroy {
  public readonly activeUserPrivileges: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public readonly dataSource: BehaviorSubject<MatTableDataSource<Role>> = new BehaviorSubject<MatTableDataSource<Role>>(
    null
  );
  public readonly columnsToDisplay: string[] = ['RoleName', 'Action'];
  public expandedElement: string;

  private readonly subscription: Subscription = new Subscription();

  get canEditRoles(): boolean {
    return this.activeUserPrivileges?.value?.includes('Can edit Roles');
  }

  constructor(
    private dialog: MatDialog,
    private loading: SpinnerService,
    private messageService: MessageService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('User Roles');
    this.loading.show();

    this.getRoles();

    this.subscription.add(
      this.store$.select(selectActiveUserPrivileges).subscribe(p => this.activeUserPrivileges.next(p))
    );
  }

  ngOnDestroy() {
    this.dataSource.unsubscribe();
    this.activeUserPrivileges.unsubscribe();
    this.subscription.unsubscribe();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(roles => {
      this.dataSource.next(
        new MatTableDataSource<Role>(
          roles.map(r => ({
            displayName: r.displayName,
            privileges: r.privileges,
            id: r._id,
          }))
        )
      );
      this.loading.hide();
    });
  }

  onEditRole(roleId: string, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate([roleId], {relativeTo: this.route});
  }

  public onDeleteRole(roleId: string, event: MouseEvent) {
    event.stopPropagation();
    this.openDeleteDialog(roleId);
  }

  private openDeleteDialog(roleId: string) {
    this.dialog
      .open(DeleteRoleDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
      })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.store$.dispatch(
            new DeleteRoleAction({
              roleId,
              onSuccess: () => this.onDeleteSuccess(),
              onFailure: err => this.onDeleteFailure(err),
            })
          );
        }
      });
  }

  private onDeleteSuccess() {
    this.messageService.add('Success! The Role was deleted.');
    this.getRoles();
  }

  private onDeleteFailure(err: Error) {
    this.messageService.add('Error: Failed to delete the Role. Please try again.');
  }
}
