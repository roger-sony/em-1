import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MobileSkedService} from '../../services/mobile-sked.service';
import {BehaviorSubject} from 'rxjs';
import {ParagraphModel, SkedModel} from '../sked.model';
import {TitleService} from '../../core/page/title.service';

@Component({
  selector: 'current-sked',
  templateUrl: './current-sked.component.html',
  styleUrls: ['./current-sked.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentSkedComponent implements OnInit, OnDestroy {
  public sked$: BehaviorSubject<SkedModel> = new BehaviorSubject<SkedModel>(null);
  public readonly now: Date = new Date();
  public readonly skedStartDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  public readonly skedEndDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);

  constructor(
    private cdRef: ChangeDetectorRef,
    private mobileSkedService: MobileSkedService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Current Sked');
    this.initSked();
  }

  ngOnDestroy() {
    this.sked$.unsubscribe();
    this.skedStartDate$.unsubscribe();
    this.skedEndDate$.unsubscribe();
  }

  initSked() {
    this.mobileSkedService.getSkeds().subscribe((skeds: SkedModel[]) => {
      const sked = skeds[0];
      if (!sked) {
        return;
      }

      if (sked.skedData?.startTime && sked.skedData?.endTime) {
        const startDate = new Date();
        const endDate = new Date();
        const [startHours, startMinutes] = sked.skedData.startTime.split(':');
        const [endHours, endMinutes] = sked.skedData.endTime.split(':');

        startDate.setHours(+startHours, +startMinutes, 0);
        endDate.setHours(+endHours, +endMinutes, 0);

        this.skedStartDate$.next(startDate);
        this.skedEndDate$.next(endDate);
        setTimeout(() => this.cdRef.detectChanges(), 300);
      }

      this.sked$.next(sked);
    });
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
}
