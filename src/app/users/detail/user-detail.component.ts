import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoleService} from '../../core/api/legacy/role.service';
import {UserService} from '../../core/api/legacy/user.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {TitleService} from '../../core/page/title.service';
import {RoleDto} from '../../core/api/dto/role.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: any = {username: '', password: '', roles: []};
  roles: RoleDto[];

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private loading: SpinnerService,
    private location: Location,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private titleService: TitleService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loading.show();
    this.getUser();
    this.getRoles();
  }

  /*******************************************************************************
                            Service Calls
*******************************************************************************/
  goBack(): void {
    this.location.back();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe(r => {
      this.roles = r;
      this.loading.hide();
    });
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'new') {
      // If the user clicked edit, not create
      this.userService.getUser(id).subscribe(u => {
        this.user = u[0];
        this.titleService.setPageTitle(this.user.username, 'Edit User');
      });
    } else {
      this.titleService.setPageTitle('Create New User');
    }
  }

  saveUser(userToSave: any): void {
    this.loading.show();
    if (userToSave._id) {
      this.userService.updateUser(userToSave).subscribe(
        () => this.goBack(),
        () => this.loading.hide()
      );
    } else {
      this.userService.addUser(userToSave).subscribe(
        () => this.goBack(),
        () => this.loading.show()
      );
    }
  }

  /*******************************************************************************
                              Form Methods
*******************************************************************************/
  submitForm(): void {
    const userToSave = JSON.parse(JSON.stringify(this.user));
    delete userToSave.role; // Used for FE only.
    if (!userToSave.password) {
      delete userToSave.password;
    } // if password is empty string
    delete userToSave.passwordConfirm;
    userToSave.username = userToSave.username.trim();
    this.saveUser(userToSave);
  }

  userInputsValid(): boolean {
    if (!this.user.username?.trim().length) {
      return false;
    }

    return this.user.password ? this.user.password === this.user.passwordConfirm : true;
  }

  addRole(): void {
    if (!this.user.roles.includes(this.user.role)) {
      //can't add same role twice
      this.user.roles.push(this.user.role);
      this.user.role = {};
    }
  }

  getRoleDisplayName(roleId: string): string {
    return this.roles.find(r => r._id === roleId).displayName || '';
  }

  deleteRole(roleId: string): void {
    this.user.roles = this.user.roles.filter((r: string) => r !== roleId);
  }
}
