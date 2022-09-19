import {Injectable, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {DialogModalComponent} from './dialog-modal.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService implements OnDestroy {
  private dialog: MatDialogRef<DialogModalComponent>;
  private subscriptions = new Subscription();

  public constructor(private matDialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router) {}

  public init() {
    this.subscriptions.add(this.subscribeToDialogOpen());
    this.subscriptions.add(this.subscribeToDialogClose());
  }

  private subscribeToDialogOpen(): Subscription {
    return this.router.events
      .pipe(
        filter(event => !this.dialog && event instanceof NavigationStart),
        filter((event: NavigationStart) => event.url.split('?')[0].includes('(dialog:'))
      )
      .subscribe(() => this.openDialog());
  }

  private subscribeToDialogClose(): Subscription {
    return this.router.events
      .pipe(
        filter(event => this.dialog && event instanceof NavigationStart),
        filter((event: NavigationStart) => !event.url.split('?')[0].includes('(dialog:'))
      )
      .subscribe(() => this.closeDialog());
  }

  private openDialog() {
    if (this.dialog) {
      return;
    }

    this.dialog = this.matDialog.open(DialogModalComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
      disableClose: true,
    });

    this.subscriptions.add(
      this.dialog.afterClosed().subscribe(() => {
        this.dialog = null;
        this.clearDialogUrl();
      })
    );
  }

  public closeDialog() {
    if (this.dialog) {
      this.dialog.close();
      this.dialog = null;
    }
  }

  private clearDialogUrl() {
    if (this.router.url.includes('(dialog:')) {
      this.navigateToDialog(null);
    }
  }

  public navigateToDialog(path: string) {
    this.router.navigate(['', {outlets: {dialog: path}}], {
      queryParamsHandling: 'preserve',
      relativeTo: this.activatedRoute,
    });
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
