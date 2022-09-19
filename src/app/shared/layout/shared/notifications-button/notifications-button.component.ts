import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {SkedTemplateAbandonDialogComponent} from 'src/app/skeds/templates/shared/abandon-dialog/sked-template-abandon-dialog.component';

@Component({
  selector: 'notifications-button',
  templateUrl: './notifications-button.component.html',
  styleUrls: ['./notifications-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsButtonComponent implements OnInit {
  public edited$: Observable<boolean>;

  @Input()
  public mobile: boolean;

  constructor(private dialog: MatDialog, private router: Router, private store$: Store) {}

  public ngOnInit() {
    this.edited$ = this.store$.pipe(select(selectRouterQueryParam('edited')));
  }

  public onButtonClick() {
    this.edited$.pipe(take(1)).subscribe(edited => {
      if (edited) {
        const dialog = this.dialog.open(SkedTemplateAbandonDialogComponent, {
          backdropClass: 'oph-backdrop',
          panelClass: 'oph-dialog',
        });
        dialog.afterClosed().subscribe(confirm => {
          if (confirm) {
            this.router.navigate(['dashboard']);
            return;
          }
        });
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }
}
