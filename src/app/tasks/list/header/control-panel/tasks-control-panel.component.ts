import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SearchParams} from 'src/app/core/model/search/search-params';
import {SortOption} from 'src/app/core/model/search/sort-option';
import {selectSearchParams} from './../../../../core/store/router/router.selector';

@Component({
  selector: 'tasks-control-panel',
  templateUrl: './tasks-control-panel.component.html',
  styleUrls: ['./tasks-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksControlPanelComponent implements OnInit {
  public searchParams$: Observable<SearchParams>;
  public formattedSearchParams$: Observable<SearchParams>;
  public hideEmptyToggle = true;
  public hideIcons = true;
  public darkBackground = true;

  @Input() public allColumns: string[];
  @Input() public columnsChecked: Record<string, boolean>;
  @Input() public cardView: boolean;
  @Input() public canEdit: boolean;

  @Output() public setCardView = new EventEmitter<boolean>();
  @Output() public columnsToDisplay = new EventEmitter<string[]>();

  public readonly sortOptions: SortOption[] = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'derivedEffort',
      label: 'Derived Effort',
    },
    {
      field: 'priority',
      label: 'Priority',
    },
    {
      field: 'movability',
      label: 'Movability',
    },
  ];

  constructor(
    // private taskDialogService: TaskDialogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store$: Store<{}>
  ) {}

  ngOnInit(): void {
    this.searchParams$ = this.store$.pipe(select(selectSearchParams));
    this.formattedSearchParams$ = this.observeSearchParams();
  }

  private observeSearchParams(): Observable<SearchParams> {
    return this.searchParams$.pipe(
      map(searchParams => ({
        ...searchParams,
        sortField: searchParams.sortField || 'name',
        // sortDirection: searchParams.sortDirection || 'asc'
      }))
    );
  }

  public onSearchParamsChange(searchParams: SearchParams) {
    const {paginationFrom, paginationTo} = this.activatedRoute.snapshot.queryParams;
    const pageSize = paginationTo && paginationFrom ? paginationTo - paginationFrom : 20;
    this.router.navigate([], {
      queryParams: {
        search: searchParams.text || null,
        chapters: null,
        empty: searchParams.empty || null,
        sortField: searchParams.sortField || null,
        sortDirection: searchParams.sortDirection || null,
        paginationFrom: 0,
        paginationTo: pageSize,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }

  public onTableClick() {
    this.cardView = !this.cardView;
    this.setCardView.emit(this.cardView);
  }

  public onCreateClick() {
    // this.taskDialogService.openNewTaskDialog();
    this.router.navigate(['paragraphs', 'new']);
  }

  public setColumnsToDisplay($event: string[]) {
    this.columnsToDisplay.emit($event);
  }
}
