import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Moment} from 'moment';
import * as moment from 'moment';
import {SkedColors} from 'src/app/core/model/sked-colors';
import {SKED_COLORS} from '../../../skeds/shared/sked-colors';
import {BehaviorSubject} from 'rxjs';
import {EventApi} from '@fullcalendar/angular';

interface SkedEdit {
  backgroundColor?: string;
  borderColor?: string;
  title?: string;
  start?: Moment;
  end?: Moment;
  startDay?: number;
  startTime?: string;
  endDay?: number;
  endTime?: string;
  classNames?: string[];
  id?: string;
  delete?: boolean;
}

@Component({
  selector: 'edit-sked-dialog',
  templateUrl: './edit-sked-dialog.component.html',
  styleUrls: ['./edit-sked-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSkedDialogComponent implements OnInit {
  public errorMessage: string;

  public colors: SkedColors[] = SKED_COLORS;
  public skedData: SkedEdit;
  public weekdays: string[] = moment.weekdays();

  public isValid$ = new BehaviorSubject(true);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {sked: EventApi; allSkeds: EventApi[]},
    public dialog: MatDialogRef<EditSkedDialogComponent, SkedEdit>
  ) {}

  ngOnInit(): void {
    const startDate = moment(this.data.sked.start);
    const endDate = moment(this.data.sked.end);
    this.skedData = {
      ...this.data.sked,
      title: this.data.sked._def.title,
      backgroundColor: this.data.sked.backgroundColor,
      borderColor: this.data.sked.borderColor,
      start: startDate,
      end: endDate,
      startDay: startDate.day(),
      startTime: startDate.format('HH:mm'),
      endDay: endDate.day(),
      endTime: endDate.format('HH:mm'),
      classNames: [this.data.sked.classNames[0]],
      id: this.data.sked._def.publicId,
    };
  }

  public onNameChange(input: string) {
    this.skedData.title = input;
  }

  public onColorChange(newColor: string) {
    const color = this.colors.find(c => c.backgroundColor === newColor);
    this.skedData.backgroundColor = color.backgroundColor;
    this.skedData.borderColor = color.borderColor;
    this.skedData.classNames = [color.name];
  }

  public onStartDayChange(value: number) {
    this.skedData.startDay = value;
    this.checkValidity();
  }

  public onStartTimeChange(value: Moment) {
    this.skedData.startTime = value.format('HH:mm');
    this.checkValidity();
  }

  public onEndDayChange(value: number) {
    this.skedData.endDay = value;
    this.checkValidity();
  }

  public onEndTimeChange(value: Moment) {
    this.skedData.endTime = value.format('HH:mm');
    this.checkValidity();
  }

  public checkValidity() {
    if (this.skedData.startDay > this.skedData.endDay) {
      this.errorMessage = 'Start day must be before end day.';
      this.isValid$.next(false);
      return;
    }
    if (this.skedData.startDay === this.skedData.endDay && this.skedData.startTime >= this.skedData.endTime) {
      this.errorMessage = 'Start time must be before end time.';
      this.isValid$.next(false);
      return;
    }
    if (this.checkOverlap()) {
      this.errorMessage = 'This interferes with another Sked time.';
      this.isValid$.next(false);
      return;
    }
    this.errorMessage = '';
    this.isValid$.next(true);
  }

  public onSaveClick() {
    const skedDataDto = {
      ...this.skedData,
      start: this.createMoment(this.skedData.startTime, this.skedData.startDay),
      end: this.createMoment(this.skedData.endTime, this.skedData.endDay),
    };
    this.dialog.close(skedDataDto);
  }

  public onDeleteClick() {
    this.dialog.close({delete: true});
  }

  private checkOverlap() {
    const currentStart = this.createMoment(this.skedData.startTime, this.skedData.startDay);
    const currentEnd = this.createMoment(this.skedData.endTime, this.skedData.endDay);
    const skedsToSearch = this.data.allSkeds.filter(sked => sked.id !== this.skedData.id);
    const valid = skedsToSearch.some(sked => {
      const skedStart = moment(sked.start);
      const skedEnd = moment(sked.end);
      return (
        currentStart.isBetween(skedStart, skedEnd, 'minute', '()') ||
        currentEnd.isBetween(skedStart, skedEnd, 'minute', '()') ||
        skedStart.isBetween(currentStart, currentEnd, 'minute', '()') ||
        skedEnd.isBetween(currentStart, currentEnd, 'minute', '()')
      );
    });
    return valid;
  }

  private createMoment(time: string, day: number) {
    const [hour, minute] = time.split(':');
    return moment()
      .day(day)
      .set({hour: parseInt(hour), minute: parseInt(minute), second: 0, millisecond: 0});
  }
}
