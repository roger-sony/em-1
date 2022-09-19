import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {DeletePrivilegeDialogComponent} from './delete-privilege-dialog/delete-privilege-dialog.component';
import {PrivilegeDetailsDialogComponent} from './privilege-details-dialog/privilege-details-dialog.component';
import {Privilege} from '../../app.constants';
import {SpinnerService} from '../../core/page/spinner.service';
import {MessageService} from '../../services/message.service';
import {PrivilegesApiService} from '../../core/api/privileges-api.service';
import {TitleService} from '../../core/page/title.service';
import {
  CreatePrivilegeAction,
  DeletePrivilegeAction,
  UpdatePrivilegeAction,
} from '../../core/store/privileges/privileges.action';
import {selectActiveUserPrivileges} from '../../core/store/active-user/active-user.selector';

@Component({
  selector: 'privileges-list',
  templateUrl: './privileges-list.component.html',
  styleUrls: ['./privileges-list.component.scss'],
})
export class PrivilegesListComponent implements OnInit, OnDestroy {
  public readonly columnsToDisplay: string[] = ['PrivilegeName', 'Action'];
  public readonly activeUserPrivileges: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public readonly dataSource: BehaviorSubject<MatTableDataSource<Privilege>> = new BehaviorSubject<
    MatTableDataSource<Privilege>
  >(null);

  private readonly subscription: Subscription = new Subscription();

  get canEditPrivileges(): boolean {
    return this.activeUserPrivileges?.value?.includes('Can edit Privileges');
  }

  constructor(
    private dialog: MatDialog,
    private loading: SpinnerService,
    private messageService: MessageService,
    private privilegesService: PrivilegesApiService,
    private store$: Store,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Privileges');
    this.getPrivileges();

    this.subscription.add(
      this.store$.select(selectActiveUserPrivileges).subscribe(p => this.activeUserPrivileges.next(p))
    );
  }

  ngOnDestroy() {
    this.activeUserPrivileges?.unsubscribe();
    this.dataSource?.unsubscribe();
    this.subscription?.unsubscribe();
  }

  getPrivileges(): void {
    this.loading.show();
    this.privilegesService.fetch().subscribe(privileges => {
      this.dataSource.next(
        new MatTableDataSource<Privilege>(
          privileges.map(p => ({
            name: p.name,
            v: p.__v,
            id: p._id,
          }))
        )
      );
      this.loading.hide();
    });
  }

  createPrivilege() {
    this.openEditDialog();
  }

  onEditPrivilege(privilege: Privilege, event: MouseEvent) {
    event.stopPropagation();
    this.openEditDialog(privilege);
  }

  public onDeletePrivilege(privilegeId: string, event: MouseEvent) {
    event.stopPropagation();
    this.openDeleteDialog(privilegeId);
  }

  private openDeleteDialog(privilegeId: string) {
    this.dialog
      .open(DeletePrivilegeDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
      })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.store$.dispatch(
            new DeletePrivilegeAction({
              privilegeId,
              onSuccess: () => this.onDeleteSuccess(),
              onFailure: err => this.onDeleteFailure(err),
            })
          );
        }
      });
  }

  private openEditDialog(privilege?: Privilege) {
    this.dialog
      .open(PrivilegeDetailsDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
        data: {
          privilege: privilege || {},
          isCreate: !!privilege,
        },
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          if (!!privilege) {
            this.store$.dispatch(
              new UpdatePrivilegeAction({
                privilege: result,
                onSuccess: () => this.onUpdateSuccess(),
                onFailure: err => this.onUpdateFailure(err),
              })
            );
          } else if (result?.name) {
            this.store$.dispatch(
              new CreatePrivilegeAction({
                name: result.name,
                onSuccess: () => this.onUpdateSuccess(),
                onFailure: err => this.onUpdateFailure(err),
              })
            );
          }
        }
      });
  }

  private onUpdateSuccess() {
    this.messageService.add('Success! The Privilege was updated.');
    this.getPrivileges();
  }

  private onUpdateFailure(err: Error) {
    this.messageService.add('Error: Failed to update the Privilege. Please try again.');
  }

  private onDeleteSuccess() {
    this.messageService.add('Success! The Privilege was deleted.');
    this.getPrivileges();
  }

  private onDeleteFailure(err: Error) {
    this.messageService.add('Error: Failed to delete the Privilege. Please try again.');
  }
}
