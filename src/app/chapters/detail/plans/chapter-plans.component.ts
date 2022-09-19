import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {TitleService} from '../../../core/page/title.service';
import {Observable, Subscription} from 'rxjs';
import {Chapter} from 'src/app/core/model/chapter';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {select, Store} from '@ngrx/store';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {GetAllDecisionTablesAction} from 'src/app/core/store/decision-tables/decision-tables.action';
import {selectAllChapters, selectFilteredChapterPlans} from 'src/app/core/store/chapters/chapters.selector';
import {GetChapterPlansAction} from 'src/app/core/store/chapters/chapters.action';

@Component({
  selector: 'chapter-plans',
  templateUrl: './chapter-plans.component.html',
  styleUrls: ['./chapter-plans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterPlansComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  public chapterId$: Observable<string>;
  public chapters$: Observable<Chapter[]>;
  public chapterPlans$: Observable<DecisionTable[]>;

  constructor(private titleService: TitleService, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));

    this.subscriptions.add(this.subscribeToChapterId());

    this.chapters$ = this.store$.pipe(select(selectAllChapters));
    this.chapterPlans$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectFilteredChapterPlans(chapterId))))
    );

    this.store$.dispatch(new GetAllDecisionTablesAction({}));

    this.subscriptions.add(this.titleService.subscribeToChapterPageTitle('Plans'));
  }

  private subscribeToChapterId(): Subscription {
    return this.chapterId$
      .pipe(
        filter(chapterId => !!chapterId),
        distinctUntilChanged()
      )
      .subscribe(chapterId => this.store$.dispatch(new GetChapterPlansAction({chapterId})));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
