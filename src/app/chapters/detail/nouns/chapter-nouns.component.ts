import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Chapter} from 'src/app/core/model/chapter';
import {InventoryItem} from 'src/app/core/model/inventory-item';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {selectChaptersMap, selectFilteredChapterNouns} from 'src/app/core/store/chapters/chapters.selector';
import {switchMap, filter, distinctUntilChanged} from 'rxjs/operators';
import {GetAllInventoryItemsAction} from 'src/app/core/store/inventory/inventory.action';
import {GetChapterNounsAction} from 'src/app/core/store/chapters/chapters.action';
import {TitleService} from '../../../core/page/title.service';

@Component({
  selector: 'chapter-nouns',
  templateUrl: './chapter-nouns.component.html',
  styleUrls: ['./chapter-nouns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterNounsComponent implements OnInit, OnDestroy {
  public chapterId$: Observable<string>;
  public chaptersMap$: Observable<Record<string, Chapter>>;
  public chapterNouns$: Observable<InventoryItem[]>;

  private subscriptions = new Subscription();

  constructor(private titleService: TitleService, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));

    this.subscriptions.add(this.subscribeToChapterId());

    this.chaptersMap$ = this.store$.pipe(select(selectChaptersMap));
    this.chapterNouns$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectFilteredChapterNouns(chapterId))))
    );

    this.store$.dispatch(new GetAllInventoryItemsAction({force: true}));

    this.subscriptions.add(this.titleService.subscribeToChapterPageTitle('Nouns'));
  }

  private subscribeToChapterId(): Subscription {
    return this.chapterId$
      .pipe(
        filter(chapterId => !!chapterId),
        distinctUntilChanged()
      )
      .subscribe(chapterId => this.store$.dispatch(new GetChapterNounsAction({chapterId})));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
