import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Sentence} from 'src/app/core/model/sentence';
import {TaskDialogService} from 'src/app/dialog/task/task-dialog.service';
import {UpdateSentencesAction} from '../../../core/store/paragraphs/paragraphs.action';
import {selectStoredSentences} from '../../../core/store/paragraphs/paragraphs.selector';
import {TaskDetailSubtasksDeleteDialogComponent} from './delete-dialog/task-detail-subtasks-delete-dialog.component';
import {Paragraph} from '../../../core/model/paragraph';
import {Role} from '../../../core/model/role';
import {User} from '../../../core/model/user';
import {convertTaskToTaskForm} from '../../../shared/utils/task/convert-task-to-task-form';
import {UpdateTaskFormAction} from '../../../core/store/forms/forms.action';

@Component({
  selector: 'task-detail-subtasks',
  templateUrl: './task-detail-subtasks.component.html',
  styleUrls: ['./task-detail-subtasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailSubtasksComponent implements OnInit {
  @Input() public sentences: Sentence[];
  @Input() public paragraph: Paragraph;
  @Input() public roles: Role[];
  @Input() public users: User[];
  @Input() public canEdit: boolean;

  //TODO: Variable name
  public storedSentences$: Observable<Sentence[]>;

  constructor(
    private taskDialogService: TaskDialogService,
    private dialog: MatDialog,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit() {
    this.storedSentences$ = this.store$.pipe(select(selectStoredSentences));
  }

  public onAddSentence() {
    this.taskDialogService.openNewSentenceDialog();
  }

  // public onEditSentence(index: number) {
  //   this.taskDialogService.openEditSentenceDialog(String(index));
  // }

  public onDeleteSentence(index: number) {
    const dialog = this.dialog.open(TaskDetailSubtasksDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.storedSentences$.pipe(take(1)).subscribe(storedSentences => {
          const sentences = [...storedSentences];
          sentences.splice(index, 1);
          this.store$.dispatch(new UpdateSentencesAction({sentences}));

          const taskForm = convertTaskToTaskForm(
            {
              ...this.paragraph,
              sentences,
            },
            this.users,
            this.roles
          );
          this.store$.dispatch(new UpdateTaskFormAction({taskForm}));

          this.router.navigate([], {queryParams: {edited: true}});
        });
      }
    });
  }

  // public onAddCondition() {
  //   this.taskDialogService.openTaskDetailSubtaskConditionDialog('new');
  // }

  // public onEditCondition(index: number) {
  //   this.taskDialogService.openTaskDetailSubtaskConditionDialog(String(index));
  // }

  // public onDeleteCondition(index: number) {
  //   const dialog = this.dialog.open(TaskDetailSubtasksConditionsDeleteDialogComponent, {
  //     backdropClass: 'oph-backdrop',
  //     panelClass: 'oph-dialog',
  //   });
  //   dialog.afterClosed().subscribe(confirmed => {
  //     if (confirmed) {
  //       this.storedFacts$.pipe(take(1)).subscribe(storedFacts => {
  //         const facts = [...storedFacts];
  //         facts.splice(index, 1);
  //         this.store$.dispatch(new UpdateFactsAction({facts}));
  //         this.router.navigate([], {queryParams: {edited: true}});
  //       });
  //     }
  //   });
  // }
}
