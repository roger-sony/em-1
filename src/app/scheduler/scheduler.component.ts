import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MonthModel, WeekModel} from '../core/store/scheduler/scheduler-dummy-data';
import {select, Store} from '@ngrx/store';
import {selectSchedulerCurrentMonth} from '../core/store/scheduler/scheduler.selectors';
import {
  CopyToNextEmptyWeekAction,
  CreateWeekAction,
  FetchCurrentMonthAction,
  InsertWeekInSlotByIndexAction,
  RemoveWeekAction,
} from '../core/store/scheduler/scheduler.action';
import {Router} from '@angular/router';

const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'scheduler-builder',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComponent {
  @Output() selected = new EventEmitter();

  public date: BehaviorSubject<Date> = new BehaviorSubject<Date>(null);
  public dates: BehaviorSubject<Array<Date>> = new BehaviorSubject<Array<Date>>(null);

  public readonly days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public readonly dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public readonly weekForDuplicate: BehaviorSubject<WeekModel> = new BehaviorSubject<WeekModel>(null);
  public readonly currentMonth: Observable<MonthModel> = this.store$.pipe(select(selectSchedulerCurrentMonth));
  public readonly weeks: BehaviorSubject<
    {
      start: number;
      end: number;
    }[]
  > = new BehaviorSubject(null);

  constructor(private store$: Store, private router: Router) {
    this.store$.dispatch(
      new FetchCurrentMonthAction({
        onSuccess: (month: MonthModel) => {
          this.date.next(new Date(month.startDate));
          this.dates.next(this.getCalendarDays(this.date.value, month.length));

          const weeksArray = new Array(month.length).fill(null).map((a, i) => ({
            start: i * 7,
            end: (i + 1) * 7,
          }));
          this.weeks.next(weeksArray);
        },
      })
    );
  }

  private getCalendarDays(date = new Date(), seasonLength: number) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const calendarStartTime =
      this.getCalendarStartDay(date).getTime() +
      60 * 60 * 2 * 1000; /* add 2 hours for daylight saving time adjustment */
    const daysCount = 7 * seasonLength - 1;

    return this.range(0, daysCount).map(num => new Date(calendarStartTime + DAY_MS * num));
  }

  private getCalendarStartDay(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    const firstDayOfMonth = new Date(d.setDate(diff));

    return this.range(1, 7)
      .map(num => new Date(firstDayOfMonth.getTime() - DAY_MS * num))
      .find(dt => dt.getDay() === 0);
  }

  private range(start: number, end: number, length = end - start + 1) {
    return Array.from({length}, (_, i) => start + i);
  }

  copyToNextEmptySlot(weeks: WeekModel[], i: number) {
    this.cancelDuplicating();
    this.store$.dispatch(new CopyToNextEmptyWeekAction(weeks[i]));
  }

  startDuplicateWeek(weeks: WeekModel[], i: number) {
    this.weekForDuplicate.next(weeks[i]);
  }

  insertDuplicatedWeek(slotIndex: number) {
    this.store$.dispatch(new InsertWeekInSlotByIndexAction({week: this.weekForDuplicate.value, slotIndex}));
    this.weekForDuplicate.next(null);
  }

  createNewWeek(weekIndex: number) {
    // index * 7 - first day of selected week
    this.store$.dispatch(
      new CreateWeekAction({
        onSuccess: week => {
          this.router.navigate(['/scheduler/week', week._id]);
        },
        startDate: this.dates.value[weekIndex * 7]?.toJSON(),
      })
    );
  }

  cancelDuplicating() {
    this.weekForDuplicate.next(null);
  }

  removeWeek(id: string) {
    this.store$.dispatch(new RemoveWeekAction(id));
  }

  getWeekLabel(weeks: WeekModel[], index: number) {
    return this.getWeek(weeks, index)?.label;
  }

  getWeek(weeks: WeekModel[], index: number) {
    return weeks?.[index];
  }
}
