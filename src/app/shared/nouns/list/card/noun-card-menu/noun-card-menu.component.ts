import {Component, ChangeDetectionStrategy, Input, ViewChild} from '@angular/core';
import {InventoryItem} from 'src/app/core/model/inventory-item';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';
// import {MatDialog} from '@angular/material/dialog';
// import { MessageService } from 'src/app/services/message.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {RemoveInventoryItemFromChapterAction} from 'src/app/core/store/inventory/inventory.action';
import {GetSingleChapterAction, GetChapterNounsAction} from 'src/app/core/store/chapters/chapters.action';
// import {NounDeleteDialogComponent} from 'src/app/shared/nouns/delete-dialog/noun-delete-dialog.component';
// import { selectRouterParam } from 'src/app/core/store/router/router.selector';
// import { take } from 'rxjs/operators';

@Component({
  selector: 'noun-card-menu',
  templateUrl: './noun-card-menu.component.html',
  styleUrls: ['./noun-card-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounCardMenuComponent {
  @Input()
  public chapterId: string;

  @Input()
  public noun: InventoryItem;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  constructor(
    // private dialog: MatDialog,
    // private messageService: MessageService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public onToggleClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.open();
  }

  public onRemoveFromChapterClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.store$.dispatch(
      new RemoveInventoryItemFromChapterAction({
        chapterId: this.chapterId,
        inventoryItemId: this.noun.id,
        onSuccess: () => this.onRemoveFromChapterSuccess(),
      })
    );
  }

  public onRemoveFromChapterSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapterId}));
    this.store$.dispatch(new GetChapterNounsAction({chapterId: this.chapterId}));
  }

  // public onDeleteClick(event: MouseEvent) {
  //   event.stopPropagation();
  //   this.menu.close();
  //   this.showDeleteConfirmDialog();
  // }

  // private showDeleteConfirmDialog() {
  //   const dialog = this.dialog.open(NounDeleteDialogComponent, {
  //     backdropClass: 'oph-backdrop',
  //     panelClass: 'oph-dialog',
  //   });
  //   dialog.afterClosed().subscribe(confirmed => {
  //     if (confirmed) {
  //       this.deleteNoun();
  //     }
  //   });
  // }

  // private deleteNoun() {
  //   //TODO: create delete noun action
  //   this.store$.dispatch(
  //     new DeleteInventoryItemAction({
  //       inventoryItemId: this.noun.id,
  //       onSuccess: () => this.onDeleteNounSuccess(),
  //       onFailure: () => this.onDeleteNounFailure(),
  //     })
  //   );
  // }

  // private onDeleteNounSuccess() {
  //   this.store$.pipe(select(selectRouterParam('nounId')), take(1)).subscribe(nounId => {
  //     if (nounId) {
  //       this.router.navigate(['/nouns']);
  //     }
  //   });
  //   this.messageService.add('Success! The noun has been deleted.');
  // }

  // private onDeleteNounFailure() {
  //   this.messageService.add('Error: There was a problem deleting the noun.');
  // }

  public onEditClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.router.navigate(['/nouns', this.noun.id, {edit: true}], {queryParams: {returnTo: this.router.url}});
  }

  public onCloneClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.router.navigate(['/nouns', this.noun.id], {queryParams: {returnTo: this.router.url}});
  }
}
