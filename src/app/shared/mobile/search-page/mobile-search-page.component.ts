import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SearchItem} from './search-item';

@Component({
  selector: 'mobile-search-page',
  templateUrl: './mobile-search-page.component.html',
  styleUrls: ['./mobile-search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSearchPageComponent implements OnInit, OnChanges {
  @Input()
  public items: SearchItem[];

  @Input()
  public placeholder: string;

  @Output()
  public save = new EventEmitter<SearchItem>();

  @Output()
  public cancel = new EventEmitter();

  public filteredItems$: Observable<SearchItem[]>;
  private items$ = new BehaviorSubject<SearchItem[]>([]);

  public searchValue$ = new BehaviorSubject('');

  public ngOnInit(): void {
    this.filteredItems$ = this.observeFilteredItems();
  }

  private observeFilteredItems(): Observable<SearchItem[]> {
    return combineLatest([this.items$, this.searchValue$]).pipe(
      map(([items, searchValue]) => {
        if (!searchValue) {
          return items;
        }

        const lowerCaseSearchValue = searchValue.toLowerCase();
        return items.filter(item =>
          String(item.displayValue || item.value)
            .toLowerCase()
            .includes(lowerCaseSearchValue)
        );
      })
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items && this.items) {
      this.items$.next(this.items);
    }
  }

  public onBack() {
    this.cancel.emit();
  }

  public onInputValueChange(value: string) {
    this.searchValue$.next(value);
  }

  public onClearButtonClick() {
    this.searchValue$.next('');
  }

  public onItemClick(item: SearchItem) {
    this.save.emit(item);
  }

  public trackByItemValue(index: number, item: SearchItem): string {
    return item.displayValue || item.value;
  }
}
