import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {distinctUntilChanged, switchMap, take} from 'rxjs/operators';
import {Privilege} from 'src/app/app.constants';
import {Role} from 'src/app/core/model/role';
import {
  CreateNewRoleAction,
  FetchActiveUserRoles,
  GetAllRolesAction,
  UpdateRoleAction,
} from 'src/app/core/store/roles/roles.action';
import {selectRoleById} from 'src/app/core/store/roles/roles.selector';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {MessageService} from 'src/app/services/message.service';
import {TitleService} from '../../core/page/title.service';
import {FetchAllowedPrivilegesAction} from '../../core/store/privileges/privileges.action';
import {selectAllowedPrivileges} from '../../core/store/privileges/privileges.selector';
import {RoleDto} from '../../core/api/dto/role.dto';
import {SetActiveUserPrivileges} from '../../core/store/active-user/active-user.action';

/* tslint:disable:no-any */
@Component({
  selector: 'role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public form = new FormGroup({
    privileges: new FormControl([] as Privilege[]),
    displayName: new FormControl(''),
  });

  role: any;

  private roleId$: Observable<string>;
  public role$: Observable<Role>;

  public invalid$ = new BehaviorSubject<boolean>(true);
  public checkedMap$ = new BehaviorSubject<Record<string, Privilege>>({});
  public privileges$: BehaviorSubject<Privilege[]> = new BehaviorSubject<Privilege[]>(null);

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private messageService: MessageService,
    private location: Location,
    private titleService: TitleService,
    private store$: Store
  ) {}

  ngOnInit() {
    this.store$.dispatch(new GetAllRolesAction({}));
    this.store$.dispatch(new FetchAllowedPrivilegesAction({}));

    this.roleId$ = this.store$.pipe(select(selectRouterParam('id')));
    this.role$ = this.observeRoleId();

    this.subscriptions.add(this.subscribeToRole());
    this.subscriptions.add(this.subscribeToFormChanges());
    this.subscriptions.add(
      this.store$.pipe(select(selectAllowedPrivileges)).subscribe(privileges => this.privileges$.next(privileges))
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /*******************************************************************************
                            Service Calls
*******************************************************************************/
  goBack(): void {
    this.location.back();
  }

  private observeRoleId(): Observable<Role> {
    return this.roleId$.pipe(
      switchMap(roleId => {
        if (roleId) {
          return this.store$.pipe(select(selectRoleById(roleId)));
        }
        return of({} as Role);
      })
    );
  }

  private subscribeToRole(): Subscription {
    return this.role$.subscribe(role => {
      if (role && role.id !== 'new') {
        this.titleService.setPageTitle(role.displayName, 'Edit Role');
        this.fillInForm(role);
      } else {
        this.titleService.setPageTitle('Create New Role');
      }
    });
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges.pipe(distinctUntilChanged()).subscribe(form => {
      const invalid = form.displayName?.trim().length < 1;
      this.invalid$.next(invalid);
      this.createCheckedMap(form.privileges);
    });
  }

  private fillInForm(role: Role) {
    this.form.setValue({
      displayName: role.displayName || '',
      privileges: role.privileges || [],
    });
  }

  private createCheckedMap(privileges: Privilege[]) {
    const checkedMap =
      privileges?.reduce?.((map: Record<string, Privilege>, obj) => {
        map[obj.id] = obj;

        return map;
      }, {}) || {};
    this.checkedMap$.next(checkedMap);
  }

  public onCheckboxClick(checked: boolean, privilege: Privilege) {
    const privileges =
      (checked && [...this.form.value.privileges, privilege]) ||
      [...this.form.value.privileges].filter(p => p.id !== privilege.id);

    this.form.patchValue({privileges});
  }

  onSave(): void {
    this.invalid$.next(true);
    this.role$.pipe(take(1)).subscribe(currentRole => {
      if (currentRole) {
        const role = {...this.form.value, id: currentRole.id};
        this.store$.dispatch(
          new UpdateRoleAction({
            role,
            onSuccess: () => this.onRoleSuccess(true),
            onFailure: err => this.onRoleFailure(err, true),
          })
        );
      } else {
        this.store$.dispatch(
          new CreateNewRoleAction({
            role: this.form.value,
            onSuccess: () => this.onRoleSuccess(),
            onFailure: err => this.onRoleFailure(err),
          })
        );
      }
    });
  }

  private onRoleSuccess(update?: boolean) {
    const message = update ? 'updated.' : 'created.';
    this.messageService.add(`Success! The Role has been ${message}`);
    this.store$.dispatch(
      new FetchAllowedPrivilegesAction({
        onSuccess: () => {
          this.store$.dispatch(
            new FetchActiveUserRoles({
              onSuccess: (roles: RoleDto[]) => {
                const uniqPrivileges = Array.from(
                  new Set<string>(roles.reduce((res, cur) => [...res, ...cur.privileges], []).map(p => p.name))
                );
                this.store$.dispatch(new SetActiveUserPrivileges({privileges: Array.from(uniqPrivileges)}));
              },
            })
          );
        },
      })
    );
  }

  private onRoleFailure(err: Error, update?: boolean) {
    this.invalid$.next(false);
    const message = update ? 'updating' : 'creating';
    this.messageService.add(`Error: There was a problem ${message} the Role.`);
  }
}
