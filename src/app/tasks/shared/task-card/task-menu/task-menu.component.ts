import {Router} from '@angular/router';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {ClearTaskFormAction} from 'src/app/core/store/forms/forms.action';
import {selectAllParagraphs} from 'src/app/core/store/paragraphs/paragraphs.selector';
import {ClearSubtasksAction} from 'src/app/core/store/tasks/tasks.action';
import {DialogService} from 'src/app/dialog/dialog.service';
import {TaskDialogService} from 'src/app/dialog/task/task-dialog.service';
import {MessageService} from 'src/app/services/message.service';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';
import {RenameDialogComponent} from 'src/app/shared/dialog/rename/rename-dialog.component';
import {TaskDeleteDialogComponent} from 'src/app/shared/tasks/delete-dialog/task-delete-dialog.component';
import {Paragraph} from './../../../../core/model/paragraph';
import {
  CreateParagraphAction,
  DeleteParagraphAction,
  GetParagraphsAction,
  UpdateParagraphAction,
} from './../../../../core/store/paragraphs/paragraphs.action';

@Component({
  selector: 'task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMenuComponent implements OnInit {
  @Input()
  public paragraph: Paragraph;

  @Output()
  public clicked = new EventEmitter<boolean>();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  public paragraphs$: Observable<Paragraph[]>;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private taskDialogService: TaskDialogService,
    private dialog: MatDialog,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.paragraphs$ = this.store$.pipe(select(selectAllParagraphs));
  }

  public onMenuClick(e: Event) {
    e.stopPropagation();
    this.menu.open();
    this.clicked.emit(true);
  }

  public onScheduleClick() {
    this.taskDialogService.openScheduleTaskDialog(this.paragraph.id);
    this.menu.close();
  }

  public onEditClick() {
    this.router.navigate(['paragraphs', this.paragraph.id]);
  }

  public onRenameClick() {
    this.menu.close();
    this.paragraphs$.pipe(take(1)).subscribe(paragraphs => {
      const dialog = this.dialog.open(RenameDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
        data: {
          options: paragraphs.map(paragraph => paragraph.name),
          type: 'Rename Paragraph',
          value: this.paragraph.name,
        },
      });
      dialog.afterClosed().subscribe(newName => {
        if (newName) {
          const paragraph = {...this.paragraph, name: newName};
          this.store$.dispatch(
            new UpdateParagraphAction({
              paragraphId: this.paragraph.id,
              paragraphChange: paragraph,
              onSuccess: () => this.onEditParagraphSuccess(paragraph.id),
              onFailure: () => this.onEditParagraphFailure(),
            })
          );
        }
      });
    });
  }

  public onCloneClick() {
    this.paragraphs$.pipe(take(1)).subscribe(paragraphs => {
      const dialog = this.dialog.open(RenameDialogComponent, {
        backdropClass: 'oph-backdrop',
        panelClass: 'oph-dialog',
        data: {
          options: paragraphs.map(paragraph => paragraph.name),
          type: 'Cloning Paragraph',
          value: this.paragraph.name,
          cloning: true,
        },
      });
      dialog.afterClosed().subscribe(newName => {
        if (newName) {
          const newParagraph: Paragraph = {
            ...this.paragraph,
            id: null,
            name: newName,
          };
          delete newParagraph.id;
          this.store$.dispatch(
            new CreateParagraphAction({
              paragraph: newParagraph,
              onSuccess: paragraph => this.onCloneParagraphSuccess(paragraph),
              onFailure: () => this.onCloneParagraphFailure(),
            })
          );
        }
      });
    });
    this.menu.close();
  }

  public onDeleteClick() {
    this.menu.close();
    const dialog = this.dialog.open(TaskDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store$.dispatch(
          new DeleteParagraphAction({
            paragraphId: this.paragraph.id,
            onSuccess: () => this.onDeleteParagraphSuccess(),
            onFailure: () => this.onDeleteParagraphFailure(),
          })
        );
      }
    });
  }

  private onEditParagraphSuccess(paragraphId: string) {
    this.messageService.add('Success! Paragraph name has been edited.');
    this.store$.dispatch(new GetParagraphsAction({}));
  }

  private onEditParagraphFailure() {
    this.messageService.add('Error: Paragraph name edit has failed.');
  }

  private onCloneParagraphSuccess(paragraph: Paragraph) {
    this.messageService.add('Success! This Paragraph has been duplicated.');
    this.store$.dispatch(new GetParagraphsAction({}));
  }

  private onCloneParagraphFailure() {
    this.messageService.add('Error: Paragraph creation has failed.');
  }

  private onDeleteParagraphSuccess() {
    this.messageService.add('Success! Paragraph has been deleted.');
    this.dialogService.closeDialog();
    this.store$.dispatch(new GetParagraphsAction({}));
    this.store$.dispatch(new ClearTaskFormAction());
    this.store$.dispatch(new ClearSubtasksAction());
  }

  private onDeleteParagraphFailure() {
    this.messageService.add('Error: Paragraph deletion has failed.');
  }
}
