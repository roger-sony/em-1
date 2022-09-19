import {ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';
import {Task} from '../../../../core/model/task';
import {TaskEvent} from '../../../../core/model/task-event';
import {createTasksNameMap} from '../../../utils/task/create-tasks-name-map';
import {TaskTriggerFormControl} from '../trigger-form-control';

@Component({
  selector: 'task-trigger-form',
  templateUrl: './task-trigger-form.component.html',
  styleUrls: ['./task-trigger-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskTriggerFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public form: FormGroup;

  @Input()
  public mobile: boolean;

  @Input()
  public tasks: Task[];

  public readonly controlNames = TaskTriggerFormControl;
  public readonly taskEvents = Object.values(TaskEvent);

  public filteredTasks$: Observable<Task[]>;

  public tasksNameMap$ = new BehaviorSubject<Record<string, Task>>({});

  private subscriptions = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.filteredTasks$ = this.observeFilteredTasks();
    this.subscriptions.add(this.subscribeToNameValueChanges());
  }

  private observeFilteredTasks(): Observable<Task[]> {
    return this.nameControl.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(nameValue => this.tasks?.filter(task => task.shortTask.toLowerCase().includes(nameValue.toLowerCase())) || [])
    );
  }

  private subscribeToNameValueChanges(): Subscription {
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

  public onTaskInputClick() {
    if (this.mobile) {
      this.router.navigate(['./task'], {relativeTo: this.activatedRoute});
    }
  }

  public onStatusInputClick() {
    if (this.mobile) {
      this.router.navigate(['./task/status'], {relativeTo: this.activatedRoute});
    }
  }

  public onCreateTaskClick(event: MouseEvent) {
    event.stopPropagation();

    // TODO use dialog once the new design of task pages is available
    const returnTo = this.router.url;
    this.router
      .navigate(['', {outlets: {dialog: null}}], {relativeTo: this.activatedRoute})
      .then(() => this.router.navigate(['/tasks/new'], {queryParams: {returnTo}}));
  }

  public trackByTaskId(index: number, task: Task): string {
    return task.id;
  }

  public get idControl(): AbstractControl {
    return this.form.get(TaskTriggerFormControl.Id);
  }

  public get nameControl(): AbstractControl {
    return this.form.get(TaskTriggerFormControl.DisplayName);
  }
}
