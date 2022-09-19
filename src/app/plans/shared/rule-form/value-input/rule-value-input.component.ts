import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FieldValues} from '../../../../core/model/field-values';
import {UnitOfMeasure} from '../../../../core/model/unit-of-measure';
import {parseDurationMinutes} from '../../../../shared/utils/date/parse-duration-minutes';

@Component({
  selector: 'rule-value-input',
  templateUrl: './rule-value-input.component.html',
  styleUrls: ['./rule-value-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleValueInputComponent implements OnInit, OnChanges {
  @Input()
  public attributeName: string;

  @Input()
  public control: AbstractControl;

  @Input()
  public fieldValues: FieldValues;

  @Input()
  public unitOfMeasure: UnitOfMeasure;

  private attributeName$ = new BehaviorSubject('');
  private fieldValues$ = new BehaviorSubject<FieldValues>(null);
  public filteredFieldValues$: Observable<string[]>;

  public ngOnInit(): void {
    this.filteredFieldValues$ = this.observeFilteredFieldValues();
  }

  private observeFilteredFieldValues(): Observable<string[]> {
    return combineLatest([
      this.attributeName$,
      this.control.valueChanges.pipe(startWith(this.control.value)),
      this.fieldValues$,
    ]).pipe(
      map(([name, value, fieldValues]) => {
        if (!fieldValues) {
          return [];
        }

        return (
          fieldValues[name]?.filter(fieldValue =>
            String(fieldValue).toLowerCase().includes(String(value).toLowerCase())
          ) || []
        );
      })
    );
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.attributeName && this.attributeName) {
      this.attributeName$.next(this.attributeName);
    }
    if (changes.fieldValues && this.fieldValues) {
      this.fieldValues$.next(this.fieldValues);
    }
  }

  public onBlur(event: FocusEvent) {
    if (this.attributeName === '_last_updated') {
      const {value} = event.target as HTMLInputElement;
      const minutes = String(parseDurationMinutes(value));
      this.control.setValue(minutes);
    }
  }

  public trackByValue(index: number, value: string) {
    return value;
  }
}
