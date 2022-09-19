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
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {InventoryItem} from '../../../core/model/inventory-item';
import {Task} from '../../../core/model/task';
import {GetAllInventoryItemsAction} from '../../../core/store/inventory/inventory.action';
import {selectAllInventoryItems} from '../../../core/store/inventory/inventory.selector';
import {GetTasksAction} from '../../../core/store/tasks/tasks.action';
import {selectAllTasks} from '../../../core/store/tasks/tasks.selector';
import {TriggerForm} from '../../../core/model/form/trigger-form';
import {NounTriggerFormControl, TaskTriggerFormControl, TriggerFormControl} from './trigger-form-control';
import {TriggerFormType} from '../../../core/model/form/trigger-form-type';
import {triggerFormValidator} from './trigger-form.validator';

@Component({
  selector: 'trigger-form',
  templateUrl: './trigger-form.component.html',
  styleUrls: ['./trigger-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriggerFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public mobile: boolean;

  @Input()
  public required: boolean;

  @Input()
  public typeHidden: boolean;

  @Input()
  public value: TriggerForm;

  @Output()
  public valueChange = new EventEmitter<TriggerForm>();

  @Output()
  public validityChange = new EventEmitter<boolean>();

  public form = new FormGroup({
    [TriggerFormControl.Type]: new FormControl(TriggerFormType.Noun),
    [TriggerFormControl.Noun]: new FormGroup({
      [NounTriggerFormControl.Id]: new FormControl(''),
      [NounTriggerFormControl.DisplayName]: new FormControl(''),
    }),
    [TriggerFormControl.Task]: new FormGroup({
      [TaskTriggerFormControl.Id]: new FormControl(''),
      [TaskTriggerFormControl.DisplayName]: new FormControl(''),
      [TaskTriggerFormControl.Event]: new FormControl(''),
    }),
    [TriggerFormControl.SaveReport]: new FormControl(false),
    [TriggerFormControl.TriggerConsequences]: new FormControl(true),
  });

  public types = TriggerFormType;
  public controlNames = TriggerFormControl;

  public allNouns$: Observable<InventoryItem[]>;
  public nouns$: Observable<InventoryItem[]>;
  public tasks$: Observable<Task[]>;

  private subscriptions = new Subscription();

  constructor(private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.store$.dispatch(new GetAllInventoryItemsAction({force: true}));
    this.allNouns$ = this.store$.pipe(select(selectAllInventoryItems));
    this.nouns$ = this.observeAllNouns();

    this.store$.dispatch(new GetTasksAction({force: true}));
    this.tasks$ = this.store$.pipe(select(selectAllTasks));

    this.subscriptions.add(this.subscribeToFormChanges());
    this.validityChange.emit(this.form.valid);
  }

  private observeAllNouns(): Observable<InventoryItem[]> {
    return this.allNouns$.pipe(map(allNouns => allNouns.filter(noun => noun.active)));
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges
      .pipe(distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)))
      .subscribe(formValue => {
        this.valueChange.emit(formValue);
        this.validityChange.emit(this.form.valid);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.required) {
      this.form.setValidators(triggerFormValidator(this.required));
    }
    if (changes.value && this.value) {
      this.setFormValue(this.value);
    }
  }

  private setFormValue(value: TriggerForm) {
    this.form.setValue({
      [TriggerFormControl.Type]: value.type || TriggerFormType.Noun,
      [TriggerFormControl.Noun]: {
        [NounTriggerFormControl.Id]: (value.noun && value.noun.id) || '',
        [NounTriggerFormControl.DisplayName]: (value.noun && value.noun.displayName) || '',
      },
      [TriggerFormControl.Task]: {
        [TaskTriggerFormControl.Id]: (value.task && value.task.id) || '',
        [TaskTriggerFormControl.DisplayName]: (value.task && value.task.displayName) || '',
        [TaskTriggerFormControl.Event]: (value.task && value.task.event) || '',
      },
      [TriggerFormControl.SaveReport]: value.saveReport ?? false,
      [TriggerFormControl.TriggerConsequences]: value.triggerActions ?? true,
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onNounTypeClick() {
    this.typeControl.setValue(TriggerFormType.Noun);
  }

  public onTaskTypeClick() {
    this.typeControl.setValue(TriggerFormType.Task);
  }

  public get typeControl(): AbstractControl {
    return this.form.get(TriggerFormControl.Type);
  }

  public get nounForm(): FormGroup {
    return this.form.get(TriggerFormControl.Noun) as FormGroup;
  }

  public get taskForm(): FormGroup {
    return this.form.get(TriggerFormControl.Task) as FormGroup;
  }
}
