import {Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';
import {Options} from 'ng5-slider';
import {FormBuilder} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'chapter-overview-watch-time-panel',
  templateUrl: './chapter-overview-watch-time-panel.component.html',
  styleUrls: ['./chapter-overview-watch-time-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterOverviewWatchTimePanelComponent implements OnChanges {
  @Input()
  public chapter: Chapter;

  @Input()
  public dateRange: string;

  public watchTimeForm = this.formBuilder.group({
    startDate: [''],
    endDate: [''],
  });

  public daysBetweenDates: number;
  public today: Moment = moment().startOf('day');
  public dateArray: string[];
  public lowValue: number = 0;
  public highValue: number;
  public options: Options;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.chapter && this.chapter) {
      this.fillInForm();
      this.findSliderOptions();
      this.dateArray = this.createAvailableDatesArray();
    }
    if (changes.dateRange && this.dateRange) {
      const [start, end] = this.dateRange.split('%');
      this.lowValue = this.findDateArrayIndex(start);
      this.highValue = this.findDateArrayIndex(end);
      this.watchTimeForm.setValue({
        startDate: moment(start).startOf('day'),
        endDate: moment(end).startOf('day'),
      });
    }
  }

  private findDateArrayIndex(date: string) {
    return this.dateArray.indexOf(this.dateArray.find(dateItem => dateItem === date));
  }

  private fillInForm() {
    if (!this.dateRange) {
      this.watchTimeForm.setValue({
        startDate: this.chapter.startDate,
        endDate: this.chapter.endDate,
      });
    }
  }

  private findSliderOptions() {
    this.daysBetweenDates = this.chapter.endDate.diff(this.chapter.startDate, 'days');
    this.options = {
      floor: 0,
      ceil: this.daysBetweenDates,
      hideLimitLabels: true,
      hidePointerLabels: true,
    };
    if (!this.dateRange) {
      this.highValue = this.daysBetweenDates;
    }
  }

  private createAvailableDatesArray() {
    const dateArray = [];
    let startDate = this.chapter.startDate;
    const stopDate = this.chapter.endDate;
    while (startDate <= stopDate) {
      dateArray.push(moment(startDate).format('YYYY-MM-DD'));
      startDate = moment(startDate).add(1, 'days');
    }
    return dateArray;
  }

  public onStartDateChange(chosenDate: Moment) {
    this.watchTimeForm.value.startDate = chosenDate;
    this.addQueryParams();
  }

  public onEndDateChange(chosenDate: Moment) {
    this.watchTimeForm.value.endDate = chosenDate;
    this.addQueryParams();
  }

  public onTodayClick() {
    this.watchTimeForm.value.startDate = this.today;
    this.watchTimeForm.value.endDate = this.today;
    this.addQueryParams();
  }

  public valueChange(index: number) {
    this.watchTimeForm.value.startDate = moment(this.dateArray[index]).startOf('day');
    this.addQueryParams();
  }

  public highValueChange(index: number) {
    this.watchTimeForm.value.endDate = moment(this.dateArray[index]).startOf('day');
    this.addQueryParams();
  }

  private addQueryParams() {
    this.router.navigate([], {
      queryParams: {
        dateRange: `${this.watchTimeForm.value.startDate.format(
          'YYYY-MM-DD'
        )}%${this.watchTimeForm.value.endDate.format('YYYY-MM-DD')}`,
      },
    });
  }
}
