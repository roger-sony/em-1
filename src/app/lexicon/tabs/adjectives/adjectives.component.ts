import {RenameDialogComponent} from '../../../shared/dialog/rename/rename-dialog.component';
import {debounceTime, distinctUntilChanged, take} from 'rxjs/operators';
import {EditAdjectiveDialogComponent} from './edit/edit-adjective-dialog.component';
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {MessageService} from '../../../services/message.service';
import {Adjective} from '../../../core/model/adjective';
import {
  CreateNewAdjectiveAction,
  DeleteAdjectiveAction,
  GetAllAdjectivesAction,
  UpdateAdjectiveAction,
} from '../../../core/store/adjectives/adjectives.action';
import {
  selectAdjectivesLoaded,
  selectAllAdjectives,
  selectAdjectivesMap,
} from '../../../core/store/adjectives/adjectives.selector';
import {NewAdjectiveDialogComponent} from './new/new-adjective-dialog.component';
import {TitleService} from '../../../core/page/title.service';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  templateUrl: './adjectives.component.html',
  styleUrls: ['./adjectives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectivesComponent implements AfterViewInit, OnInit, OnDestroy {
  public loaded$: Observable<boolean>;
  public adjectives$: Observable<Adjective[]>;
  public adjectivesMap$: Observable<Record<string, Adjective>>;
  public hideDisabled: boolean = this.route.snapshot.queryParams.hideDisabled || false;
  public searchText: string = this.route.snapshot.queryParams.search || '';
  public sort: MatSort;

  private readonly subscription: Subscription = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private store$: Store,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Adjectives');

    this.subscription.add(
      this.route.queryParams.pipe(debounceTime(400), distinctUntilChanged()).subscribe(p => {
        if (p) {
          this.store$.dispatch(
            new GetAllAdjectivesAction({
              hideDisabled: p.hideDisabled,
              name: p.search,
              sortBy: p.sortField ? `${p.sortField} ${p.sortDirection}` : null,
            })
          );

          if (p.sortField) {
            this.sort = {
              active: p.sortField,
              direction: p.sortDirection,
            } as MatSort;
          }
          this.loaded$ = this.store$.pipe(select(selectAdjectivesLoaded));
          this.adjectives$ = this.store$.pipe(select(selectAllAdjectives));
          this.adjectivesMap$ = this.store$.pipe(select(selectAdjectivesMap));

          this.cdRef.detectChanges();
        }
      })
    );
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSearch(search: string) {
    this.router.navigate([], {
      queryParams: {
        search: search || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  public onHideDisabled(hideDisabled: boolean) {
    this.router.navigate([], {
      queryParams: {
        hideDisabled: hideDisabled || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  public onSort(sort: Sort) {
    const params = {
      sortField: sort.direction ? sort.active : null,
      sortDirection: sort.direction ? sort.direction : null,
    };

    this.router.navigate([], {
      queryParams: {...params},
      queryParamsHandling: 'merge',
    });
  }

  public onMenu(data: {type: string; id: string}) {
    switch (data.type) {
      case 'disable':
        this.changeAdjectiveStatus(data.id);
        return;
      case 'enable':
        this.changeAdjectiveStatus(data.id);
        return;
      case 'edit':
        this.onEdit(data.id);
        return;
      case 'rename':
        this.onOpenRenameDialog(data.id, 'rename');
        return;
      case 'clone':
        this.onOpenRenameDialog(data.id, 'clone');
        return;
      case 'delete':
        this.deleteAdjective(data.id);
        break;
      default:
        return;
    }
  }

  public changeAdjectiveStatus(id: string) {
    this.adjectivesMap$.pipe(take(1)).subscribe(adjectivesMap => {
      const adjective = adjectivesMap[id];
      const newAdjective = {...adjective, active: !adjective.active};
      this.updateAdjective(id, newAdjective);
    });
  }

  public onCreateNew() {
    const dialog = this.dialog.open(NewAdjectiveDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
      disableClose: true,
    });
    dialog.afterClosed().subscribe(adjective => {
      if (adjective) {
        this.onCreate(adjective);
      }
    });
  }

  public onCreate(adjective: Adjective) {
    this.store$.dispatch(
      new CreateNewAdjectiveAction({
        adjective,
        onSuccess: () => this.onSaveSuccess(),
        onFailure: () => this.onSaveFailure(),
      })
    );
  }

  public onEdit(id: string) {
    const dialog = this.dialog.open(EditAdjectiveDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
      disableClose: true,
      data: {id},
    });
    dialog.afterClosed().subscribe(adjective => {
      if (adjective) {
        this.updateAdjective(id, adjective);
      }
    });
  }

  public onOpenRenameDialog(id: string, type: string) {
    this.adjectivesMap$.pipe(take(1)).subscribe(adjectivesMap => {
      const currentAdjective = adjectivesMap[id];
      const dialog = this.dialog.open(RenameDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
        data: {
          type: 'Rename Adjective',
          value: currentAdjective.name,
          cloning: false,
        },
      });
      dialog.afterClosed().subscribe(newName => {
        if (newName) {
          if (type === 'rename') {
            const adjective = {...currentAdjective, name: newName};
            this.updateAdjective(id, adjective);
          } else if (type === 'clone') {
            const adjective = {...currentAdjective, name: newName};
            delete adjective.id;
            this.onCreate(adjective);
          }
        }
      });
    });
  }

  private updateAdjective(id: string, adjective: Adjective) {
    this.store$.dispatch(
      new UpdateAdjectiveAction({
        adjectiveId: id,
        adjective,
        onSuccess: () => this.onEditSuccess(),
        onFailure: () => this.onEditFailure(),
      })
    );
  }

  private deleteAdjective(id: string) {
    this.store$.dispatch(
      new DeleteAdjectiveAction({
        id,
        onSuccess: () => this.onDeleteSuccess(),
        onFailure: () => this.onDeleteFailure(),
      })
    );
  }

  private onSaveSuccess() {
    this.messageService.add('Success! A new adjective has been created.');
  }

  private onSaveFailure() {
    this.messageService.add('Error: Failed to save the adjective. Please try again.');
  }

  private onEditSuccess() {
    this.messageService.add('Success! The adjective has been edited.');
  }

  private onEditFailure() {
    this.messageService.add('Error: Failed to edit the adjective. Please try again.');
  }

  private onDeleteSuccess() {
    this.messageService.add('Success! The adjective has been deleted.');
  }

  private onDeleteFailure() {
    this.messageService.add('Error: Failed to delete the adjective. Please try again.');
  }
}
