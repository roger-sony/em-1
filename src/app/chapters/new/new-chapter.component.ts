import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, BehaviorSubject} from 'rxjs';
import {Chapter} from 'src/app/core/model/chapter';
import {ChapterForm} from 'src/app/core/model/form/chapter-form';
import {MessageService} from 'src/app/services/message.service';
import {Store, select} from '@ngrx/store';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {selectChapterForm} from 'src/app/core/store/forms/forms.selector';
import {filter, switchMap, map, take} from 'rxjs/operators';
import {selectChaptersLoaded, selectAllChapters} from 'src/app/core/store/chapters/chapters.selector';
import {CreateChapterAction} from 'src/app/core/store/chapters/chapters.action';
import {ClearChapterFormAction, UpdateChapterFormAction} from 'src/app/core/store/forms/forms.action';
import {convertChapterFormToChapter} from 'src/app/shared/utils/chapter/convert-chapter-form-to-chapter';

@Component({
  selector: 'new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewChapterComponent implements OnInit {
  public chapterId$: Observable<string>;
  public chapter$: Observable<Chapter>;
  public usedColors$: Observable<string[]>;

  public chapterForm$: Observable<ChapterForm>;
  public valid$ = new BehaviorSubject(false);

  constructor(private router: Router, private messageService: MessageService, private store$: Store<{}>) {}

  ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.usedColors$ = this.findUsedColors();

    this.chapterForm$ = this.store$.pipe(select(selectChapterForm));
  }

  public onValueChange(chapterForm: ChapterForm) {
    this.store$.dispatch(new UpdateChapterFormAction({chapterForm}));
  }

  public onValidityChange(valid: boolean) {
    this.valid$.next(valid);
  }

  private findUsedColors(): Observable<string[]> {
    return this.chapterId$.pipe(
      filter(chapterId => !chapterId),
      switchMap(() => this.store$.pipe(select(selectChaptersLoaded))),
      filter(loaded => loaded),
      switchMap(() => this.store$.pipe(select(selectAllChapters))),
      map(chapters => chapters.map(chapter => chapter.color))
    );
  }

  public onSaveClick() {
    if (!this.valid$.getValue()) {
      return;
    }
    this.chapterForm$.pipe(take(1)).subscribe(chapterForm => {
      this.store$.dispatch(
        new CreateChapterAction({
          chapter: convertChapterFormToChapter(chapterForm),
          onSuccess: () => this.onCreateChapterSuccess(),
          onFailure: () => this.onCreateChapterFailure(),
        })
      );
    });
  }

  private onCreateChapterSuccess() {
    this.messageService.add('Success! Your chapter has been created.');
    this.store$.dispatch(new ClearChapterFormAction());
    this.router.navigate(['chapters']);
  }

  private onCreateChapterFailure() {
    this.messageService.add('Error: There was a problem creating your chapter.');
  }

  public onBackClick() {
    this.store$.dispatch(new ClearChapterFormAction());
    this.router.navigate(['chapters']);
  }
}
