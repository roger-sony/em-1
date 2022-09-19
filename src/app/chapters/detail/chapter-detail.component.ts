import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, switchMap, throttleTime} from 'rxjs/operators';
import {Chapter} from '../../core/model/chapter';
import {MobileService} from '../../core/page/mobile.service';
import {GetSingleChapterAction} from '../../core/store/chapters/chapters.action';
import {selectChapterById} from '../../core/store/chapters/chapters.selector';
import {selectRouterParam} from '../../core/store/router/router.selector';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterDetailComponent implements OnInit, OnDestroy {
  public chapterId$: Observable<string>;
  public chapter$: Observable<Chapter>;
  public mobile$: Observable<boolean>;

  public taskScheduler$ = new BehaviorSubject(false);

  private subscriptions = new Subscription();

  constructor(
    private messageService: MessageService,
    private mobileService: MobileService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit(): void {
    this.chapterId$ = this.store$.pipe(select(selectRouterParam('chapterId')));
    this.chapter$ = this.chapterId$.pipe(
      switchMap(chapterId => this.store$.pipe(select(selectChapterById(chapterId))))
    );
    this.mobile$ = this.mobileService.observeMobile().pipe(throttleTime(500));
    this.subscriptions.add(this.subscribeToChapterId());
  }

  private subscribeToChapterId(): Subscription {
    return this.chapterId$.pipe(distinctUntilChanged()).subscribe(chapterId => {
      if (chapterId) {
        this.store$.dispatch(new GetSingleChapterAction({chapterId, onFailure: () => this.onGetChapterFailure()}));
      }
    });
  }

  private onGetChapterFailure() {
    this.router.navigate(['/chapters']).then(() => this.messageService.add('Error: Chapter not found'));
  }

  public onBackClick() {
    this.router.navigate(['chapters']);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
