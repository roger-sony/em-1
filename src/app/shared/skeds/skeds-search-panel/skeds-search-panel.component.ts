import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SearchParams} from 'src/app/core/model/search/search-params';
import {SortOption} from 'src/app/core/model/search/sort-option';
import {selectSearchParams} from 'src/app/core/store/router/router.selector';

@Component({
  selector: 'skeds-search-panel',
  templateUrl: './skeds-search-panel.component.html',
  styleUrls: ['./skeds-search-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedsSearchPanelComponent implements OnInit {
  public searchParams$: Observable<SearchParams>;

  public readonly sortOptions: SortOption[] = [
    {
      field: 'displayName',
      label: 'Sort by Name',
    },
    {
      field: 'lastUpdated',
      label: 'Sort by Last Modified',
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
        sortField: searchParams.sortField || 'displayName',
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
