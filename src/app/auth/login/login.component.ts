import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, take} from 'rxjs/operators';
import {AuthenticationService} from '../auth.service';
import {TitleService} from '../../core/page/title.service';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {RoleApiService} from '../../core/api/role-api.service';
import {UserApiService} from '../../core/api/user-api.service';
import {SetActiveUser, SetActiveUserPrivileges} from '../../core/store/active-user/active-user.action';
import {Store} from '@ngrx/store';
import {convertUserDtoToModel} from '../../core/api/utils/convert-user-dto-to-model';
import {convertRoleDtoToModel} from '../../core/api/utils/convert-role-dto-to-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorMsg: string;

  public showPassword$ = new BehaviorSubject<boolean>(false);

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private roleApiService: RoleApiService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private titleService: TitleService,
    private userApiService: UserApiService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Login');

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/current-sked';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          combineLatest([this.userApiService.getAll(), this.roleApiService.getAll()]).subscribe(([users, roles]) => {
            const user = users.find(u => u.username === data.username);

            if (user) {
              const filteredRoles = roles.map(r => convertRoleDtoToModel(r)).filter(r => user.roles.includes(r.id));

              this.store.dispatch(new SetActiveUser({user: convertUserDtoToModel(user)}));

              if (filteredRoles) {
                const uniquePrivileges = Array.from(
                  new Set<string>(filteredRoles.reduce((res, cur) => [...res, ...cur.privileges], []).map(p => p.name))
                );
                this.store.dispatch(new SetActiveUserPrivileges({privileges: uniquePrivileges}));
              }
            }
            this.router.navigateByUrl(this.returnUrl);
          });
          this.checkSubtaskLocalStorage();
        },
        error => {
          // TODO: Add some error handling/user msgs
          this.errorMsg = 'Incorrect username/password. Please try again.';
          this.loading = false;
        }
      );
  }

  // Checks in local storage for any saved subtask updates older than 24 hours and deletes them
  checkSubtaskLocalStorage(): void {
    const currentDate = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const subtaskStorage = JSON.parse(localStorage.getItem('subtasks'));
    if (subtaskStorage) {
      for (const i of Object.keys(subtaskStorage)) {
        const storedDate = new Date(subtaskStorage[i][0].createdDate).getTime();
        if (currentDate - storedDate > oneDay) {
          delete subtaskStorage[i];
          // check if object is empty
          if (Object.entries(subtaskStorage).length === 0 && subtaskStorage.constructor === Object) {
            localStorage.removeItem('subtasks');
          } else {
            localStorage.setItem('subtasks', JSON.stringify(subtaskStorage));
          }
        }
      }
    }
  }

  public onTogglePassword(event: MouseEvent) {
    event.preventDefault();
    this.showPassword$.pipe(take(1)).subscribe(showPassword => {
      this.showPassword$.next(!showPassword);
    });
  }
}
