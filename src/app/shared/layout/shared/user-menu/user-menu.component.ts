import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {ProductionEnvironmentService} from 'src/app/core/page/production-environment.service';
import {selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {GetAllSkedTemplatesAction, ReinstantiateWeekAction} from 'src/app/core/store/skeds/skeds.action';
import {MessageService} from 'src/app/services/message.service';
import {SkedTemplateAbandonDialogComponent} from 'src/app/skeds/templates/shared/abandon-dialog/sked-template-abandon-dialog.component';
import {OphMenuComponent} from '../../../design/oph-menu/oph-menu.component';
import {UserButtonComponent} from './button/user-button.component';
import {AuthenticationService} from '../../../../auth/auth.service';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  @Input()
  public mobile: boolean;

  @ViewChild(UserButtonComponent, {static: true})
  public userButton: UserButtonComponent;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  public skedsLegacy$: Observable<boolean>;
  public edited$: Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private productionEnvironmentService: ProductionEnvironmentService,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit() {
    this.skedsLegacy$ = this.productionEnvironmentService.observeHostname();
    this.edited$ = this.store$.pipe(select(selectRouterQueryParam('edited')));
  }

  public onButtonClick() {
    this.menu.open();
  }

  public onReinstantiateSkedClick() {
    this.store$.dispatch(
      new ReinstantiateWeekAction({
        onSuccess: () => this.onSuccess(),
        onFailure: err => this.onFailure(err.toString()),
      })
    );
    this.menu.close();
  }

  public onLogOutClick() {
    this.edited$.pipe(take(1)).subscribe(edited => {
      if (edited) {
        const dialog = this.dialog.open(SkedTemplateAbandonDialogComponent, {
          backdropClass: 'oph-backdrop',
          panelClass: 'oph-dialog',
        });
        dialog.afterClosed().subscribe(confirm => {
          if (confirm) {
            this.router.navigate(['/login']);
            return;
          }
        });
      } else {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  private onSuccess() {
    this.messageService.add('Success! The week has been reinstantiated.');
    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
  }

  private onFailure(err: string) {
    if (err === 'OK') {
      this.messageService.add('Success! The week has been reinstantiated.');
      this.store$.dispatch(new GetAllSkedTemplatesAction({}));
      return;
    }
    this.messageService.add('Error: There was a problem reinstantiating the week.');
  }

  onToggleThemeClick() {
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'light-mode');
      document.body.classList.replace('dark-mode', 'light-mode');
    } else {
      localStorage.setItem('theme', 'dark-mode');
      document.body.classList.replace('light-mode', 'dark-mode');
    }
  }
}
