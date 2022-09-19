import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith, distinctUntilChanged} from 'rxjs/operators';
import {DecisionTableFact, DecisionTableRule} from '../../../core/model/decision-table';
import {FactFilter} from '../../../core/model/fact-filter';
import {FieldValues} from '../../../core/model/field-values';
import {Task} from '../../../core/model/task';
import {UnitOfMeasure} from '../../../core/model/unit-of-measure';
import {consequenceFormValidator} from './consequence-form.validator';
import {RuleConjunction} from './rule-conjunction';
import {RuleForm} from './rule-form';
import {RuleConsequenceFormControl, RuleFactFormControl, RuleFormControl} from './rule-form-control';
import {SkedDay} from './sked-day';

@Component({
  selector: 'rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public global: boolean;

  @Input()
  public fact: DecisionTableFact;

  @Input()
  public rule: DecisionTableRule;

  @Input()
  public fieldValues: FieldValues;

  @Input()
  public mobile: boolean;

  @Input()
  public tasks: Task[];

  @Input()
  public unitOfMeasure: UnitOfMeasure;

  @Output()
  public cancel = new EventEmitter();

  @Output()
  public save = new EventEmitter<RuleForm>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  @HostBinding('class.rule-form')
  public ruleFormClass = true;

  public readonly factControls = RuleFactFormControl;
  public readonly consequenceControls = RuleConsequenceFormControl;

  public readonly skedDays = SkedDay;

  public form = new FormGroup({
    [RuleFormControl.Facts]: new FormArray([]),
    [RuleFormControl.Conjunctions]: new FormArray([]),
    [RuleFormControl.Consequence]: new FormGroup(
      {
        [RuleConsequenceFormControl.TaskId]: new FormControl('', Validators.required),
        [RuleConsequenceFormControl.TaskName]: new FormControl(''),
        [RuleConsequenceFormControl.SkedDay]: new FormControl('', Validators.required),
        [RuleConsequenceFormControl.SkedTime]: new FormControl(''),
      },
      consequenceFormValidator
    ),
  });

  public finalConjunction$: Observable<boolean>;

  private subscriptions = new Subscription();

  public ngOnInit(): void {
    if (this.factsArray.controls.length === 0 && this.conjunctionsArray.controls.length === 0) {
      this.addEmptyFactAndConjunction();
    }

    this.subscriptions.add(this.subscribeToFormChanges());
    this.finalConjunction$ = this.observeFinalConjunction();
    this.validityChange.emit(this.form.valid);
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(formValue => {
        this.validityChange.emit(this.form.valid);
      });
  }

  private observeFinalConjunction(): Observable<boolean> {
    return this.conjunctionsArray.valueChanges.pipe(
      startWith(this.conjunctionsArray.value),
      map(values => values.slice(-1)[0] === RuleConjunction.ThenAdd)
    );
  }

  private addEmptyFactAndConjunction() {
    this.factsArray.push(this.createFactsFormGroup());
    this.conjunctionsArray.push(this.createConjunctionsFormControl());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.fact && this.fact) {
      this.fillInFactsAndConjunctionsArrays([this.fact]);
    }
    if (changes.global && this.global) {
      this.form.removeControl(RuleFormControl.Consequence);
    }
    if (changes.rule && this.rule) {
      this.fillInFactsAndConjunctionsArrays(this.rule.factFilters);
      this.fillInConsequenceForm(this.rule, this.tasks);
    }
    if (changes.tasks && this.tasks && this.rule) {
      this.fillInConsequenceForm(this.rule, this.tasks);
    }
  }

  private fillInFactsAndConjunctionsArrays(facts: FactFilter[]) {
    if (!facts || facts.length === 0) {
      return;
    }

    this.factsArray.clear();
    this.conjunctionsArray.clear();

    facts
      .filter(fact => fact.name !== '__v')
      .forEach((fact, index, allFacts) => {
        this.factsArray.push(this.createFactsFormGroup(fact));

        if (!this.global) {
          this.conjunctionsArray.push(
            this.createConjunctionsFormControl(
              index < allFacts.length - 1 ? RuleConjunction.And : RuleConjunction.ThenAdd
            )
          );
        }
      });
  }

  private createFactsFormGroup(fact?: FactFilter): FormGroup {
    return new FormGroup({
      [RuleFactFormControl.Name]: new FormControl(fact ? fact.name : '', Validators.required),
      [RuleFactFormControl.Operation]: new FormControl(fact ? fact.operation : '', Validators.required),
      [RuleFactFormControl.Value]: new FormControl(fact ? fact.value : '', Validators.required),
    });
  }

  private createConjunctionsFormControl(value: string = ''): FormControl {
    return new FormControl(value, this.global ? null : Validators.required);
  }

  private fillInConsequenceForm(rule: DecisionTableRule, tasks: Task[]) {
    this.consequenceForm.setValue({
      [RuleConsequenceFormControl.TaskId]: rule.consequence || '',
      [RuleConsequenceFormControl.TaskName]: tasks?.find(task => task.id === rule.consequence)?.shortTask || '',
      [RuleConsequenceFormControl.SkedDay]:
        (rule.sked === SkedDay.CurrentSked ? rule.sked : rule.sked?.slice(0, 2)) || '',
      [RuleConsequenceFormControl.SkedTime]: !rule.sked || rule.sked === SkedDay.CurrentSked ? '' : rule.sked?.slice(2),
    });
  }

  public onConjunctionValueChange(value: string, index: number) {
    if (value === RuleConjunction.And && index === this.conjunctionsArray.controls.length - 1) {
      this.addEmptyFactAndConjunction();
    } else if (value === RuleConjunction.ThenAdd) {
      this.removeFactsAndConjunctions(index);
    }
  }

  private removeFactsAndConjunctions(lastIndex: number) {
    for (let index = lastIndex + 1; index < this.factsArray.length; index++) {
      this.factsArray.removeAt(index);
      this.conjunctionsArray.removeAt(index);
    }
  }

  public onSkedDayValueChange(value: string) {
    if (value === SkedDay.CurrentSked) {
      this.consequenceForm.get(RuleConsequenceFormControl.SkedTime).reset('');
    }
  }

  public onBackClick() {
    this.resetLastNonEmptyValue();
  }

  private resetLastNonEmptyValue() {
    if (this.consequenceForm?.get(RuleConsequenceFormControl.SkedTime)?.value) {
      this.consequenceForm.get(RuleConsequenceFormControl.SkedTime).reset('');
      return;
    } else if (this.consequenceForm?.get(RuleConsequenceFormControl.SkedDay)?.value) {
      this.consequenceForm.get(RuleConsequenceFormControl.SkedDay).reset('');
      return;
    } else if (this.consequenceForm?.get(RuleConsequenceFormControl.TaskName)?.value) {
      this.consequenceForm.get(RuleConsequenceFormControl.TaskName).reset('');
      this.consequenceForm.get(RuleConsequenceFormControl.TaskId).reset('');
      return;
    }

    for (let index = this.factsArray.length - 1; index >= 0; index--) {
      if (this.conjunctionsArray.at(index)?.value) {
        this.conjunctionsArray.at(index).reset('');
        this.removeFactsAndConjunctions(index);
        return;
      }

      const factForm = this.factsArray.at(index);
      if (factForm.get(RuleFactFormControl.Value).value) {
        return factForm.get(RuleFactFormControl.Value).reset('');
      } else if (factForm.get(RuleFactFormControl.Operation).value) {
        return factForm.get(RuleFactFormControl.Operation).reset('');
      } else if (factForm.get(RuleFactFormControl.Name).value) {
        return factForm.get(RuleFactFormControl.Name).reset('');
      }
    }

    this.cancel.emit();
  }

  public onSaveClick() {
    if (this.form.invalid) {
      return;
    }

    const ruleForm = this.createRuleFormValue();
    this.save.emit(ruleForm);
  }

  private createRuleFormValue(): RuleForm {
    const facts: FactFilter[] = this.factsArray.controls.map(factForm => ({
      name: factForm.get(RuleFactFormControl.Name).value,
      operation: factForm.get(RuleFactFormControl.Operation).value,
      value: factForm.get(RuleFactFormControl.Value).value,
    }));

    if (this.global) {
      return {facts};
    }

    const consequence = this.consequenceForm.get(RuleConsequenceFormControl.TaskId).value;

    const skedDay = this.consequenceForm.get(RuleConsequenceFormControl.SkedDay).value;
    const skedTime = this.consequenceForm.get(RuleConsequenceFormControl.SkedTime).value;
    const sked = skedDay === SkedDay.CurrentSked ? skedDay : skedDay + skedTime;

    return {facts, consequence, sked};
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public get factsArray(): FormArray {
    return this.form.get(RuleFormControl.Facts) as FormArray;
  }

  public get conjunctionsArray(): FormArray {
    return this.form.get(RuleFormControl.Conjunctions) as FormArray;
  }

  public get consequenceForm(): FormGroup {
    return this.form.get(RuleFormControl.Consequence) as FormGroup;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
