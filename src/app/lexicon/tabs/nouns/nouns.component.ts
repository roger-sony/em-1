import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, take} from 'rxjs/operators';
import {NounDto} from '../../../core/api/dto/noun.dto';
import {Chapter} from '../../../core/model/chapter';
import {SearchParams} from '../../../core/model/search/search-params';
import {selectAllChapters} from '../../../core/store/chapters/chapters.selector';
import {
  CreateNounAction,
  GetDisplayedColumnsAction,
  GetNounsAction,
  UpdateNounAction,
} from '../../../core/store/nouns/nouns.action';
import {
  selectAllNouns,
  selectDisplayedColumns,
  selectFilteredNouns,
  selectFilteredNounsPagination,
  selectFilteredNounsTable,
  selectNounsLoaded,
  selectPossibleColumns,
  selectRouterQueryParams,
} from '../../../core/store/nouns/nouns.selector';
import {selectRouterQueryParam, selectSearchParams} from '../../../core/store/router/router.selector';
import {CreateEditNounComponent} from './shared/create-edit-noun/create-edit-noun.component';
import {TitleService} from '../../../core/page/title.service';

@Component({
  templateUrl: './nouns.component.html',
  styleUrls: ['./nouns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounsComponent implements AfterViewInit, OnDestroy {
  public searchParams$: Observable<SearchParams>;
  public queryParams$: Observable<Params>;
  public allNouns$: Observable<NounDto[]>;
  public filteredNouns$: Observable<NounDto[]>;
  public filteredNounsTable$: Observable<NounDto[]>;
  public filteredNounsPage$: Observable<NounDto[]>;
  public nounsLoaded$: Observable<boolean>;
  public chapters$: Observable<Chapter[]>;
  public displayedColumns$: Observable<string[]>;
  public possibleColumns$: Observable<string[]>;
  public paginationTo$: Observable<number>;
  public paginationFrom$: Observable<number>;

  public cardView: boolean = true;

  private readonly subscription: Subscription = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store,
    private titleService: TitleService
  ) {}

  ngAfterViewInit(): void {
    this.titleService.setPageTitle('Nouns');

    this.nounsLoaded$ = this.store$.pipe(select(selectNounsLoaded));

    this.subscription.add(
      this.route.queryParams.pipe(debounceTime(400), distinctUntilChanged()).subscribe(p => {
        if (p) {
          this.store$.dispatch(
            new GetNounsAction({
              queries: {...this.route.snapshot.queryParams},
              force: true,
              onSuccess: () => {
                this.allNouns$ = this.store$.pipe(select(selectAllNouns));
                this.filteredNouns$ = this.store$.pipe(select(selectFilteredNouns));
              },
            })
          );

          this.store$.dispatch(new GetDisplayedColumnsAction({displayedColumns: []}));

          this.searchParams$ = this.observeSearchParams();
          this.queryParams$ = this.store$.pipe(select(selectRouterQueryParams));
          this.allNouns$ = this.store$.pipe(select(selectAllNouns));
          this.filteredNouns$ = this.store$.pipe(select(selectFilteredNouns));
          this.filteredNounsTable$ = this.store$.pipe(select(selectFilteredNounsTable));
          this.filteredNounsPage$ = this.store$.pipe(select(selectFilteredNounsPagination));
          this.chapters$ = this.store$.pipe(select(selectAllChapters));
          this.displayedColumns$ = this.store$.pipe(select(selectDisplayedColumns));
          this.possibleColumns$ = this.store$.pipe(select(selectPossibleColumns));

          this.paginationTo$ = this.store$.pipe(select(selectRouterQueryParam('paginationTo')));
          this.paginationFrom$ = this.store$.pipe(select(selectRouterQueryParam('paginationFrom')));

          this.cdRef.detectChanges();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private observeSearchParams(): Observable<SearchParams> {
    return this.store$.pipe(
      select(selectSearchParams),
      map(searchParams => ({
        ...searchParams,
        name: searchParams.name || null,
        sortField: searchParams.sortField || null,
        sortDirection: searchParams.sortDirection || null,
        hideDisabled: searchParams.hideDisabled || null,
      }))
    );
  }

  onCreateNoun({action, noun}: {action: string; noun?: NounDto}) {
    if (action === 'create') {
      this.createNewNoun();
    } else if (action === 'edit') {
      this.editNoun(noun);
    } else if (action === 'clone') {
      this.cloneNoun(noun);
    }
  }

  onUpdateNouns() {
    const params = this.route.snapshot.queryParams;
    this.store$.dispatch(
      new GetNounsAction({
        queries: {
          name: params.name || null,
          sortField: params.sortField || null,
          sortDirection: params.sortDirection || null,
          hideDisabled: params.hideDisabled || null,
        },
        force: true,
      })
    );
    this.allNouns$ = this.store$.pipe(select(selectAllNouns));
    this.filteredNouns$ = this.store$.pipe(select(selectFilteredNouns));
  }

  createNewNoun() {
    this.dialog
      .open(CreateEditNounComponent, {
        ...new MatDialogConfig(),
        width: '800px',
        data: {
          action: 'create',
        },
      })
      .afterClosed()
      .subscribe(({noun, createBatch, batchAmount, batchStart} = {}) => {
        if (noun) {
          this.store$.dispatch(
            new CreateNounAction({
              onSuccess: () => this.onUpdateNouns(),
              onFailure: e => console.error(e),
              noun,
              createBatch,
              batchAmount,
              batchStart,
            })
          );
        }
      });
  }

  editNoun(noun: NounDto) {
    this.dialog
      .open(CreateEditNounComponent, {
        ...new MatDialogConfig(),
        width: '800px',
        data: {
          action: 'edit',
          noun: JSON.parse(JSON.stringify(noun)),
        },
      })
      .afterClosed()
      .subscribe(res => {
        if (res?.noun) {
          this.store$.dispatch(
            new UpdateNounAction({
              onSuccess: () => this.onUpdateNouns(),
              onFailure: e => console.error(e),
              noun: res.noun,
            })
          );
        }
      });
  }

  cloneNoun(nounAlfa: NounDto) {
    delete nounAlfa.id;
    delete nounAlfa.version;
    delete nounAlfa.createdAt;
    delete nounAlfa.createdBy;
    delete nounAlfa.updatedAt;

    this.dialog
      .open(CreateEditNounComponent, {
        ...new MatDialogConfig(),
        width: '800px',
        data: {
          action: 'clone',
          noun: nounAlfa,
        },
      })
      .afterClosed()
      .subscribe(({noun, createBatch, batchAmount, batchStart} = {}) => {
        if (noun) {
          this.store$.dispatch(
            new CreateNounAction({
              onSuccess: () => this.onUpdateNouns(),
              onFailure: e => console.error(e),
              noun,
              createBatch,
              batchAmount,
              batchStart,
            })
          );
        }
      });
  }

  onViewChange(event: boolean): void {
    this.cardView = event;
  }

  pageEventChange(event: PageEvent): void {
    const displayFrom = event.pageIndex * event.pageSize;
    const displayTo = displayFrom + event.pageSize;
    this.queryParams$.pipe(take(1)).subscribe(q => {
      this.router.navigate([], {queryParams: {...q, paginationFrom: displayFrom, paginationTo: displayTo}});
    });
  }

  onInactiveChange(v: boolean) {
    const queries: {[key: string]: string} = {...this.route.snapshot.queryParams};

    if (v === true) {
      queries.includeInactive = 'true';
    } else {
      delete queries.includeInactive;
    }

    this.router.navigate([], {queryParams: queries});
  }

  onIncludeTypeChange(type: string, v: boolean) {
    const queries: {[key: string]: string} = {...this.route.snapshot.queryParams};
    const typeMap: {[key: string]: boolean} = {
      concrete: !queries.includeTypes || queries.includeTypes?.includes('concrete'),
      abstract: !queries.includeTypes || queries.includeTypes?.includes('abstract'),
    };

    typeMap[type] = v;

    queries.includeTypes = [...Object.keys(map).filter((k: string) => typeMap[k])].join(',');

    if (queries.includeTypes === '') {
      queries.includeTypes = 'null';
    }
    if (Object.keys(map).every((k: string) => typeMap[k])) {
      delete queries.includeTypes;
    }

    this.router.navigate([], {queryParams: queries});
  }
}
