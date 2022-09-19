import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectFilteredNouns} from 'src/app/core/store/inventory/inventory.selector';
import {InventoryItem} from 'src/app/core/model/inventory-item';
import {GetAllInventoryItemsAction} from 'src/app/core/store/inventory/inventory.action';

@Component({
  selector: 'noun-search',
  templateUrl: './noun-search.component.html',
  styleUrls: ['./noun-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounSearchComponent implements OnInit {
  @Output()
  public nounClick = new EventEmitter();

  @Output()
  public back = new EventEmitter();

  public searchInput: string;
  public selectedNounId: string;

  public filteredNouns$: Observable<InventoryItem[]>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store$: Store<{}>) {}

  ngOnInit(): void {
    this.store$.dispatch(new GetAllInventoryItemsAction({force: true}));

    this.searchInput = this.activatedRoute.snapshot.queryParamMap.get('search');
    this.filteredNouns$ = this.store$.pipe(select(selectFilteredNouns));
  }

  public onInput(e: Event): void {
    this.router.navigate([], {queryParams: {search: this.searchInput || null}, queryParamsHandling: 'merge'});
  }

  public onNounClick(noun: InventoryItem) {
    this.selectedNounId = noun.id;
    setTimeout(() => this.nounClick.emit(noun), 750);
  }

  public onBackClick() {
    this.back.emit();
  }
}
