import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {GetParagraphsAction} from 'src/app/core/store/paragraphs/paragraphs.action';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {selectAllTasks} from 'src/app/core/store/tasks/tasks.selector';

@Component({
  selector: 'sked-task-list-dialog',
  templateUrl: './sked-task-list-dialog.component.html',
  styleUrls: ['./sked-task-list-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTaskListDialogComponent implements OnInit {
  public taskIds$: Observable<string[]>;

  public tasks$: Observable<Task[]>;
  public taskInstances$: Observable<Task[]>;

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.store$.dispatch(new GetParagraphsAction({}));

    this.tasks$ = this.store$.pipe(select(selectAllTasks));
    this.taskIds$ = this.store$.pipe(
      select(selectRouterParam('taskIds')),
      map(taskIds => taskIds?.split(',') || [])
    );

    this.taskInstances$ = this.observeTasks();
  }

  private observeTasks(): Observable<Task[]> {
    return combineLatest([this.tasks$, this.taskIds$]).pipe(
      map(([tasks, taskIds]) => tasks.filter(task => taskIds.includes(task.id)))
    );
  }
}
