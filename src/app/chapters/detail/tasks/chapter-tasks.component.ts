import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {Chapter} from '../../../core/model/chapter';
import {GetChapterTasksAction} from '../../../core/store/chapters/chapters.action';
import {selectChaptersMap, selectFilteredChapterTasks} from '../../../core/store/chapters/chapters.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {GetTasksAction} from '../../../core/store/tasks/tasks.action';
import {TitleService} from '../../../core/page/title.service';

@Component({
  selector: 'chapter-tasks',
  templateUrl: './chapter-tasks.component.html',
  styleUrls: ['./chapter-tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterTasksComponent implements OnInit, OnDestroy {
  public chapterId$: Observable<string>;
  public chaptersMap$: Observable<Record<string, Chapter>>;
  public chapterTasks$: Observable<Task[]>;

  private subscriptions = new Subscription();

  constructor(private store$: Store<{}>, private titleService: TitleService) {}

  public ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));

    this.subscriptions.add(this.subscribeToChapterId());
    this.subscriptions.add(this.titleService.subscribeToChapterPageTitle('Tasks'));

    this.chaptersMap$ = this.store$.pipe(select(selectChaptersMap));
    this.chapterTasks$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectFilteredChapterTasks(chapterId))))
    );

    this.store$.dispatch(new GetTasksAction({force: true}));
  }

  private subscribeToChapterId(): Subscription {
    return this.chapterId$
      .pipe(
        filter(chapterId => !!chapterId),
        distinctUntilChanged()
      )
      .subscribe(chapterId => this.store$.dispatch(new GetChapterTasksAction({chapterId})));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
