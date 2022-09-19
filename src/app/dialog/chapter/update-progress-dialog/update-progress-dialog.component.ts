import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable, Subscription, BehaviorSubject} from 'rxjs';
import {Chapter} from 'src/app/core/model/chapter';
import {MessageService} from 'src/app/services/message.service';
import {Store, select} from '@ngrx/store';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {switchMap, take} from 'rxjs/operators';
import {selectChapterById} from 'src/app/core/store/chapters/chapters.selector';
import {GetSingleChapterAction, UpdateChapterAction} from 'src/app/core/store/chapters/chapters.action';
import {DialogService} from '../../dialog.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'update-progress-dialog',
  templateUrl: './update-progress-dialog.component.html',
  styleUrls: ['./update-progress-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateProgressDialogComponent implements OnInit {
  public chapterId$: Observable<string>;
  public chapter$: Observable<Chapter>;

  public valid$ = new BehaviorSubject(false);

  private subscriptions = new Subscription();

  public progress = new FormControl();

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private store$: Store<{}>
  ) {}

  ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.chapter$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectChapterById(chapterId))))
    );

    this.subscriptions.add(this.subscribeToChapter());
  }

  private subscribeToChapter() {
    return this.chapter$.pipe().subscribe(chapter => {
      if (chapter) {
        this.progress.setValue(chapter.progress);
      }
    });
  }

  public onSaveClick() {
    if (!this.valid$.getValue()) {
      return;
    }
    this.chapter$.pipe(take(1)).subscribe(chapter => {
      this.store$.dispatch(
        new UpdateChapterAction({
          chapterId: chapter.id,
          chapterChange: {progress: this.progress.value},
          onSuccess: () => this.onUpdateChapterSuccess(),
          onFailure: () => this.onUpdateChapterFailure(),
        })
      );
    });
  }

  private onUpdateChapterSuccess() {
    this.messageService.add('Success! Your progress has been updated.');
    this.chapterId$.pipe(take(1)).subscribe(chapterId => this.store$.dispatch(new GetSingleChapterAction({chapterId})));
    this.dialogService.closeDialog();
  }

  private onUpdateChapterFailure() {
    this.messageService.add('Error: There was a problem updating your progress.');
  }

  public formatLabel(value: number) {
    return `${value}%`;
  }

  public onSliderChange() {
    this.valid$.next(true);
  }
}
