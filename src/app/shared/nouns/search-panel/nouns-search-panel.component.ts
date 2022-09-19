import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {Chapter} from 'src/app/core/model/chapter';
import {SearchParams} from 'src/app/core/model/search/search-params';
import {SortOption} from 'src/app/core/model/search/sort-option';
import {ActivatedRoute, Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {GetAllChaptersAction} from 'src/app/core/store/chapters/chapters.action';
import {selectAllChapters} from 'src/app/core/store/chapters/chapters.selector';
import {selectRouterParam, selectSearchParams} from 'src/app/core/store/router/router.selector';
import {map} from 'rxjs/operators';

@Component({
  selector: 'nouns-search-panel',
  templateUrl: './nouns-search-panel.component.html',
  styleUrls: ['./nouns-search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounsSearchPanelComponent implements OnInit {
  public chapters$: Observable<Chapter[]>;
  public defaultChapterId$: Observable<string>;
  public searchParams$: Observable<SearchParams>;

  public readonly sortOptions: SortOption[] = [
    {
      field: 'subcategory',
      label: 'Sort by Name',
    },
    {
      field: 'lastUpdated',
      label: 'Sort by Last Updated',
    },
    {
      field: 'source',
      label: 'Sort by Source',
    },
    {
      field: 'location',
      label: 'Sort by Location',
    },
    {
      field: 'currentValue',
      label: 'Sort by Current Value',
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
        name: searchParams.name || null,
        sortField: searchParams.sortField || null,
        sortDirection: searchParams.sortDirection || null,
      }))
    );
  }

  public onSearchParamsChange(searchParams: SearchParams) {
    this.router.navigate([], {
      queryParams: {
        name: searchParams.name || null,
        chapters: searchParams.chapterIds?.length ? searchParams.chapterIds.join(',') : null,
        empty: searchParams.empty || null,
        sortField: searchParams.sortField || null,
        sortDirection: searchParams.sortDirection || null,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
