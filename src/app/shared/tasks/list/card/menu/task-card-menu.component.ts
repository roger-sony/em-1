import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {TaskDialogService} from 'src/app/dialog/task/task-dialog.service';
import {GetChapterTasksAction, GetSingleChapterAction} from '../../../../../core/store/chapters/chapters.action';
import {selectRouterParam, selectRouterUrl} from '../../../../../core/store/router/router.selector';
import {DeleteTaskAction, RemoveTaskFromChapterAction} from '../../../../../core/store/tasks/tasks.action';
import {MessageService} from '../../../../../services/message.service';
import {OphMenuComponent} from '../../../../design/oph-menu/oph-menu.component';
import {TaskDeleteDialogComponent} from '../../../delete-dialog/task-delete-dialog.component';

@Component({
  selector: 'task-card-menu',
  templateUrl: './task-card-menu.component.html',
  styleUrls: ['./task-card-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardMenuComponent implements OnInit {
  @Input()
  public chapterId: string;

  @Input()
  public task: Task;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  private url$: Observable<string>;
  private viewingSkeds$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private taskDialogService: TaskDialogService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit() {
    this.url$ = this.store$.pipe(select(selectRouterUrl));
    this.viewingSkeds$ = this.url$.pipe(map(url => url.startsWith('/skeds')));
  }

  public onToggleClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.open();
  }

  public onRemoveFromChapterClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.store$.dispatch(
      new RemoveTaskFromChapterAction({
        chapterId: this.chapterId,
        taskId: this.task.id,
        onSuccess: () => this.onRemoveFromChapterSuccess(),
      })
    );
  }

  public onRemoveFromChapterSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapterId}));
    this.store$.dispatch(new GetChapterTasksAction({chapterId: this.chapterId}));
  }

  public onEditClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.viewingSkeds$.pipe(take(1)).subscribe(viewingSkeds => {
      if (viewingSkeds) {
        this.taskDialogService.openEditTaskDialog(this.task.id);
      } else {
        this.router.navigate(['/tasks', this.task.id], {queryParams: {returnTo: this.router.url}});
      }
    });
  }

  public onDeleteClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.showDeleteConfirmDialog();
  }

  private showDeleteConfirmDialog() {
    const dialog = this.dialog.open(TaskDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deleteTask();
      }
    });
  }

  private deleteTask() {
    this.store$.dispatch(
      new DeleteTaskAction({
        taskId: this.task.id,
        onSuccess: () => this.onDeleteTaskSuccess(),
        onFailure: () => this.onDeleteTaskFailure(),
      })
    );
  }

  private onDeleteTaskSuccess() {
    this.store$.pipe(select(selectRouterParam('taskId')), take(1)).subscribe(taskId => {
      if (taskId) {
        this.router.navigate(['/tasks']);
      }
    });
    this.messageService.add('Success! The task has been deleted.');
  }

  private onDeleteTaskFailure() {
    this.messageService.add('Error: There was a problem deleting the task.');
  }
}
