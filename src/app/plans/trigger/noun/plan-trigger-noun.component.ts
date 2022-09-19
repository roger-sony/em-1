import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {InventoryItem} from 'src/app/core/model/inventory-item';
import {GetAllInventoryItemsAction} from 'src/app/core/store/inventory/inventory.action';
import {selectFilteredNouns} from 'src/app/core/store/inventory/inventory.selector';
import {TriggerForm} from '../../../core/model/form/trigger-form';
import {TriggerFormType} from '../../../core/model/form/trigger-form-type';
import {UpdateTriggerFormAction} from '../../../core/store/forms/forms.action';
import {selectTriggerForm} from '../../../core/store/forms/forms.selector';
import {selectRouterQueryParam} from '../../../core/store/router/router.selector';

@Component({
  selector: 'plan-trigger-noun',
  templateUrl: './plan-trigger-noun.component.html',
  styleUrls: ['./plan-trigger-noun.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggerNounComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput')
  public searchInput: ElementRef<HTMLInputElement>;

  public search$: Observable<string>;

  public filteredNouns$: Observable<InventoryItem[]>;

  private triggerForm$: Observable<TriggerForm>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store$: Store<{}>) {}

  ngOnInit(): void {
    this.store$.dispatch(new GetAllInventoryItemsAction({force: true}));

    this.search$ = this.store$.pipe(
      select(selectRouterQueryParam('search')),
      map(search => search || ''),
      take(1)
    );
    this.filteredNouns$ = this.store$.pipe(select(selectFilteredNouns));

    this.triggerForm$ = this.store$.pipe(select(selectTriggerForm));
  }

  public ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  public onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.router.navigate([], {queryParams: {search: inputElement.value || null}, queryParamsHandling: 'merge'});
  }

  public onNounClick(noun: InventoryItem) {
    this.triggerForm$.pipe(take(1)).subscribe(triggerForm => {
      this.store$.dispatch(
        new UpdateTriggerFormAction({
          triggerForm: {
            ...triggerForm,
            type: TriggerFormType.Noun,
            noun: {id: noun.id, displayName: noun.subcategory},
          },
        })
      );
      this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    });
  }

  public onBackClick() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
