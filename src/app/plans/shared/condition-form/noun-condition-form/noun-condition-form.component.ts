import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FieldValues} from 'src/app/core/model/field-values';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {PlanNounCondition} from 'src/app/core/model/plan-noun-condition';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'noun-condition-form',
  templateUrl: './noun-condition-form.component.html',
  styleUrls: ['./noun-condition-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounConditionFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public value: PlanNounCondition;

  @Input()
  public fieldValues: FieldValues;

  @Input()
  public unitOfMeasure: UnitOfMeasure[];

  @Input()
  public nouns: InventoryItem[];

  @Input()
  public conjunction: boolean;

  @Input()
  public outcome: boolean;

  @Input()
  public conditionNumber: number;

  @Output()
  public valueChanges = new EventEmitter<PlanNounCondition>();

  @Output()
  public removeConjunction = new EventEmitter<number>();

  public form = new FormGroup({
    noun: new FormControl(''),
    nounId: new FormControl(''),
    name: new FormControl(''),
    operation: new FormControl(''),
    value: new FormControl(''),
  });

  private subscription = new Subscription();

  ngOnInit(): void {
    // this.subscription = this.subscribeToFormValueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && this.value) {
      this.fillInForm();
    }
  }

  private fillInForm() {
    this.form.setValue({
      noun: this.value.noun || '',
      nounId: this.value.nounId || '',
      name: this.value.name || '',
      operation: this.value.operation || '',
      value: this.value.value || '',
    });
  }

  public onBackClick() {
    if (this.form.value.value) {
      return this.valueChanges.emit({noun: this.form.value.noun, operation: '', value: '', name: ''});
    }
    if (this.form.value.operation) {
      return this.valueChanges.emit({noun: this.form.value.noun, operation: '', value: '', name: ''});
    }
    if (this.form.value.noun) {
      return this.onNounChange('');
    }
    return this.removeConjunction.emit(this.conditionNumber || 1);
  }

  public onNounChange(value: string) {
    const nounId = this.nouns.find(noun => noun.subcategory === value)?.id || '';
    this.valueChanges.emit({...this.form.value, noun: value, nounId});
  }

  public onAttributeChange(value: string) {
    this.valueChanges.emit({...this.form.value, name: value, operation: '$eq'});
  }

  public onOperatorChange(value: string) {
    this.valueChanges.emit({...this.form.value, operation: value});
  }

  public onValueChange(value: string) {
    this.valueChanges.emit({...this.form.value, value});
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
