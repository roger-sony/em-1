import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MobileSkedService} from '../../../services/mobile-sked.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AdjectiveModel, ParagraphModel, SentenceModel} from '../../sked.model';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {BottomSheetSelectComponent} from './bottom-sheet-select/bottom-sheet-select.component';
import {Store} from '@ngrx/store';
import {selectActiveUser} from '../../../core/store/active-user/active-user.selector';

@Component({
  selector: 'sentence-details',
  templateUrl: './sentence-details.component.html',
  styleUrls: ['./sentence-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceDetailsComponent {
  private skedId: string;
  private paragraph: ParagraphModel;

  public readonly canEdit$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly sentence$: BehaviorSubject<SentenceModel> = new BehaviorSubject<SentenceModel>(null);
  public readonly paragraphId: string = this.route.snapshot.params?.paragraphId;

  public sentenceChanged: boolean = false;
  public bottomSheetConfig: {
    label?: string;
    options?: string[];
  } = {};

  get isReadOnly(): boolean {
    return (
      this.paragraph?.status !== 'in progress' ||
      this.hasActivePause(this.paragraph) ||
      this.sentence$?.value?.status !== 'in progress'
    );
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private mobileSkedService: MobileSkedService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.getSentence().subscribe(sentence => this.sentence$.next(sentence));
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.sentenceChanged) {
      return confirm(`Sentence not saved. Do you want leave page and lose changes?`);
    } else {
      return true;
    }
  }

  getSentence() {
    const params = this.route.snapshot.params;
    const paragraphId = params?.paragraphId;
    const sentenceIndex = params?.sentenceIndex;
    return this.mobileSkedService.getSentence(paragraphId).pipe(
      map(({skedId, paragraph}) => {
        this.skedId = skedId;
        this.paragraph = paragraph;
        this.store.select(selectActiveUser).subscribe(u => {
          this.canEdit$.next(paragraph.assignedToUser.includes(u.id));
        });

        return paragraph.sentences[sentenceIndex];
      })
    );
  }

  onDropdownClick(e: MouseEvent, adjective: AdjectiveModel) {
    e.preventDefault();
    e.stopPropagation();

    this.bottomSheet
      .open(BottomSheetSelectComponent, {
        panelClass: 'adjective-option-select',
        data: {adjective},
      })
      .afterDismissed()
      .subscribe((res: string) => {
        if (res) {
          adjective.value = res;
          this.onChange();
        }
      });
  }

  onMultiselectClick(e: MouseEvent, adjective: AdjectiveModel) {
    e.preventDefault();
    e.stopPropagation();

    this.bottomSheet
      .open(BottomSheetSelectComponent, {
        panelClass: 'adjective-option-multi-select',
        data: {
          multiselect: true,
          adjective,
        },
      })
      .afterDismissed()
      .subscribe((res: string) => {
        if (res) {
          adjective.value = res;
          this.onChange();
        }
      });
  }

  onChange() {
    this.sentenceChanged = true;
  }

  save(sentence: SentenceModel) {
    this.paragraph.sentences[this.route.snapshot.params.sentenceIndex] = sentence;

    const body: ParagraphModel = {
      ...this.paragraph,
    };

    this.mobileSkedService.updateParagraph(this.skedId, body).subscribe(() => {
      this.getSentence().subscribe(s => {
        this.sentenceChanged = false;
        this.sentence$.next(s);
      });
    });
  }

  onCompleteClick(sentence: SentenceModel) {
    if (sentence) {
      sentence.status = !sentence.status || sentence.status === 'in progress' ? 'complete' : 'in progress';

      this.mobileSkedService.updateParagraph(this.skedId, this.paragraph).subscribe(() => {
        this.getSentence().subscribe(s => {
          this.sentence$.next(s);
        });
      });
    }
  }

  onResumeClick(sentence: SentenceModel) {
    if (sentence) {
      sentence.status = 'in progress';

      this.mobileSkedService.updateParagraph(this.skedId, this.paragraph).subscribe(() => {
        this.getSentence().subscribe(s => {
          this.sentence$.next(s);
        });
      });
    }
  }

  hasActivePause(p: ParagraphModel) {
    if (!p) {
      return;
    }

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

  getClockColor() {
    const color = document.body.classList.contains('dark-mode') ? 'white' : '#2F2327';
    return of(color);
  }
}
