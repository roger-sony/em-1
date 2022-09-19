import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Chapter} from 'src/app/core/model/chapter';
import {GetSingleChapterAction} from 'src/app/core/store/chapters/chapters.action';
import {
  selectChapterById,
  selectFilteredNounActivity,
  selectFilteredTaskActivity,
} from 'src/app/core/store/chapters/chapters.selector';
import {selectRouterParam, selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {TitleService} from '../../../core/page/title.service';
import {ChapterTask} from 'src/app/core/model/chapter-task';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'chapter-overview',
  templateUrl: './chapter-overview.component.html',
  styleUrls: ['./chapter-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterOverviewComponent implements OnInit, OnDestroy {
  public chapterId$: Observable<string>;
  public chapter$: Observable<Chapter>;
  public mobile$: Observable<boolean>;
  public dateRange$: Observable<string>;
  public activityFilter$: Observable<string>;
  public nounActivity$: Observable<InventoryItem[]>;
  public taskActivity$: Observable<ChapterTask[]>;

  private subscriptions = new Subscription();

  constructor(private store$: Store<{}>, private titleService: TitleService) {}

  ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.dateRange$ = this.store$.pipe(select(selectRouterQueryParam('dateRange')));
    this.activityFilter$ = this.store$.pipe(select(selectRouterQueryParam('activityFilter')));
    this.chapter$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectChapterById(chapterId))))
    );
    this.nounActivity$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectFilteredNounActivity(chapterId))))
    );
    this.taskActivity$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectFilteredTaskActivity(chapterId))))
    );

    this.subscriptions.add(this.subscribeToChapterId());
    this.subscriptions.add(this.titleService.subscribeToChapterPageTitle());
  }

  private subscribeToChapterId(): Subscription {
    return this.chapterId$.pipe(distinctUntilChanged()).subscribe(chapterId => {
      if (chapterId) {
        this.store$.dispatch(new GetSingleChapterAction({chapterId}));
      }
    });
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
