import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Chapter} from '../../../core/model/chapter';
import {SearchParams} from '../../../core/model/search/search-params';
import {SortOption} from '../../../core/model/search/sort-option';
import {GetAllChaptersAction} from '../../../core/store/chapters/chapters.action';
import {selectAllChapters} from '../../../core/store/chapters/chapters.selector';
import {selectRouterParam, selectSearchParams} from '../../../core/store/router/router.selector';

@Component({
  selector: 'tasks-search-panel',
  templateUrl: './tasks-search-panel.component.html',
  styleUrls: ['./tasks-search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksSearchPanelComponent implements OnInit {
  public chapters$: Observable<Chapter[]>;
  public defaultChapterId$: Observable<string>;
  public searchParams$: Observable<SearchParams>;

  public readonly sortOptions: SortOption[] = [
    {
      field: 'shortTask',
      label: 'Sort by Name',
    },
    {
      field: 'effort',
      label: 'Sort by Effort',
    },
    {
      field: 'priority',
      label: 'Sort by Priority',
    },
    {
      field: 'movability',
      label: 'Sort by Movability',
    },
    {
      field: 'conditionCount',
      label: 'Sort by Conditions',
    },
    {
      field: 'triggerCount',
      label: 'Sort by Triggers',
    },
  ];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.store$.dispatch(new GetAllChaptersAction({})); // TODO load chapters only once

    this.chapters$ = this.store$.pipe(select(selectAllChapters));
    this.defaultChapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.searchParams$ = this.observeSearchParams();
  }

  private observeSearchParams(): Observable<SearchParams> {
    return this.store$.pipe(
      select(selectSearchParams),
      map(searchParams => ({
        ...searchParams,
        sortField: searchParams.sortField || 'shortTask',
      }))
    );
  }

  public onSearchParamsChange(searchParams: SearchParams) {
    this.router.navigate([], {
      queryParams: {
        search: searchParams.text || null,
        chapters: searchParams.chapterIds?.length ? searchParams.chapterIds.join(',') : null,
        empty: searchParams.empty || null,
        sort: searchParams.sortField || null,
        sortDir: searchParams.sortDirection || null,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
