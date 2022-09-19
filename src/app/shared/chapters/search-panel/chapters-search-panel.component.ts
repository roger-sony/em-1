import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {SearchParams} from 'src/app/core/model/search/search-params';
import {SortOption} from 'src/app/core/model/search/sort-option';
import {ActivatedRoute, Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {selectSearchParams} from 'src/app/core/store/router/router.selector';
import {map} from 'rxjs/operators';

@Component({
  selector: 'chapters-search-panel',
  templateUrl: './chapters-search-panel.component.html',
  styleUrls: ['./chapters-search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaptersSearchPanelComponent implements OnInit {
  public searchParams$: Observable<SearchParams>;

  public readonly sortOptions: SortOption[] = [
    {
      field: 'name',
      label: 'Sort by Name',
    },
    {
      field: 'inventoryCount',
      label: 'Sort by # of Nouns',
    },
    {
      field: 'conditionCount',
      label: 'Sort by # of Conditions',
    },
    {
      field: 'triggerCount',
      label: 'Sort by # of Triggers',
    },
    {
      field: 'taskCount',
      label: 'Sort by # of Tasks',
    },
    {
      field: 'dtableCount',
      label: 'Sort by # of Plans',
    },
  ];
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  ngOnInit(): void {
    this.searchParams$ = this.observeSearchParams();
  }

  private observeSearchParams(): Observable<SearchParams> {
    return this.store$.pipe(
      select(selectSearchParams),
      map(searchParams => ({
        ...searchParams,
        sortField: searchParams.sortField || 'name',
      }))
    );
  }

  public onSearchParamsChange(searchParams: SearchParams) {
    this.router.navigate([], {
      queryParams: {
        search: searchParams.text || null,
        chapters: null,
        empty: searchParams.empty || null,
        sort: searchParams.sortField || null,
        sortDir: searchParams.sortDirection || null,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }
}
