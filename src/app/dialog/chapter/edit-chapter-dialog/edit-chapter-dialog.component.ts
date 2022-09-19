import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable, Subscription, BehaviorSubject, combineLatest} from 'rxjs';
import {Chapter} from 'src/app/core/model/chapter';
import {MessageService} from 'src/app/services/message.service';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {switchMap, distinctUntilChanged, take} from 'rxjs/operators';
import {selectChapterById} from 'src/app/core/store/chapters/chapters.selector';
import {GetSingleChapterAction, UpdateChapterAction} from 'src/app/core/store/chapters/chapters.action';
import {DialogService} from '../../dialog.service';
import {ChapterForm} from 'src/app/core/model/form/chapter-form';
import {selectChapterForm} from 'src/app/core/store/forms/forms.selector';
import {UpdateChapterFormAction, ClearChapterFormAction} from 'src/app/core/store/forms/forms.action';
import {convertChapterFormToChapter} from 'src/app/shared/utils/chapter/convert-chapter-form-to-chapter';

@Component({
  selector: 'edit-chapter-dialog',
  templateUrl: './edit-chapter-dialog.component.html',
  styleUrls: ['./edit-chapter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditChapterDialogComponent implements OnInit {
  public chapterId$: Observable<string>;
  public chapter$: Observable<Chapter>;

  public chapterForm$: Observable<ChapterForm>;
  public valid$ = new BehaviorSubject(false);

  private subscriptions = new Subscription();

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.chapter$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectChapterById(chapterId))))
    );
    this.chapterForm$ = this.store$.pipe(select(selectChapterForm));

    this.subscriptions.add(this.subscribeToChapterId());
  }

  public onValueChange(chapterForm: ChapterForm) {
    this.store$.dispatch(new UpdateChapterFormAction({chapterForm}));
  }

  public onValidityChange(valid: boolean) {
    this.valid$.next(valid);
  }

  private subscribeToChapterId(): Subscription {
    return this.chapterId$.pipe(distinctUntilChanged()).subscribe(chapterId => {
      if (chapterId) {
        this.store$.dispatch(new GetSingleChapterAction({chapterId, onFailure: () => this.onGetChapterFailure()}));
      }
    });
  }

  public onSaveClick() {
    // if (!this.valid$.getValue()) {
    //   return;
    // }
    combineLatest([this.chapter$, this.chapterForm$])
      .pipe(take(1))
      .subscribe(([chapter, chapterForm]) => {
        this.store$.dispatch(
          new UpdateChapterAction({
            chapterId: chapter.id,
            chapterChange: convertChapterFormToChapter(chapterForm),
            onSuccess: () => this.onUpdateChapterSuccess(),
            onFailure: () => this.onUpdateChapterFailure(),
          })
        );
      });
  }

  private onUpdateChapterSuccess() {
    this.messageService.add('Success! Your chapter has been updated.');
    this.store$.dispatch(new ClearChapterFormAction());
    this.chapterId$.pipe(take(1)).subscribe(chapterId => this.store$.dispatch(new GetSingleChapterAction({chapterId})));
    this.dialogService.closeDialog();
  }

  private onUpdateChapterFailure() {
    this.messageService.add('Error: There was a problem updating your chapter.');
  }

  public onClose() {
    this.store$.dispatch(new ClearChapterFormAction());
  }

  private onGetChapterFailure() {
    this.router.navigate(['/chapters']).then(() => this.messageService.add('Error: Chapter not found'));
  }
}
