import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FieldValues} from 'src/app/core/model/field-values';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'noun-select',
  templateUrl: './noun-select.component.html',
  styleUrls: ['./noun-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounSelectComponent implements OnInit, OnChanges {
  @Input()
  public fieldValues: FieldValues;

  @Input()
  public nouns: InventoryItem[];

  @Input()
  public value: string;

  @Output()
  public valueChange = new EventEmitter<string>();

  public filteredNouns$: Observable<string[]>;
  public nouns$ = new BehaviorSubject<string[]>([]);

  public nounSelect = new FormControl('');

  constructor() {}

  ngOnInit(): void {
    this.filteredNouns$ = this.observeNounSelect();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.nounSelect.setValue(this.value);
    }
    if (changes.fieldValues && this.fieldValues) {
      this.nouns$.next(this.fieldValues.subcategory);
    }
  }

  public observeNounSelect(): Observable<string[]> {
    return combineLatest([this.nounSelect.valueChanges.pipe(startWith('')), this.nouns$]).pipe(
      map(([value, nouns]) => {
        if (value) {
          return nouns?.filter(noun => noun.toLowerCase().includes(value.toLowerCase()));
        }
        return nouns;
      })
    );
  }

  public onNounSelect(value: string) {
    this.valueChange.emit(value);
  }
}
