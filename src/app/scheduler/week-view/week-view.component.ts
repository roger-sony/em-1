import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  TemplateRef,
  EmbeddedViewRef,
} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  selectSaveInProgress,
  selectSchedulerCurrentWeek,
  selectSchedulerSkedTemplate,
} from '../../core/store/scheduler/scheduler.selectors';
import {SkedTemplateModel, WeekModel} from '../../core/store/scheduler/scheduler-dummy-data';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {SKED_CALENDAR_VIEW_OPTIONS} from '../../skeds/calendar-view/sked-calendar-view-options';
import {Draggable} from '@fullcalendar/interaction';
import {FormControl, FormGroup} from '@angular/forms';
import {EventContentArg} from '@fullcalendar/common';
import {ActivatedRoute} from '@angular/router';
import {
  FetchCurrentWeekAction,
  SetSaveInProgressAction,
  UpdateWeekAction,
} from '../../core/store/scheduler/scheduler.action';

@Component({
  selector: 'week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeekViewComponent implements AfterViewInit {
  @ViewChild('external') external: ElementRef;
  @ViewChild('calendarView') calendar: FullCalendarComponent;
  // tslint:disable-next-line:no-any
  @ViewChild('fcEventContent') eventContent: TemplateRef<any>;

  // tslint:disable-next-line:no-any
  private readonly contentRenderers = new Map<string, EmbeddedViewRef<any>>();

  public saveInProgress$: Observable<boolean> = this.store$.pipe(select(selectSaveInProgress));
  public readonly labelEditMode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly weekDays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public readonly currentWeek: Observable<WeekModel> = this.store$.pipe(select(selectSchedulerCurrentWeek));
  public readonly skedTemplates: Observable<SkedTemplateModel[]> = this.store$.pipe(
    select(selectSchedulerSkedTemplate)
  );
  public readonly initialCalendarOptions: CalendarOptions = {
    ...SKED_CALENDAR_VIEW_OPTIONS,
    allDaySlot: false,
    // customButtons: {
    //   checkActiveEvents: {
    //     text: 'Check events!',
    //     click: () => console.log(this.calendar.options.events),
    //   }
    // },
    // headerToolbar: {
    //   left: 'checkActiveEvents',
    // },
    firstDay: 1,
    drop: e => console.log(e),
    eventAdd: e => console.log('event add:', e),
    eventChange: e => console.log('event change:', e),
    eventsSet: e => console.log('events set:', e),
    eventContent: arg => this.renderEventContent(arg),
  };
  // tslint:disable-next-line:no-any
  public events: any[] = [];
  form = new FormGroup({
    events: new FormControl(),
  });

  constructor(private store$: Store, private route: ActivatedRoute) {
    this.store$.dispatch(new FetchCurrentWeekAction(this.route.snapshot.params.id));
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line:no-unused-expression
    new Draggable(this.external.nativeElement, {
      itemSelector: '.fc-event',
      eventData: eventEl => ({title: eventEl.innerText}),
    });
  }

  createSked() {}

  renderEventContent(arg: EventContentArg) {
    let renderer = this.contentRenderers.get(arg.event.id);
    if (!renderer) {
      renderer = this.eventContent.createEmbeddedView({arg});
      this.contentRenderers.set(arg.event.id, renderer);
    } else {
      renderer.context.arg = arg;
      renderer.markForCheck();
    }
    renderer.detectChanges();
    return renderer.rootNodes[0];
  }

  updateWeekLabel(week: WeekModel) {
    this.store$.dispatch(new SetSaveInProgressAction(true));
    this.store$.dispatch(new UpdateWeekAction(week));
    this.labelEditMode.next(false);
  }
}
