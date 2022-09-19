import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, EventClickArg, EventContentArg, FullCalendarComponent} from '@fullcalendar/angular';
import {DateClickArg} from '@fullcalendar/interaction';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SKED_DEFAULT_ZOOM_OPTION_INDEX, SKED_ZOOM_OPTIONS} from 'src/app/app.constants';
import {FlexSkedTemplate} from 'src/app/core/model/flex-sked-template';
import {Paragraph} from 'src/app/core/model/paragraph';
import {SkedEvent} from 'src/app/core/model/sked-event';
import {Task} from 'src/app/core/model/task';
import {ParagraphInstance} from 'src/app/core/model/task-instance';
import {GetParagraphsAction} from 'src/app/core/store/paragraphs/paragraphs.action';
import {GetAllSkedTemplatesAction} from 'src/app/core/store/skeds/skeds.action';
import {selectAllFilteredSkedTemplates} from 'src/app/core/store/skeds/skeds.selector';
import {GetTaskInstancesAction} from 'src/app/core/store/tasks/tasks.action';
import {selectTaskInstances} from 'src/app/core/store/tasks/tasks.selector';
import {SkedDialogService} from 'src/app/dialog/sked-dialog.service';
import {TaskDialogService} from 'src/app/dialog/task/task-dialog.service';
import {TitleService} from '../../core/page/title.service';
import {SKED_CALENDAR_VIEW_OPTIONS} from './sked-calendar-view-options';

@Component({
  selector: 'skeds-calendar-view',
  templateUrl: './skeds-calendar-view.component.html',
  styleUrls: ['./skeds-calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedsCalendarViewComponent implements OnInit {
  @ViewChild('calendarView') calendarComponent: FullCalendarComponent;

  public skedTemplates$: Observable<FlexSkedTemplate[]>;
  public currentTemplateView$: Observable<FlexSkedTemplate>;
  public taskInstances$: Observable<ParagraphInstance[]>;
  public skedEvents$: Observable<SkedEvent[]>;
  public taskEvents$: Observable<SkedEvent[]>;
  public events$: Observable<Record<string, SkedEvent[]>>;
  public formattedEvents$: Observable<SkedEvent[]>;

  public status$ = new BehaviorSubject<string>('live');
  public zoomIndex$ = new BehaviorSubject<number>(SKED_DEFAULT_ZOOM_OPTION_INDEX);

  private currentWeek: number = moment().week();
  public zoomOptions: string[] = SKED_ZOOM_OPTIONS;

  public initialCalendarOptions: CalendarOptions = {
    ...SKED_CALENDAR_VIEW_OPTIONS,
    allDaySlot: false,
    eventContent: event => this.createEventDisplay(event),
    eventClick: event => this.onEventClick(event),
    dateClick: event => this.onDateClick(event),
  };

  public calendarOptions$: Observable<CalendarOptions>;

  constructor(
    private skedDialogService: SkedDialogService,
    private store$: Store<{}>,
    private taskDialogService: TaskDialogService,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Calendar');

    this.store$.dispatch(new GetAllSkedTemplatesAction({}));
    this.store$.dispatch(new GetTaskInstancesAction({}));
    this.store$.dispatch(new GetParagraphsAction({}));

    this.checkForStoredZoomIndex();
    this.skedTemplates$ = this.store$.pipe(select(selectAllFilteredSkedTemplates));
    this.taskInstances$ = this.store$.pipe(select(selectTaskInstances));
    this.currentTemplateView$ = this.observeSkedTemplates();
    this.skedEvents$ = this.observerveCurrentTemplate();
    this.taskEvents$ = this.observeTaskInstances();
    this.events$ = this.observeSkedAndTaskEvents();
    this.formattedEvents$ = this.observeEvents();
    this.calendarOptions$ = this.observeFormattedEvents();
  }

  private observeSkedTemplates(): Observable<FlexSkedTemplate> {
    return combineLatest([this.skedTemplates$, this.status$]).pipe(
      map(([templates, status]) => {
        if (templates.length) {
          if (status === 'live') {
            return templates.find(template => template.live);
          }
          if (status === 'next') {
            return templates.find(template => template.status === 'next');
          }
          return null;
        }
      })
    );
  }

  private observerveCurrentTemplate(): Observable<SkedEvent[]> {
    return this.currentTemplateView$.pipe(
      map(template => {
        if (this.calendarComponent && template) {
          const calendarApi = this.calendarComponent.getApi();
          const calendarWeek = calendarApi.getDate();
          const startOfCalendarWeek = moment(calendarWeek).startOf('week');
          return template.skeds.map(sked => {
            return {
              ...sked,
              start: this.setCurrentWeek(sked.start, startOfCalendarWeek).toDate(),
              end: this.setCurrentWeek(sked.end, startOfCalendarWeek).toDate(),
            };
          });
        }
      })
    );
  }

  private observeTaskInstances(): Observable<SkedEvent[]> {
    return this.taskInstances$.pipe(
      map(instances => {
        if (instances) {
          const adjustedEvents = [];
          const taskObject: Record<string, ParagraphInstance[]> = {};
          const formattedInstances = instances.map(task => {
            return {
              ...task,
              start: moment(task.startDateTime).toDate(),
              end: moment(task.startDateTime)
                .add(task.derivedEffort < 30 || !task.derivedEffort ? 30 : task.derivedEffort, 'minutes')
                .toDate(),
              derivedEffort: task.derivedEffort || 15,
            };
          });
          const timeArray = formattedInstances.map(task => `${task.start.toString()}${task.derivedEffort}`);
          for (const key of [...new Set(timeArray)]) {
            taskObject[key] = [];
          }
          for (const task of formattedInstances) {
            taskObject[`${task.start.toString()}${task.derivedEffort}`].push(task);
          }
          for (const item in taskObject) {
            if (taskObject[item].length > 3) {
              const combinedEvent = {
                start: taskObject[item][0].start,
                end: taskObject[item][0].end,
                name: `${taskObject[item].length} Paragraphs - `,
                combined: true,
                tasks: taskObject[item],
              };
              adjustedEvents.push(combinedEvent);
            } else {
              taskObject[item].forEach((task: Task) => adjustedEvents.push(task));
            }
          }
          return adjustedEvents;
        }
      })
    );
  }

  private observeSkedAndTaskEvents(): Observable<Record<string, SkedEvent[]>> {
    return combineLatest([this.skedEvents$, this.taskEvents$]).pipe(
      map(([skedEvents, taskEvents]) => {
        if (skedEvents?.length) {
          return {
            skedEvents,
            taskEvents: taskEvents || [],
          };
        }
      })
    );
  }

  private observeEvents(): Observable<SkedEvent[]> {
    return this.events$.pipe(
      map(events => {
        if (events) {
          const formattedTaskEvents = events.taskEvents.map(task => {
            const foundSked = events.skedEvents.find(sked => {
              const skedStart = sked.start.valueOf();
              const skedEnd = sked.end.valueOf();
              const taskStart = task.start.valueOf();
              return taskStart >= skedStart && taskStart < skedEnd;
            });
            if (foundSked) {
              return {
                ...task,
                borderColor: foundSked?.borderColor,
                backgroundColor: foundSked?.backgroundColor,
                classNames: `${foundSked?.classNames}-task`,
              };
            } else {
              return {
                ...task,
                borderColor: '#9E9E9E',
                backgroundColor: '#F5F5F5',
                classNames: 'Grey-task',
                display: 'none',
              };
            }
          });
          return events.skedEvents.concat(formattedTaskEvents);
        }
      })
    );
  }

  private observeFormattedEvents(): Observable<CalendarOptions> {
    return this.formattedEvents$.pipe(
      map(events => {
        if (events) {
          return {
            ...this.initialCalendarOptions,
            slotDuration: this.zoomOptions[this.zoomIndex$.value],
            events,
          };
        }
      })
    );
  }

  private createEventDisplay(arg: EventContentArg) {
    if (arg.event.display === 'background') {
      return {html: `<div class="${arg.event.classNames[0]}-text sked-title">${arg.event._def.title}</div>`};
    }
    const duration = arg.event.extendedProps.derivedEffort;
    const tagType = duration < 30 ? 'span' : 'div';
    const dash = duration < 30 ? ' - ' : '';
    // TODO
    // const upPoints = duration < 45 ? '' : `<div class="text">${arg.event.extendedProps.upPoints || 0} up-points</div>`;
    if (arg.event.extendedProps.combined) {
      return {
        html: ` <${tagType} class="text">${moment(arg.event.start).format('hh:mm')}${dash}</${tagType}>
                <${tagType} class="bold">${
          arg.event.extendedProps.name
        }</span><span class="see-all">See all</${tagType}>
              `,
      };
    }

    if (arg.event.display !== 'background') {
      return {
        html: `<${tagType} class="bold">${arg.event.extendedProps.name}</${tagType}>
               <${tagType} class="text">${moment(arg.event.start).format('hh:mm')}${dash}</${tagType}>
              `,
        // Goes in above string last line for up points in tasks
        // ${upPoints}
      };
    }
  }

  private setCurrentWeek(date: Date | string, startOfWeek: moment.Moment): moment.Moment {
    const dateMoment = moment(date);
    const timeStr = dateMoment.format('HH:mm:ss');
    const [hour, minute, second] = dateMoment.format('HH:mm:ss').split(':');
    const day = dateMoment.day();
    if (second && second === '59' && timeStr !== '23:59:59') {
      return moment(startOfWeek)
        .day(day)
        .set({hour: Number(hour), minute: Number(minute), second: Number(second), millisecond: 0})
        .add(1, 'seconds');
    }
    return moment(startOfWeek)
      .day(day)
      .set({hour: Number(hour), minute: Number(minute), second: 0, millisecond: 0});
  }

  private onEventClick(arg: EventClickArg) {
    if (arg.event.display === 'background') {
      return;
    }
    if (arg.event.extendedProps.paragraphId) {
      this.taskDialogService.openScheduleTaskDialog(arg.event.extendedProps.paragraphId);
    }
    return;
    if (arg.event.extendedProps.combined) {
      const taskIds = arg.event.extendedProps.tasks.map((task: Paragraph) => task.paragraphId);
      this.skedDialogService.openSkedTaskListDialog(taskIds.join(','));
    } else {
      this.taskDialogService.openEditTaskDialog(arg.event.extendedProps.taskId);
    }
  }

  private onDateClick(arg: DateClickArg) {
    // this.taskDialogService.openNewTaskDialog();
  }

  public onNavigateWeekClick(value: string) {
    const calendarApi = this.calendarComponent.getApi();
    if (value === 'now') {
      calendarApi.today();
      this.status$.next('live');
      return;
    }
    if (value === 'prev') {
      calendarApi.prev();
    }
    if (value === 'next') {
      calendarApi.next();
    }
    this.compareDates(calendarApi.getDate());
  }

  public onZoom(index: number) {
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.setOption('slotDuration', this.zoomOptions[index]);
    // calendarApi.scrollToTime('10:00');
    this.zoomIndex$.next(index);
    sessionStorage.setItem('zoomIndex', JSON.stringify(index));
  }

  private compareDates(calendarDate: Date) {
    const calendarWeek = moment(calendarDate).week();
    switch (calendarWeek - this.currentWeek) {
      case 0:
        this.status$.next('live');
        break;
      case 1:
        this.status$.next('next');
        break;
      default:
        this.status$.next('draft');
    }
  }

  private checkForStoredZoomIndex() {
    const zoomIndex = JSON.parse(sessionStorage.getItem('zoomIndex'));
    if (zoomIndex || zoomIndex === 0) {
      return this.zoomIndex$.next(zoomIndex);
    }
  }
}
