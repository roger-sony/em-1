import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {GetParagraphsAction} from 'src/app/core/store/paragraphs/paragraphs.action';
import {CreateTaskAction, DeleteTaskAction} from 'src/app/core/store/tasks/tasks.action';
import {selectAllTasks} from 'src/app/core/store/tasks/tasks.selector';
import {TaskDialogService} from 'src/app/dialog/task/task-dialog.service';
import {MessageService} from 'src/app/services/message.service';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';
import {RenameDialogComponent} from 'src/app/shared/dialog/rename/rename-dialog.component';
import {TaskDeleteDialogComponent} from 'src/app/shared/tasks/delete-dialog/task-delete-dialog.component';

@Component({
  selector: 'tasks-detail-toolbar-menu',
  templateUrl: './tasks-detail-toolbar-menu.component.html',
  styleUrls: ['./tasks-detail-toolbar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksDetailToolbarMenuComponent implements OnInit {
  @Input()
  public task: Task;

  @Output()
  public edit = new EventEmitter();

  @Output()
  public delete = new EventEmitter();

  @Output()
  public menuOpen = new EventEmitter();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  public tasks$: Observable<Task[]>;

  constructor(
    private messageService: MessageService,
    private taskDialogService: TaskDialogService,
    private dialog: MatDialog,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit() {
    this.tasks$ = this.store$.pipe(select(selectAllTasks));
  }

  public onToggleClick() {
    this.menu.open();
    this.menuOpen.emit();
  }

  public onSchedule() {
    this.taskDialogService.openScheduleTaskDialog(this.task.id);
    this.menu.close();
  }

  public onClone() {
    this.tasks$.pipe(take(1)).subscribe(tasks => {
      const dialog = this.dialog.open(RenameDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
        data: {
          options: tasks.map(task => task.shortTask),
          type: 'Cloning Paragraph',
          value: this.task.shortTask,
          cloning: true,
        },
      });
      dialog.afterClosed().subscribe(newName => {
        if (newName) {
          const newTask: Task = {
            ...this.task,
            id: null,
            shortTask: newName,
            displayName: newName,
            ruleTriggers: [],
          };
          delete newTask.id;
          this.store$.dispatch(
            new CreateTaskAction({
              task: newTask,
              onSuccess: task => this.onCloneTaskSuccess(task),
              onFailure: () => this.onCloneTaskFailure(),
            })
          );
        }
      });
    });
    this.menu.close();
  }

  public onDelete() {
    this.menu.close();
    const dialog = this.dialog.open(TaskDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store$.dispatch(
          new DeleteTaskAction({
            taskId: this.task.id,
            onSuccess: () => this.onDeleteTaskSuccess(),
            onFailure: () => this.onDeleteTaskFailure(),
          })
        );
      }
    });
  }

  private onCloneTaskSuccess(task: Task) {
    this.messageService.add('Success! This task has been duplicated.');
    this.store$.dispatch(new GetParagraphsAction({}));
    this.router.navigate(['tasks']);
  }

  private onCloneTaskFailure() {
    this.messageService.add('Error: Task creation has failed.');
  }

  private onDeleteTaskSuccess() {
    this.messageService.add('Success! Task has been deleted.');
    this.router.navigate(['tasks']);
  }

  private onDeleteTaskFailure() {
    this.messageService.add('Error: Task deletion has failed.');
  }
}
