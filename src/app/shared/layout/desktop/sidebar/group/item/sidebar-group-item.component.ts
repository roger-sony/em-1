import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {SkedTemplateAbandonDialogComponent} from 'src/app/skeds/templates/shared/abandon-dialog/sked-template-abandon-dialog.component';

@Component({
  selector: 'sidebar-group-item',
  templateUrl: './sidebar-group-item.component.html',
  styleUrls: ['./sidebar-group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupItemComponent implements OnInit {
  @Input()
  public text: string;

  @Input()
  public routerUrl: string;

  @Input()
  public url: string;

  public edited$: Observable<boolean>;

  constructor(private dialog: MatDialog, private router: Router, private store$: Store) {}

  public ngOnInit() {
    this.edited$ = this.store$.pipe(select(selectRouterQueryParam('edited')));
  }

  public onItemClick() {
    this.edited$.pipe(take(1)).subscribe(edited => {
      if (edited) {
        const dialog = this.dialog.open(SkedTemplateAbandonDialogComponent, {
          backdropClass: 'oph-backdrop',
          panelClass: 'oph-dialog',
        });
        dialog.afterClosed().subscribe(confirm => {
          if (confirm) {
            this.router.navigate([this.url]);
            return;
          }
        });
      } else {
        this.router.navigate([this.url]);
      }
    });
  }
}
