import {Component, ChangeDetectionStrategy, OnDestroy, TemplateRef, ViewChild, ChangeDetectorRef} from '@angular/core';
import {MobileSkedService} from '../../../services/mobile-sked.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, of, Subscription} from 'rxjs';
import {ParagraphModel, SentenceModel} from '../../sked.model';
import {map} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {selectActiveUser} from '../../../core/store/active-user/active-user.selector';
import {Store} from '@ngrx/store';

@Component({
  selector: 'paragraph-details',
  templateUrl: './paragraph-details.component.html',
  styleUrls: ['./paragraph-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphDetailsComponent implements OnDestroy {
  // tslint:disable-next-line:no-any
  @ViewChild('templateBottomSheet') templateBottomSheet: TemplateRef<any>;

  get params() {
    return this.route?.snapshot?.params;
  }

  private completeTimeout: number = null;
  private interval: number = null;
  private skedId: string = null;
  private readonly subscription: Subscription = new Subscription();

  public readonly hasOtherActiveParagraph$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public readonly timePassed$: BehaviorSubject<string> = new BehaviorSubject(null);
  public readonly timeLeft$: BehaviorSubject<string> = new BehaviorSubject(null);
  public readonly timeLeftPercent$: BehaviorSubject<number> = new BehaviorSubject(null);
  public readonly paragraph$: BehaviorSubject<ParagraphModel> = new BehaviorSubject<ParagraphModel>(null);
  public readonly showFightOverflow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly showFinishedOverflow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line:no-any
  public readonly assignedUsers: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  public readonly canEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private bottomSheet: MatBottomSheet,
    private cdRef: ChangeDetectorRef,
    private mobileSkedService: MobileSkedService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private store: Store
  ) {
    this.getParagraph().subscribe(paragraph => {
      if (paragraph?.status === 'in progress') {
        this.buildTimeLeft(paragraph);
      }

      this.store.select(selectActiveUser).subscribe(user => {
        this.canEdit$.next(paragraph?.assignedToUser.includes(user.id));
      });
    });
  }

  ngOnDestroy() {
    this.clearTimeLeft();
    this.subscription.unsubscribe();
  }

  buildTimeLeft(p: ParagraphModel) {
    this.countTimes(p);

    if (!this.hasActivePause(p)) {
      this.interval = setInterval(() => this.countTimes(p), 1000);
    }
  }

  countTimes(p: ParagraphModel) {
    const endTime = new Date(p.startedAt).getTime() + p.derivedEffort * 60 * 1000;
    const now = new Date().getTime();
    const pausesSum = this.getPausesSum(p);

    this.timeLeft$.next(this.getTimeLeft(p));
    this.timePassed$.next(this.getTimePassed(p));

    if (now < endTime + pausesSum) {
      this.timeLeftPercent$.next(this.getCurrentTimeValue(p));
    } else if (this.timeLeftPercent$.value !== 100) {
      this.timeLeftPercent$.next(100);
    }
  }

  clearTimeLeft() {
    clearInterval(this.interval);
    this.timeLeft$.next(null);
    this.timePassed$.next(null);
  }

  getParagraph() {
    return this.mobileSkedService.getParagraph(this.params?.paragraphId).pipe(
      map(({skedId, paragraph, hasOtherActiveParagraph}) => {
        this.skedId = skedId;
        // paragraph.startedAt = '2021-11-24T13:19:24.459Z';
        this.paragraph$.next(paragraph);
        this.hasOtherActiveParagraph$.next(hasOtherActiveParagraph);

        return paragraph;
      })
    );
  }

  getPausesSum(paragraph: ParagraphModel) {
    return (
      paragraph.pauses?.reduce((res, cur) => {
        const currentTime = new Date().getTime();
        const pauseStarted = (cur.startPause ? new Date(cur.startPause) : new Date()).getTime();
        const pauseEnded = (cur.endPause ? new Date(cur.endPause) : new Date()).getTime();

        return res + ((pauseEnded || currentTime) - pauseStarted);
      }, 0) || 0
    );
  }

  getTimeLeft(paragraph: ParagraphModel) {
    const startTime = new Date(paragraph.startedAt).getTime();
    const currentTime = new Date().getTime();
    const endTime = startTime + paragraph.derivedEffort * 60 * 1000;
    const pausesSum = this.getPausesSum(paragraph);
    const resultTime = endTime - (currentTime - pausesSum);

    return `${resultTime > 0 ? '-' : '+'}${this.getTimeLeftString(Math.abs(resultTime))}`;
  }

  getTimePassed(paragraph: ParagraphModel) {
    const startTime = new Date(paragraph.startedAt).getTime();
    const currentTime = new Date().getTime();

    const pausesSum = this.getPausesSum(paragraph);
    const resultTime = currentTime - pausesSum - startTime;
    const maxPassedTime = paragraph.derivedEffort * 60 * 1000;

    return resultTime > maxPassedTime ? this.getTimeLeftString(maxPassedTime) : this.getTimeLeftString(resultTime);
  }

  getTimeLeftString(time: number) {
    const totalSeconds = Math.floor(time / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const days = Math.floor(totalHours / 24);
    const hours = totalHours - days * 24;
    const minutes = totalMinutes - days * 24 * 60 - hours * 60;
    const seconds = totalSeconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

    if (days) {
      return `${days} d ${hours} hr ${minutes} min`;
    } else if (hours) {
      return `${hours} hr ${minutes < 10 ? `0${minutes}` : minutes} min`;
    }

    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  startFightOverflow() {
    this.showFightOverflow.next(true);

    this.snack.open('Fight!', null, {
      ...new MatSnackBarConfig(),
      duration: 4800,
      panelClass: ['fight-overflow', `paragraph-details`],
    });

    setTimeout(() => this.showFightOverflow.next(false), 5000);
  }

  onPerformClick(paragraph: ParagraphModel) {
    if (this.hasOtherActiveParagraph$.value) {
      return;
    }

    const body = {
      ...paragraph,
      startedAt: new Date(),
      status: 'in progress',
    };

    this.mobileSkedService.updateParagraph(this.skedId, body).subscribe(() => {
      this.getParagraph().subscribe(p => {
        this.startFightOverflow();
        this.buildTimeLeft(p);
      });
    });
  }

  onClaimClick(paragraph: ParagraphModel) {
    // const body = {
    //   ...paragraph,
    //   status: 'claimed',
    // };
    //
    // this.mobileSkedService.updateParagraph(this.skedId, body)
    //   .subscribe(() => {
    //     this.getParagraph();
    //   });
  }

  onPauseClick(paragraph: ParagraphModel) {
    const body = {...paragraph};

    this.mobileSkedService.pauseParagraph(this.skedId, body).subscribe(() => {
      this.getParagraph().subscribe(p => {
        this.clearTimeLeft();
        this.buildTimeLeft(p);
      });
    });
  }

  resumeParagraph(paragraph: ParagraphModel) {
    const body = {...paragraph};

    this.mobileSkedService.resumeParagraph(this.skedId, body).subscribe(() => {
      this.getParagraph().subscribe(p => {
        this.clearTimeLeft();
        this.buildTimeLeft(p);
      });
    });
  }

  uncompleteParagraph(paragraph: ParagraphModel) {
    const body = {
      ...paragraph,
      status: 'in progress',
    };

    this.mobileSkedService.updateParagraph(this.skedId, body).subscribe(() => {
      this.getParagraph().subscribe(p => {
        this.buildTimeLeft(p);
      });
    });
  }

  hasActivePause(p: ParagraphModel) {
    const lastPause = this.arrayAt(p.pauses, -1);

    return lastPause?.startPause && lastPause?.endPause === null;
  }

  // tslint:disable-next-line:no-any
  private arrayAt(array: any[], n: number) {
    n = Math.trunc(n) || 0;
    if (n < 0) {
      n += array?.length || 0;
    }
    if (n < 0 || n >= array?.length) {
      return undefined;
    }

    return array?.[n];
  }

  onCompleteClick(paragraph: ParagraphModel) {
    const body = {
      ...paragraph,
      status: 'complete',
      sentences: paragraph.sentences?.map(s => ({...s, status: 'complete'})),
    };
    this.clearTimeLeft();

    this.mobileSkedService.updateParagraph(this.skedId, body).subscribe(() => {
      this.showFinishedOverflow.next(true);

      this.snack
        .open('ParagraphCompleted', 'UNDO', {
          ...new MatSnackBarConfig(),
          duration: 9800,
          panelClass: ['fight-overflow', `paragraph-details`],
        })
        .onAction()
        .subscribe(() => {
          this.showFinishedOverflow.next(false);
          clearTimeout(this.completeTimeout);
          this.completeTimeout = null;
          this.uncompleteParagraph(paragraph);
        });

      this.completeTimeout = setTimeout(() => this.router.navigate(['/mobile-sked']), 10000);
      this.getParagraph().subscribe(() => this.clearTimeLeft());
    });
  }

  onMoreClick() {
    this.bottomSheet
      .open(this.templateBottomSheet, {
        panelClass: `paragraph-details`,
      })
      .afterDismissed()
      .subscribe(() => setTimeout(() => this.cdRef.detectChanges(), 100));
  }

  onMoveClick(paragraph: ParagraphModel) {
    // TODO: move click logic here
  }

  onAbandonClick(paragraph: ParagraphModel) {
    const body = {
      ...paragraph,
      status: 'abandoned',
    };

    this.mobileSkedService.updateParagraph(this.skedId, body).subscribe(() => {
      this.getParagraph().subscribe(() => this.clearTimeLeft());
    });
  }

  getCurrentTimeValue(paragraph: ParagraphModel): number {
    const startTime = new Date(paragraph.startedAt).getTime();
    const currentTime = new Date().getTime();
    const endTime = startTime + paragraph.derivedEffort * 60 * 1000;
    const pausesSum = this.getPausesSum(paragraph);

    return ((currentTime - startTime - pausesSum) / (endTime - startTime)) * 100;
  }

  updateSentenceStatus(paragraph: ParagraphModel, sentence: SentenceModel) {
    if (sentence) {
      sentence.status = !sentence.status || sentence.status === 'in progress' ? 'complete' : 'in progress';

      this.mobileSkedService.updateParagraph(this.skedId, paragraph).subscribe(() => {
        this.getParagraph().subscribe(p => {
          this.paragraph$.next(p);
        });
      });
    }
  }

  getClockColor() {
    const color = document.body.classList.contains('dark-mode') ? 'white' : '#2F2327';
    return of(color);
  }

  openSentence(sentence: SentenceModel, index: number) {
    if (sentence?.noun?.adjectives?.length) {
      this.router.navigate(['sentence', index], {relativeTo: this.route});
    }
  }
}
