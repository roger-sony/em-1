import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, map, startWith} from 'rxjs/operators';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {TaskEvent} from 'src/app/core/model/task-event';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';

@Component({
  selector: 'rule-trigger-form',
  templateUrl: './rule-trigger-form.component.html',
  styleUrls: ['./rule-trigger-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleTriggerFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public taskRuleTrigger: TaskRuleTrigger;

  @Input()
  public plans: DecisionTable[];

  @Input()
  public plansMap: Record<string, DecisionTable>;

  @Output()
  public valueChange = new EventEmitter<TaskRuleTrigger>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  public filteredPlans$: Observable<DecisionTable[]>;

  public plans$ = new BehaviorSubject<DecisionTable[]>(null);
  public planInput$ = new BehaviorSubject<string>('');

  public readonly taskEvents = Object.values(TaskEvent);

  private subscriptions = new Subscription();

  public form = new FormGroup({
    taskEvent: new FormControl('', Validators.required),
    ruleId: new FormControl('', Validators.required),
    saveReport: new FormControl(false),
    triggerActions: new FormControl(false),
  });

  ngOnInit(): void {
    this.filteredPlans$ = this.observePlanInput();

    this.subscriptions.add(this.subscribeToFormChanges());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.taskRuleTrigger || changes.plans) {
      this.fillInForm();
    }
    if (changes.plans && this.plans) {
      this.plans$.next(this.plans);
    }
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(formValue => {
        this.formatAndValidateForm(formValue);
      });
  }

  private formatAndValidateForm(form: TaskRuleTrigger) {
    const formDto = {...form, ruleId: this.plansMap[form.ruleId]?.id || ''};
    this.valueChange.emit(formDto);
    this.validityChange.emit(!!this.plansMap[form.ruleId]);
  }

  private observePlanInput(): Observable<DecisionTable[]> {
    return combineLatest([this.planInput$.pipe(startWith('')), this.plans$]).pipe(
      map(([input, plans]) => plans?.filter(plan => plan.displayName.toLowerCase().includes(input.toLowerCase())) || [])
    );
  }

  private fillInForm() {
    if (this.plans.length && this.taskRuleTrigger) {
      const planName = this.plans.find(plan => plan.id === this.taskRuleTrigger.ruleId).displayName;
      this.form.setValue({
        taskEvent: this.taskRuleTrigger.taskEvent,
        ruleId: planName,
        saveReport: this.taskRuleTrigger.saveReport,
        triggerActions: this.taskRuleTrigger.triggerActions,
      });
    }
  }

  public onPlanInput(value: string) {
    this.planInput$.next(value);
  }

  public onPlanSelect(ruleId: string) {
    this.form.patchValue({ruleId});
  }

  public trackByPlanId(index: number, plan: DecisionTable): string {
    return plan.id;
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
