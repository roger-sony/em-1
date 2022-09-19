import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ConditionForm} from 'src/app/core/model/condition-form';
import {Task} from 'src/app/core/model/task';
import {createTasksNameMap} from '../../../../shared/utils/task/create-tasks-name-map';

@Component({
  selector: 'condition-task-input',
  templateUrl: './condition-task-input.component.html',
  styleUrls: ['./condition-task-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionTaskInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public tasks: Task[];

  @Input()
  public value: ConditionForm;

  @Output()
  public consequence = new EventEmitter<string>();

  public filteredTasks$: Observable<Task[]>;
  public tasksNameMap$ = new BehaviorSubject<Record<string, Task>>({});
  public tasks$ = new BehaviorSubject<Task[]>([]);
  public taskId$ = new BehaviorSubject<string>('');

  public taskInput = new FormControl('');

  private subscriptions = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this.filteredTasks$ = this.observeFilteredTasks();
    this.subscriptions.add(this.subscribeToTaskId());
    this.subscriptions.add(this.subscribeToTaskNameValueChanges());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && this.value) {
      this.taskId$.next(this.value.consequence);
    }
    if (changes.tasks && this.tasks) {
      this.tasks$.next(this.tasks);
      this.tasksNameMap$.next(createTasksNameMap(this.tasks));
    }
  }

  private observeFilteredTasks(): Observable<Task[]> {
    return combineLatest([this.taskInput.valueChanges.pipe(startWith('')), this.tasks$]).pipe(
      map(([taskInput, tasks]) => {
        if (taskInput) {
          return tasks?.filter(task => task.shortTask.toLowerCase().includes(taskInput.toLowerCase())) || [];
        }
        return tasks || [];
      })
    );
  }

  private subscribeToTaskNameValueChanges(): Subscription {
    return combineLatest([this.taskInput.valueChanges, this.tasksNameMap$]).subscribe(([taskInput, tasksNameMap]) => {
      this.consequence.emit((tasksNameMap[taskInput] || {id: ''}).id);
    });
  }

  private subscribeToTaskId(): Subscription {
    return combineLatest([this.taskId$, this.tasks$])
      .pipe()
      .subscribe(([taskId, tasks]) => {
        if (tasks.length) {
          this.taskInput.setValue(tasks.find(task => task.id === taskId)?.shortTask || '');
        }
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
