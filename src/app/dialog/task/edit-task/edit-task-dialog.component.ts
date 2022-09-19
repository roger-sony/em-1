import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {GetAllChaptersAction} from 'src/app/core/store/chapters/chapters.action';
import {TaskDeleteDialogComponent} from 'src/app/shared/tasks/delete-dialog/task-delete-dialog.component';
import {Chapter} from '../../../core/model/chapter';
import {FieldValues} from '../../../core/model/field-values';
import {TaskForm} from '../../../core/model/form/task-form';
import {Role} from '../../../core/model/role';
import {SkedTemplate} from '../../../core/model/sked-template';
import {User} from '../../../core/model/user';
import {selectAllChapters} from '../../../core/store/chapters/chapters.selector';
import {
  ClearTaskFormAction,
  UpdateTaskFormAction,
  UpdateTaskFormEditedAction,
} from '../../../core/store/forms/forms.action';
import {selectTaskForm} from '../../../core/store/forms/forms.selector';
import {GetAllRolesAction} from '../../../core/store/roles/roles.action';
import {selectAllRoles} from '../../../core/store/roles/roles.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {GetAllSkedTemplatesAction} from '../../../core/store/sked-templates/sked-templates.action';
import {selectAllSkedTemplates} from '../../../core/store/sked-templates/sked-templates.selector';
import {
  DeleteTaskAction,
  GetAllTaskFieldValuesAction,
  GetTaskInstancesAction,
  GetTasksAction,
  UpdateTaskAction,
} from '../../../core/store/tasks/tasks.action';
import {selectTaskById, selectTaskFieldValues} from '../../../core/store/tasks/tasks.selector';
import {GetAllUsersAction} from '../../../core/store/users/users.action';
import {selectAllUsers} from '../../../core/store/users/users.selector';
import {MessageService} from '../../../services/message.service';
import {convertTaskFormToTask} from '../../../shared/utils/task/convert-task-form-to-task';
import {DialogService} from '../../dialog.service';

@Component({
  selector: 'edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskDialogComponent implements OnInit, AfterViewInit {
  public chapterId$: Observable<string>;
  public chapters$: Observable<Chapter[]>;
  public roles$: Observable<Role[]>;
  public skedTemplates$: Observable<SkedTemplate[]>;
  public taskFieldValues$: Observable<FieldValues>;
  public users$: Observable<User[]>;
  public task$: Observable<Task>;
  public taskId$: Observable<string>;
  public taskForm$: Observable<TaskForm>;

  public valid$ = new BehaviorSubject<boolean>(false);

  public task: Task;
  public saving: boolean;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private store$: Store<{}>,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.store$.dispatch(new GetAllTaskFieldValuesAction({}));
    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
    this.store$.dispatch(new GetAllRolesAction({}));
    this.store$.dispatch(new GetAllUsersAction({}));
    this.store$.dispatch(new GetAllChaptersAction({}));

    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.chapters$ = this.store$.pipe(select(selectAllChapters));
    this.roles$ = this.store$.pipe(select(selectAllRoles));
    this.skedTemplates$ = this.store$.pipe(select(selectAllSkedTemplates));
    this.taskFieldValues$ = this.store$.pipe(select(selectTaskFieldValues));
    this.users$ = this.store$.pipe(select(selectAllUsers));
    this.taskForm$ = this.store$.pipe(select(selectTaskForm));
    this.taskId$ = this.store$.pipe(select(selectRouterParam('taskId')));
    this.task$ = this.observeTaskId();

    this.setTaskForm();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  private observeTaskId(): Observable<Task> {
    return this.taskId$.pipe(
      switchMap(taskId => this.store$.pipe(select(selectTaskById(taskId)))),
      filter(task => !!task)
    );
  }

  private setTaskForm() {
    return combineLatest([this.task$, this.users$, this.roles$, this.chapters$])
      .pipe(take(1))
      .subscribe(([task, users, roles, chapters]) => {
        this.task = task;
        // const taskForm = convertTaskToTaskForm(task, users, roles, chapters);
        this.onValueChange({} as TaskForm);
      });
  }

  public onValueChange(taskForm: TaskForm) {
    this.store$.dispatch(new UpdateTaskFormAction({taskForm}));
  }

  public onValidityChange(valid: boolean) {
    this.valid$.next(valid);
  }

  public onClose() {
    this.store$.dispatch(new ClearTaskFormAction());
  }

  public onMoreOptionsClick() {
    this.store$.dispatch(new UpdateTaskFormEditedAction({taskFormEdited: true}));
    this.taskId$.pipe(take(1)).subscribe(taskId => {
      this.router.navigate(['paragraphs', taskId]);
      this.dialogService.closeDialog();
    });
  }

  public onSaveTaskClick() {
    if (!this.valid$.getValue()) {
      return;
    }
    this.saveTask();
    this.saving = true;
  }

  public saveTask() {
    combineLatest([this.taskForm$, this.taskId$, this.users$, this.roles$, this.chapters$, this.task$])
      .pipe(take(1))
      .subscribe(([taskForm, taskId, users, roles, chapters, task]) => {
        const taskDto = convertTaskFormToTask(taskForm, users, roles);
        // taskDto['subtasks'] = task.subtasks;
        // taskDto['ruleTriggers'] = task.ruleTriggers;
        taskDto['checkList'] = task.checkList;
        taskDto['cadence'] = task.cadence;
        this.store$.dispatch(
          new UpdateTaskAction({
            taskId: taskId,
            taskChange: taskDto,
            onSuccess: () => this.onEditTaskSuccess(taskId),
            onFailure: () => this.onEditTaskFailure(),
          })
        );
      });
  }

  private onEditTaskSuccess(taskId: string) {
    this.messageService.add('Success! Task has been edited.');
    this.store$.dispatch(new ClearTaskFormAction());
    this.store$.dispatch(new GetTaskInstancesAction({}));
    this.store$.dispatch(new GetTasksAction({force: true}));
    this.dialogService.closeDialog();
  }

  private onEditTaskFailure() {
    this.messageService.add('Error: Task creation has failed.');
  }

  public onDeleteTaskClick(): void {
    const dialog = this.dialog.open(TaskDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.taskId$.pipe(take(1)).subscribe(taskId => {
          this.store$.dispatch(
            new DeleteTaskAction({
              taskId: taskId,
              onSuccess: () => this.onDeleteTaskSuccess(),
              onFailure: () => this.onDeleteTaskFailure(),
            })
          );
        });
      }
    });
  }

  private onDeleteTaskSuccess() {
    this.messageService.add('Success! Task has been deleted.');
    this.dialogService.closeDialog();
    this.store$.dispatch(new GetTaskInstancesAction({}));
    this.store$.dispatch(new GetTasksAction({force: true}));
    this.store$.dispatch(new ClearTaskFormAction());
  }

  private onDeleteTaskFailure() {
    this.messageService.add('Error: Task deletion has failed.');
  }
}
