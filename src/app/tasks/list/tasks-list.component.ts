import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Chapter} from 'src/app/core/model/chapter';
import {Task, TaskFull, TaskTableColumn} from 'src/app/core/model/task';
import {selectAllChapters} from 'src/app/core/store/chapters/chapters.selector';
import {GetAllRolesAction} from 'src/app/core/store/roles/roles.action';
import {selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {selectFilteredTasks, selectRouterQueryParams} from 'src/app/core/store/tasks/tasks.selector';
import {GetAllUsersAction} from 'src/app/core/store/users/users.action';
import {Paragraph} from '../../core/model/paragraph';
import {ClearTasksAction, GetParagraphsAction} from '../../core/store/paragraphs/paragraphs.action';
import {
  selectAllParagraphsCount,
  selectFilteredParagraphsPagination,
  selectParagraphsLoading,
} from '../../core/store/paragraphs/paragraphs.selector';
import {TitleService} from '../../core/page/title.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {selectActiveUserPrivileges} from '../../core/store/active-user/active-user.selector';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit, OnDestroy {
  public readonly activeUserPrivileges: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public queryParams$: Observable<Params>;
  public paragraphs$: Observable<Paragraph[]>;
  public paragraphsCount$: Observable<number>;
  public filteredTasksTable$: Observable<TaskFull[]>;
  public filteredTasks$: Observable<Task[]>;
  public filteredTasksPage$: Observable<Paragraph[]>;
  public paragraphsLoading$: Observable<boolean>;
  public chapters$: Observable<Chapter[]>;
  public paginationTo$: Observable<number>;
  public paginationFrom$: Observable<number>;

  public allColumns: string[] = ['shortTask', 'category', 'effort', 'location', 'priority', 'movability', 'abandon'];
  public columnsChecked: Record<string, boolean> = {
    shortTask: true,
    category: true,
    effort: true,
    location: true,
    priority: true,
    movability: true,
    abandon: true,
  };
  public displayedColumns: string[] = [
    'shortTask',
    'category',
    'effort',
    'location',
    'priority',
    'movability',
    'abandon',
    'menu',
  ];

  public hideHeaderBottomBorder: boolean = true;

  public cardView: boolean = true;

  private subscription: Subscription = new Subscription();

  //TODO remove once new nouns page is integrated
  loaded$: Observable<boolean>;

  get canEditParagraphs(): boolean {
    return this.activeUserPrivileges?.value?.includes('Can edit Paragraphs');
  }

  constructor(
    private store$: Store,
    private router: Router,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Paragraphs');

    this.subscription.add(
      this.route.queryParams.pipe(debounceTime(400), distinctUntilChanged()).subscribe(p => {
        if (p) {
          this.store$.dispatch(
            new GetParagraphsAction({
              queries: {...this.route.snapshot.queryParams},
            })
          );
        }
      })
    );

    this.store$.dispatch(new GetParagraphsAction({}));
    this.store$.dispatch(new GetAllUsersAction({}));
    this.store$.dispatch(new GetAllRolesAction({}));

    this.queryParams$ = this.store$.pipe(select(selectRouterQueryParams));
    this.paragraphs$ = this.store$.pipe(select(selectFilteredParagraphsPagination));
    this.paragraphsCount$ = this.store$.pipe(select(selectAllParagraphsCount));
    // this.filteredTasksTable$ = this.store$.pipe(select(selectFilteredTasksTable));
    this.filteredTasks$ = this.store$.pipe(select(selectFilteredTasks));
    this.filteredTasksPage$ = this.store$.pipe(select(selectFilteredParagraphsPagination));
    this.paragraphsLoading$ = this.store$.pipe(select(selectParagraphsLoading));
    this.chapters$ = this.store$.pipe(select(selectAllChapters));

    this.paginationTo$ = this.store$.pipe(select(selectRouterQueryParam('paginationTo')));
    this.paginationFrom$ = this.store$.pipe(select(selectRouterQueryParam('paginationFrom')));

    this.getCardView();
    this.getDisplayedColumns();

    this.subscription.add(
      this.store$.select(selectActiveUserPrivileges).subscribe(p => this.activeUserPrivileges.next(p))
    );
  }

  ngOnDestroy() {
    this.store$.dispatch(new ClearTasksAction());
    this.subscription.unsubscribe();
  }

  getCardView(): void {
    const view = sessionStorage.getItem('cardView');
    if (view) {
      this.cardView = view === 'true';
    }
  }

  getDisplayedColumns(): void {
    const columns = JSON.parse(sessionStorage.getItem('columnsChecked'));
    if (columns) {
      this.columnsChecked = columns;
      this.setDisplayedColumns();
    }
  }

  onViewChange(event: boolean): void {
    this.cardView = event;
    sessionStorage.setItem('cardView', JSON.stringify(this.cardView));
  }

  pageEventChange(event: PageEvent): void {
    const displayFrom = event.pageIndex * event.pageSize;
    const displayTo = displayFrom + event.pageSize;
    this.router.navigate([], {
      queryParams: {paginationFrom: displayFrom, paginationTo: displayTo},
      queryParamsHandling: 'merge',
    });
  }

  public setColumnsChecked($event: TaskTableColumn): void {
    this.columnsChecked[$event.name] = $event.checked;
    sessionStorage.setItem('columnsChecked', JSON.stringify(this.columnsChecked));
    this.setDisplayedColumns();
  }

  setDisplayedColumns(): void {
    this.displayedColumns = this.allColumns.filter(column => this.columnsChecked[column]);
    this.displayedColumns.push('menu');
  }
}
