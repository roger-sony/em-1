import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ParagraphModel, SkedModel} from '../../sked.model';
import {MobileSkedService} from '../../../services/mobile-sked.service';
import {BehaviorSubject} from 'rxjs';
import {selectActiveUser} from '../../../core/store/active-user/active-user.selector';
import {Store} from '@ngrx/store';

@Component({
  selector: 'paragraph-card',
  templateUrl: './paragraph-card.component.html',
  styleUrls: ['./paragraph-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParagraphCardComponent implements OnInit, OnDestroy {
  @Input() sked: SkedModel;
  @Input() paragraph: ParagraphModel;
  @Input() index: number;

  @Output() updateSked: EventEmitter<null> = new EventEmitter<null>();

  public readonly canEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly timeLeft$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private interval: number = null;

  constructor(private mobileSkedService: MobileSkedService, private store: Store) {}

  ngOnInit(): void {
    if (this.paragraph?.status === 'in progress') {
      this.timeLeft$.next(this.getCurrentTimeValue(this.paragraph));

      if (!this.hasActivePause(this.paragraph)) {
        this.interval = setInterval(() => {
          this.timeLeft$.next(this.getCurrentTimeValue(this.paragraph));

          if (this.timeLeft$?.value >= 100) {
            clearInterval(this.interval);
            this.interval = null;
          }
        }, 1000);
      }
    }

    this.store.select(selectActiveUser).subscribe(user => {
      this.canEdit$.next(this.paragraph?.assignedToUser.includes(user.id));
    });
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  stopParagraph(paragraph: ParagraphModel, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    console.log('pause sked with id: ', paragraph._id);
  }

  pauseParagraph(skedId: string, paragraph: ParagraphModel, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const body = {
      ...paragraph,
      status: 'unclaimed',
    };

    this.mobileSkedService.pauseParagraph(skedId, body).subscribe(() => this.updateSked.emit());
  }

  resumeParagraph(skedId: string, paragraph: ParagraphModel, event: Event) {
    event.stopPropagation();
    event.preventDefault();

    const body = {
      ...paragraph,
      status: 'unclaimed',
    };

    this.mobileSkedService.resumeParagraph(skedId, body).subscribe(() => this.updateSked.emit());
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

  getRandomIconName() {
    const i = Math.round(Math.random() * 6);
    const icons = ['watering-can', 'tree', 'wind', 'drop', 'thermometer', 'leaf', 'squares'];

    return icons[i];
  }

  getIconColor() {
    const priorityColors: {[key: string]: string} = {
      'priority-10': '#E53935',
      'priority-9': '#FB8C00',
      'priority-8': '#EBB800',
      'priority-7': '#59B305',
      'priority-6': '#00897B',
      'priority-5': '#1E88E5',
      'priority-4': '#8E24AA',
      'priority-3': '#8E24AA',
      'priority-2': '#8E24AA',
      'priority-1': '#8E24AA',
    };

    return this.paragraph.status === 'in progress'
      ? 'rgba(47,39,35,0.87)'
      : priorityColors[`priority-${this.paragraph.priority}`];
  }

  getCasePreparedClass(paragraph: ParagraphModel, sked: SkedModel) {
    const status = paragraph.status.split(' ').join('-').toLowerCase();
    const classString = `${status}`;

    if (paragraph.status?.toLowerCase() !== 'in progress') {
      const unclaimedIndex = sked.paragraphs
        .filter(p => p.status === 'unclaimed')
        .findIndex(p => p.instanceID === paragraph.instanceID);

      return `${classString} priority-${paragraph.priority} ${
        unclaimedIndex >= 0 ? 'unclaimed-' + (unclaimedIndex + 1) : ''
      }`;
    } else if (paragraph.status?.toLowerCase() === 'unclaimed') {
      const unclaimedParagraphs = sked.paragraphs.filter(p => p.status.toLowerCase() === 'unclaimed');
      const index = unclaimedParagraphs.findIndex(p => p.instanceID === paragraph.instanceID);
      if (index === 0) {
        return `${classString} first-item-width color-0`;
      } else if (index === 1) {
        return `${classString} second-item-width color-1`;
      } else if ([2, 3].some(i => i === index)) {
        return `${classString} half-width color-${index}`;
      } else {
        return `${classString} other-width color-other`;
      }
    }

    return classString;
  }

  getEndTime(paragraph: ParagraphModel) {
    return JSON.stringify(
      new Date(new Date(paragraph.startDateTime).getTime() + paragraph.derivedEffort * 60 * 1000)
    ).replace(/"/g, '');
  }

  getCurrentTimeValue(paragraph: ParagraphModel): number {
    const startTime = new Date(paragraph.startedAt).getTime();
    const currentTime = new Date().getTime();
    const endTime = startTime + paragraph.derivedEffort * 60 * 1000;
    const pausesSum =
      paragraph.pauses?.reduce((res, cur) => {
        const pauseStarted = new Date(cur.startPause || null).getTime();
        const pauseEnded = new Date(cur.endPause || null).getTime();

        return res + ((pauseEnded || currentTime) - pauseStarted);
      }, 0) || 0;

    return ((currentTime - startTime - pausesSum) / (endTime - startTime)) * 100;
  }

  getTimeLeft(p: ParagraphModel) {
    const endTime = new Date(p.startedAt).getTime() + p.derivedEffort * 60 * 1000;
    const now = new Date().getTime();
    const pausesSum =
      p.pauses?.reduce((res, cur) => {
        const pauseStarted = new Date(cur.startPause || null).getTime();
        const pauseEnded = new Date(cur.endPause || null).getTime();

        return pauseEnded ? res + (pauseEnded - pauseStarted) : res + pauseStarted;
      }, 0) || 0;

    if (now < endTime + pausesSum) {
      return this.getCurrentTimeValue(p);
    } else {
      return 100;
    }
  }
}
