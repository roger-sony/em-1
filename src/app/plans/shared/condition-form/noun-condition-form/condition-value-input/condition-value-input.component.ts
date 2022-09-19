import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, startWith, throttleTime} from 'rxjs/operators';
import {FieldValues} from 'src/app/core/model/field-values';
import {PlanNounCondition} from 'src/app/core/model/plan-noun-condition';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {parseDurationMinutes} from 'src/app/shared/utils/date/parse-duration-minutes';

@Component({
  selector: 'condition-value-input',
  templateUrl: './condition-value-input.component.html',
  styleUrls: ['./condition-value-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionValueInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public formValue: PlanNounCondition;

  @Input()
  public fieldValues: FieldValues;

  @Input()
  public unitOfMeasure: UnitOfMeasure[];

  @Output()
  public valueChange = new EventEmitter<string>();

  public filteredUOM: UnitOfMeasure;

  public valueInput = new FormControl('');

  private attributeName$ = new BehaviorSubject('');
  private fieldValues$ = new BehaviorSubject<FieldValues>(null);
  public filteredFieldValues$: Observable<string[]>;

  private subscription = new Subscription();

  public ngOnInit(): void {
    this.filteredFieldValues$ = this.observeFilteredFieldValues();

    this.subscription = this.subscribeToValueChanges();
  }

  private observeFilteredFieldValues(): Observable<string[]> {
    return combineLatest([
      this.attributeName$,
      this.valueInput.valueChanges.pipe(startWith(this.valueInput.value)),
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
    if (changes.formValue && this.formValue) {
      this.valueInput.setValue(this.formValue.value);
      this.attributeName$.next(this.formValue.name);
      this.filteredUOM = this.findUnitOfMeasure();
    }
    if (changes.fieldValues && this.fieldValues) {
      this.fieldValues$.next(this.fieldValues);
    }
    if (changes.unitOfMeasure && this.unitOfMeasure) {
      this.filteredUOM = this.findUnitOfMeasure();
    }
  }

  public onBlur(event: FocusEvent) {
    if (this.formValue.name === '_last_updated') {
      const {value} = event.target as HTMLInputElement;
      const minutes = String(parseDurationMinutes(value));
      this.valueChange.emit(minutes);
    }
  }

  public findUnitOfMeasure() {
    if (this.unitOfMeasure && this.formValue.noun) {
      return this.unitOfMeasure?.find(uom => uom.nounSubcategory === this.formValue.noun);
    }
  }

  private subscribeToValueChanges(): Subscription {
    return this.valueInput.valueChanges.pipe(throttleTime(200)).subscribe(value => {
      this.valueChange.emit(value);
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
