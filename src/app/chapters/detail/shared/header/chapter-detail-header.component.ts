import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Chapter} from '../../../../core/model/chapter';
import {
  DeleteChapterAction,
  GetSingleChapterAction,
  UpdateChapterAction,
} from '../../../../core/store/chapters/chapters.action';
import {selectRouterParam} from '../../../../core/store/router/router.selector';
import {ChapterDeleteDialogComponent} from './delete-dialog/chapter-delete-dialog.component';
import {ChapterDialogService} from 'src/app/dialog/chapter-dialog.service';

@Component({
  selector: 'chapter-detail-header',
  templateUrl: './chapter-detail-header.component.html',
  styleUrls: ['./chapter-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterDetailHeaderComponent implements OnInit {
  @Input()
  public chapter: Chapter;

  public calendarShown$: Observable<boolean>;

  constructor(
    private chapterDialogService: ChapterDialogService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit() {
    this.calendarShown$ = this.store$.pipe(select(selectRouterParam('calendar')));
  }

  public onBack() {
    this.router.navigate(['/chapters']);
  }

  public onPauseClick() {
    this.updateChapter({status: 'pause'});
  }

  public onGoLiveClick() {
    this.updateChapter({status: 'live'});
  }

  public onUpdateProgressClick() {
    this.chapterDialogService.openUpdateProgressChapterDialog(this.chapter.id);
  }

  private updateChapter(chapterChange: Partial<Chapter>) {
    this.store$.dispatch(
      new UpdateChapterAction({
        chapterId: this.chapter.id,
        chapterChange,
        onSuccess: () => this.onUpdateChapterSuccess(),
        onFailure: () => this.onUpdateChapterFailure(),
      })
    );
  }

  private onUpdateChapterSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapter.id}));
    // TODO show notification
  }

  private onUpdateChapterFailure() {
    // TODO show notification
  }

  public onTaskSchedulerClick(calendar: boolean) {
    this.router.navigate([calendar ? {calendar} : {}], {relativeTo: this.activatedRoute});
  }

  // public onStartDateChange(startDate: Date) {
  //   this.updateChapter({startDate});
  // }

  // public onEndDateChange(endDate: Date) {
  //   this.updateChapter({endDate});
  // }

  public onEdit() {
    this.chapterDialogService.openEditChapterDialog(this.chapter.id);
  }

  public onDelete() {
    const dialog = this.dialog.open(ChapterDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store$.dispatch(
          new DeleteChapterAction({
            chapterId: this.chapter.id,
            onSuccess: () => this.onDeleteChapterSuccess(),
            onFailure: () => this.onDeleteChapterFailure(),
          })
        );
      }
    });
  }

  public onDeleteChapterSuccess() {
    this.router.navigate(['/chapters']);
    // TODO show notification
  }

  public onDeleteChapterFailure() {
    // TODO show notification
  }
}
