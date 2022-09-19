import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {FieldValues} from 'src/app/core/model/field-values';
import {PlanNounCondition} from 'src/app/core/model/plan-noun-condition';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {ConditionForm} from 'src/app/core/model/condition-form';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'condition-form',
  templateUrl: './condition-form.component.html',
  styleUrls: ['./condition-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public conditionForm: ConditionForm;

  @Input()
  public fieldValues: FieldValues;

  @Input()
  public tasks: Task[];

  @Input()
  public unitOfMeasure: UnitOfMeasure;

  @Input()
  public nouns: InventoryItem[];

  @Output()
  public valueChanges = new EventEmitter<ConditionForm>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  @HostBinding('class.rule-form')
  public ruleFormClass = true;

  public showConjunction1$ = new BehaviorSubject<boolean>(false);
  public showConjunction2$ = new BehaviorSubject<boolean>(false);
  public showConjunction3$ = new BehaviorSubject<boolean>(false);
  public showOutcome$ = new BehaviorSubject<boolean>(false);
  public showImmediately$ = new BehaviorSubject<boolean>(false);
  public showSchedule$ = new BehaviorSubject<boolean>(false);

  public form = new FormGroup({
    nounCondition1: new FormControl({}, Validators.required),
    nounCondition2: new FormControl({}),
    nounCondition3: new FormControl({}),
    conjunction1: new FormControl(''),
    conjunction2: new FormControl(''),
    consequence: new FormControl('', Validators.required),
    day: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    id: new FormControl(''),
  });

  private subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.subscription = this.subscribeToFormValueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.conditionForm && this.conditionForm) {
      this.fillInForm();
    }
  }

  public subscribeToFormValueChanges(): Subscription {
    return this.form.valueChanges.pipe().subscribe(value => {
      this.valueChanges.emit(value);
      this.validityChange.emit(this.form.valid);
    });
  }

  private fillInForm() {
    this.form.setValue({
      nounCondition1: this.conditionForm.nounCondition1 || '',
      nounCondition2: this.conditionForm.nounCondition2 || '',
      nounCondition3: this.conditionForm.nounCondition3 || '',
      conjunction1: this.conditionForm.conjunction1 || '',
      conjunction2: this.conditionForm.conjunction2 || '',
      consequence: this.conditionForm.consequence,
      day: this.conditionForm.day,
      time: this.conditionForm.time,
      id: this.conditionForm.id || '',
    });
    this.setBehaviorSubjects();
  }

  private setBehaviorSubjects() {
    if (this.conditionForm.nounCondition3?.name) {
      this.showConjunction2$.next(true);
      this.showConjunction3$.next(true);
    }
    if (this.conditionForm.nounCondition2?.name) {
      this.showConjunction1$.next(true);
    }
    if (this.conditionForm.consequence) {
      this.showOutcome$.next(true);
    }
    if (this.conditionForm.day === 'now') {
      this.showImmediately$.next(true);
    } else {
      this.showSchedule$.next(true);
    }
  }

  public onNounCondition1ValueChange(value: PlanNounCondition) {
    this.form.patchValue({nounCondition1: value});
  }

  public onConjunction1Change(value: string) {
    this.form.patchValue({conjunction1: value});
  }

  public onConjunction2Change(value: string) {
    this.form.patchValue({conjunction2: value});
  }

  public onNounCondition2ValueChange(value: PlanNounCondition) {
    this.form.patchValue({nounCondition2: value});
  }

  public onNounCondition3ValueChange(value: PlanNounCondition) {
    this.form.patchValue({nounCondition3: value});
    if (value.value) {
      this.showOutcome$.next(true);
    }
  }

  public onAddNoun1() {
    this.showConjunction1$.next(true);
    this.form.patchValue({conjunction1: 'and'});
  }

  public onAddOutcome() {
    this.showOutcome$.next(true);
  }

  public onAddNoun2() {
    this.showConjunction2$.next(true);
    this.form.patchValue({conjunction2: 'and'});
  }

  public onRemoveConjunction(value: number) {
    if (value === 2) {
      return this.showConjunction1$.next(false);
    }
    if (value === 3) {
      return this.showConjunction2$.next(false);
    }
  }

  public onConsequenceChange(taskId: string) {
    this.form.patchValue({consequence: taskId});
  }

  public onImmediatelyClick() {
    this.form.patchValue({day: 'now', time: 'now'});
    this.showConjunction3$.next(true);
    this.showImmediately$.next(true);
  }

  public onScheduleClick() {
    this.showConjunction3$.next(true);
    this.showSchedule$.next(true);
  }

  public onScheduleChange(schedule: {day: string; time: string}) {
    this.form.patchValue({day: schedule.day, time: schedule.time});
  }

  public onBackClick() {
    if (this.form.value.day === 'now') {
      this.form.patchValue({day: '', time: ''});
      this.showImmediately$.next(false);
      this.showConjunction3$.next(false);
      return;
    }
    if (this.form.value.time) {
      this.validityChange.emit(false);
      this.form.patchValue({time: '', day: ''});
      return;
    }
    if (this.form.value.day) {
      this.form.patchValue({day: ''});
      this.showConjunction3$.next(false);
      this.showSchedule$.next(false);
      return;
    }
    if (!this.form.value.day && this.showSchedule$.value) {
      this.showConjunction3$.next(false);
      this.showSchedule$.next(false);
      return;
    }
    if (this.form.value.consequence) {
      this.form.patchValue({consequence: ''});
      this.form.patchValue({nounCondition3: {...this.form.value.nounCondition3, value: ''}});
      this.showOutcome$.next(false);
      return;
    }
    if (!this.form.value.consequence && this.form.value.nounCondition3.value) {
      this.form.patchValue({nounCondition3: {...this.form.value.nounCondition3, value: ''}});
    }
    if (!this.form.value.consequence) {
      this.showOutcome$.next(false);
    }
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
