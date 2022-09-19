import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {Chapter} from '../../../core/model/chapter';
import {FieldValues} from '../../../core/model/field-values';
import {TaskForm} from '../../../core/model/form/task-form';
import {Role} from '../../../core/model/role';
import {SkedTemplate} from '../../../core/model/sked-template';
import {Task} from '../../../core/model/task';
import {User} from '../../../core/model/user';
import {GetAllChaptersAction, GetChapterTasksAction} from '../../../core/store/chapters/chapters.action';
import {selectAllChapters} from '../../../core/store/chapters/chapters.selector';
import {ClearTaskFormAction, UpdateTaskFormAction} from '../../../core/store/forms/forms.action';
import {selectTaskForm} from '../../../core/store/forms/forms.selector';
import {GetAllRolesAction} from '../../../core/store/roles/roles.action';
import {selectAllRoles} from '../../../core/store/roles/roles.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {GetAllSkedTemplatesAction} from '../../../core/store/sked-templates/sked-templates.action';
import {selectAllSkedTemplates} from '../../../core/store/sked-templates/sked-templates.selector';
import {
  CreateTaskAction,
  GetAllTaskFieldValuesAction,
  GetTaskInstancesAction,
  GetTasksAction,
} from '../../../core/store/tasks/tasks.action';
import {selectTaskFieldValues} from '../../../core/store/tasks/tasks.selector';
import {GetAllUsersAction} from '../../../core/store/users/users.action';
import {selectAllUsers} from '../../../core/store/users/users.selector';
import {MessageService} from '../../../services/message.service';
import {convertTaskFormToTask} from '../../../shared/utils/task/convert-task-form-to-task';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTaskDialogComponent implements OnInit {
  public chapterId$: Observable<string>;
  public chapters$: Observable<Chapter[]>;
  public roles$: Observable<Role[]>;
  public skedTemplates$: Observable<SkedTemplate[]>;
  public taskFieldValues$: Observable<FieldValues>;
  public users$: Observable<User[]>;

  public taskForm$: Observable<TaskForm>;
  public valid$ = new BehaviorSubject<boolean>(false);
  public saving: boolean = false;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private store$: Store<{}>,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.store$.dispatch(new GetAllTaskFieldValuesAction({}));
    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
    this.store$.dispatch(new GetAllRolesAction({}));
    this.store$.dispatch(new GetAllUsersAction({}));
    this.store$.dispatch(new GetAllChaptersAction({}));
    this.store$.dispatch(new ClearTaskFormAction());

    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.chapters$ = this.store$.pipe(select(selectAllChapters));
    this.roles$ = this.store$.pipe(select(selectAllRoles));
    this.skedTemplates$ = this.store$.pipe(select(selectAllSkedTemplates));
    this.taskFieldValues$ = this.store$.pipe(select(selectTaskFieldValues));
    this.users$ = this.store$.pipe(select(selectAllUsers));
    this.taskForm$ = this.store$.pipe(select(selectTaskForm));
  }

  public onValueChange(taskForm: TaskForm) {
    this.store$.dispatch(new UpdateTaskFormAction({taskForm}));
  }

  public onValidityChange(valid: boolean) {
    this.valid$.next(valid);
  }

  public onClose() {
    this.saving = false;
    this.store$.dispatch(new ClearTaskFormAction());
  }

  public onMoreOptionsClick() {
    this.router.navigate(['tasks', 'new']);
    this.dialogService.closeDialog();
  }

  public onCreateClick() {
    if (!this.valid$.getValue()) {
      return;
    }
    this.createTask();
    this.saving = true;
  }

  private createTask() {
    combineLatest([this.taskForm$, this.users$, this.roles$, this.chapters$])
      .pipe(take(1))
      .subscribe(([taskForm, users, roles, chapters]) => {
        const taskDto = convertTaskFormToTask(taskForm, users, roles);
        // taskDto['ruleTriggers'] = [];
        this.store$.dispatch(
          new CreateTaskAction({
            task: taskDto,
            onSuccess: createdTask => this.onCreateTaskSuccess(createdTask),
            onFailure: () => this.onCreateTaskFailure(),
          })
        );
      });
  }

  private onCreateTaskSuccess(task: Task) {
    this.messageService.add('Success! Task has been created.');
    this.store$.dispatch(new GetTaskInstancesAction({}));
    this.store$.dispatch(new GetTasksAction({force: true}));
    this.store$.dispatch(new ClearTaskFormAction());
    this.refreshChapterTasks();
    this.dialogService.closeDialog();
  }

  private refreshChapterTasks() {
    this.chapterId$
      .pipe(
        take(1),
        filter(chapterId => !!chapterId)
      )
      .subscribe(chapterId => this.store$.dispatch(new GetChapterTasksAction({chapterId})));
  }

  private onCreateTaskFailure() {
    this.messageService.add('Error: Task creation has failed.');
  }
}
