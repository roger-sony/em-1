import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Task} from '../../../../core/model/task';
import {createTasksNameMap} from '../../../../shared/utils/task/create-tasks-name-map';

@Component({
  selector: 'rule-task-input',
  templateUrl: './rule-task-input.component.html',
  styleUrls: ['./rule-task-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleTaskInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public idControl: FormControl;

  @Input()
  public nameControl: FormControl;

  @Input()
  public tasks: Task[];

  public filteredTasks$: Observable<Task[]>;

  public tasksNameMap$ = new BehaviorSubject<Record<string, Task>>({});

  private subscriptions = new Subscription();

  public ngOnInit(): void {
    this.filteredTasks$ = this.observeFilteredTasks();
    this.subscriptions.add(this.subscribeToTaskNameValueChanges());
  }

  private observeFilteredTasks(): Observable<Task[]> {
    return this.nameControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(nameValue => this.tasks?.filter(task => task.shortTask.toLowerCase().includes(nameValue.toLowerCase())) || [])
    );
  }

  private subscribeToTaskNameValueChanges(): Subscription {
    return combineLatest([this.nameControl.valueChanges, this.tasksNameMap$]).subscribe(([nameValue, tasksNameMap]) => {
      this.idControl.setValue((tasksNameMap[nameValue] || {id: ''}).id);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks && this.tasks) {
      this.tasksNameMap$.next(createTasksNameMap(this.tasks));
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public trackByTaskId(index: number, task: Task): string {
    return task.id;
  }
}
