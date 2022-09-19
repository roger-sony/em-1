import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatDatepicker, MatDatepickerInputEvent} from '@angular/material/datepicker';
import {Moment} from 'moment';

@Component({
  selector: 'chapter-date-picker',
  templateUrl: './chapter-date-picker.component.html',
  styleUrls: ['./chapter-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterDatePickerComponent {
  @Input()
  public startDate: Date;

  @Input()
  public endDate: Date;

  @Output()
  public startDateChange = new EventEmitter<Date>();

  @Output()
  public endDateChange = new EventEmitter<Date>();

  @ViewChild('startDatepicker')
  public startDatePicker: MatDatepicker<Moment>;

  @ViewChild('endDatepicker')
  public endDatePicker: MatDatepicker<Moment>;

  public onStartDateClick() {
    if (!this.startDatePicker.opened) {
      this.startDatePicker.open();
    }
  }

  public onStartDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.startDate = event.value.toDate();
    this.startDateChange.emit(this.startDate);
  }

  public onEndDateClick() {
    if (!this.endDatePicker.opened) {
      this.endDatePicker.open();
    }
  }

  public onEndDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.endDate = event.value.endOf('day').toDate();
    this.endDateChange.emit(this.endDate);
  }
}
