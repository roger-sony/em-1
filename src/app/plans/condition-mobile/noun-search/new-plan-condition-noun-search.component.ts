import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {Params, Router, ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {take, map} from 'rxjs/operators';
import {GetAllInventoryItemsAction} from 'src/app/core/store/inventory/inventory.action';
import {selectAllInventoryItems} from 'src/app/core/store/inventory/inventory.selector';
import {InventoryItem} from 'src/app/core/model/inventory-item';
import {SearchItem} from 'src/app/shared/mobile/search-page/search-item';
import {TitleService} from '../../../core/page/title.service';

@Component({
  selector: 'new-plan-condition-noun-search',
  templateUrl: './new-plan-condition-noun-search.component.html',
  styleUrls: ['./new-plan-condition-noun-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanConditionNounSearchComponent implements OnInit, OnDestroy {
  public planId$: Observable<Params>;

  public nouns$: Observable<InventoryItem[]>;
  public nounNames$: Observable<SearchItem[]>;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.titleService.subscribeToPlanPageTitle('New Noun Condition'));

    this.store$.dispatch(new GetAllInventoryItemsAction({}));

    this.nouns$ = this.store$.pipe(select(selectAllInventoryItems));
    this.nounNames$ = this.observeNouns();

    this.planId$ = this.store$.pipe(select(selectRouterParam('planId')));
  }

  private observeNouns(): Observable<SearchItem[]> {
    return this.nouns$.pipe(
      map(nouns =>
        nouns.map(noun => {
          return {value: noun.id, displayValue: noun.subcategory};
        })
      )
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onNounClick(noun: SearchItem) {
    this.router.navigate(['..'], {
      relativeTo: this.activatedRoute,
      queryParams: {id: noun.value, name: noun.displayValue, search: null},
      queryParamsHandling: 'merge',
    });
  }

  public onBackClick() {
    this.planId$.pipe(take(1)).subscribe(planId => {
      this.router.navigate(['plans', planId]);
    });
  }
}
