import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {CalendarOptions, EventApi, EventClickArg, FullCalendarComponent} from '@fullcalendar/angular';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {selectRouterParam, selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import * as moment from 'moment';
import {SkedEvent} from 'src/app/core/model/sked-event';
import {distinctUntilChanged, map, switchMap, take} from 'rxjs/operators';
import {
  CreateSkedTemplateAction,
  GetSingleSkedTemplateAction,
  UpdateSkedTemplateAction,
} from 'src/app/core/store/skeds/skeds.action';
import {MessageService} from 'src/app/services/message.service';
import {FlexSkedTemplate} from 'src/app/core/model/flex-sked-template';
import {selectFlexSkedTemplateById} from 'src/app/core/store/skeds/skeds.selector';
import {SKED_TEMPLATE_CALENDAR_OPTIONS} from './sked-template-calendar-options';
import {SKED_COLORS} from '../../shared/sked-colors';
import {MatDialog} from '@angular/material/dialog';
import {EditSkedDialogComponent} from 'src/app/shared/skeds/edit-sked-dialog/edit-sked-dialog.component';
import {SkedTemplateUseDialogComponent} from '../shared/use-dialog/sked-template-use-dialog.component';
import {SkedTemplateAbandonDialogComponent} from '../shared/abandon-dialog/sked-template-abandon-dialog.component';
import {DateClickArg, EventResizeDoneArg} from '@fullcalendar/interaction';
import {selectActiveUserPrivileges} from '../../../core/store/active-user/active-user.selector';
import {EventDropArg} from '@fullcalendar/angular';

@Component({
  selector: 'sked-template-detail',
  templateUrl: './sked-template-detail.component.html',
  styleUrls: ['./sked-template-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplateDetailComponent implements OnInit, OnDestroy {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  public readonly activeUserPrivileges: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public name$: Observable<string>;
  public skedTemplateId$: Observable<string>;
  public skedTemplate$: Observable<FlexSkedTemplate>;
  public skeds$ = new BehaviorSubject<EventApi[]>([]);
  public editing$: Observable<boolean>;
  public edited$: Observable<boolean>;
  public calendarOptions$: Observable<CalendarOptions>;

  public readonly skedColors = SKED_COLORS;
  public days: string[] = moment.weekdays();

  private subscriptions = new Subscription();

  public initialCalendarOptions: CalendarOptions = {
    ...SKED_TEMPLATE_CALENDAR_OPTIONS,
    allDaySlot: false,
    dateClick: event => this.onCreateNewSkedClick(event),
    eventClick: event => this.onEditSkedClick(event),
    eventsSet: event => this.onEventSet(event),
    eventDrop: event => this.onEventChange(event),
    eventResize: event => this.onEventChange(event),
  };

  get canEditChapters(): boolean {
    return this.activeUserPrivileges?.value?.includes('Can edit Chapters');
  }

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private store$: Store
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    this.edited$.pipe(take(1)).subscribe(edited => {
      if (edited) {
        event.returnValue = false;
      }
    });
  }

  ngOnInit(): void {
    this.name$ = this.store$.pipe(select(selectRouterQueryParam('name')));
    this.editing$ = this.store$.pipe(select(selectRouterQueryParam('editing')));
    this.edited$ = this.store$.pipe(select(selectRouterQueryParam('edited')));
    this.skedTemplateId$ = this.store$.pipe(select(selectRouterParam('templateId')));
    this.skedTemplate$ = this.skedTemplateId$.pipe(
      switchMap(templateId => this.store$.pipe(select(selectFlexSkedTemplateById(templateId))))
    );
    this.calendarOptions$ = this.observeSkedTemplate();

    this.subscriptions.add(this.subscribeToSkedTemplateId());
    this.subscriptions.add(
      this.store$.select(selectActiveUserPrivileges).subscribe(p => this.activeUserPrivileges.next(p))
    );
  }

  private subscribeToSkedTemplateId(): Subscription {
    return this.skedTemplateId$.pipe(distinctUntilChanged()).subscribe(templateId => {
      if (templateId) {
        this.store$.dispatch(
          new GetSingleSkedTemplateAction({templateId, onFailure: () => this.onGetSkedTemplateFailure()})
        );
      }
    });
  }

  private observeSkedTemplate(): Observable<CalendarOptions> {
    return combineLatest([this.skedTemplate$, this.editing$, this.name$]).pipe(
      map(([template, editing, name]) => {
        if (template?.displayName) {
          if (editing) {
            const skedsDto = this.formatSkeds('auto', template.skeds);
            return {
              ...this.initialCalendarOptions,
              events: skedsDto,
              dateClick: (event: DateClickArg) => this.onCreateNewSkedClick(event),
              eventClick: (event: EventClickArg) => this.onEditSkedClick(event),
            };
          }
          if (!editing && !name) {
            const skedsDto = this.formatSkeds('background', template.skeds);
            return {
              ...this.initialCalendarOptions,
              events: skedsDto,
              dateClick: null,
              eventClick: null,
            };
          }
        }
      })
    );
  }

  private formatSkeds(display: string, skeds: SkedEvent[]): SkedEvent[] {
    return skeds.map(sked => {
      return {
        ...sked,
        display: display,
        start: this.setCurrentWeek(sked.start).toDate(),
        end: this.setCurrentWeek(sked.end).toDate(),
      };
    });
  }

  private setCurrentWeek(date: Date | string): moment.Moment {
    const dateMoment = moment(date);
    const timeStr = dateMoment.format('HH:mm:ss');
    const [hour, minute, second] = dateMoment.format('HH:mm:ss').split(':');
    const day = dateMoment.day();
    if (second && second === '59' && timeStr !== '23:59:59') {
      return moment()
        .day(day)
        .set({hour: Number(hour), minute: Number(minute), second: Number(second), millisecond: 0})
        .add(1, 'seconds');
    }
    return moment()
      .day(day)
      .set({hour: Number(hour), minute: Number(minute), second: 0, millisecond: 0});
  }

  public onCreateNewSkedClick(arg: DateClickArg) {
    this.skeds$.pipe(take(1)).subscribe(skeds => {
      const newStartDate = moment(arg.dateStr);
      const invalid = skeds.some(sked => {
        const skedStart = moment(sked.start);
        const skedEnd = moment(sked.end);
        return newStartDate.isBetween(skedStart, skedEnd, 'minute', '[)');
      });
      if (invalid) {
        return;
      }
      const calendar = arg.view.calendar;
      const randomNumber = Math.floor(Math.random() * (6 - 0) + 0);
      const endMoment = moment(arg.date).add(15, 'minutes');
      const formattedEnd = endMoment.format('HH:mm') === '00:00' ? endMoment.subtract(1, 'seconds') : endMoment;
      this.router.navigate([], {queryParams: {edited: true}, queryParamsHandling: 'merge'});
      calendar.addEvent({
        start: arg.dateStr,
        end: formattedEnd.toDate(),
        id: Date.now().toString(),
        backgroundColor: this.skedColors[randomNumber].backgroundColor,
        borderColor: this.skedColors[randomNumber].borderColor,
        textColor: this.skedColors[randomNumber].borderColor,
        classNames: this.skedColors[randomNumber].name,
        display: 'auto',
        overlap: false,
        editable: true,
        allDay: false,
      });
    });
  }

  public onEditSkedClick(arg: EventClickArg) {
    this.skeds$.pipe(take(1)).subscribe(allSkeds => {
      const dialog = this.dialog.open(EditSkedDialogComponent, {
        backdropClass: 'oph-backdrop',
        data: {sked: arg.event, allSkeds},
        panelClass: 'oph-dialog',
      });
      dialog.afterClosed().subscribe(value => {
        if (value?.delete) {
          arg.event.remove();
        }
        if (value && !value.delete) {
          this.router.navigate([], {queryParams: {edited: true}, queryParamsHandling: 'merge'});

          const endDate = value.end.format('HH:mm') === '23:59' ? value.end.set('seconds', 59) : value.end;
          arg.event.setProp('title', value.title || '');
          arg.event.setProp('backgroundColor', value.backgroundColor);
          arg.event.setProp('borderColor', value.borderColor);
          arg.event.setProp('classNames', value.classNames);
          arg.event.setProp('textColor', value.borderColor);
          arg.event.setDates(value.start.toDate(), endDate.toDate());
        }
      });
    });
  }

  private onEventSet(arg: EventApi[]) {
    this.skeds$.next(arg);
  }

  private onEventChange(arg: EventDropArg | EventResizeDoneArg) {
    const endMoment = moment(arg.event.end);
    if (endMoment.format('ss') === '00' && endMoment.format('HH:mm') !== '00:00') {
      endMoment.set('seconds', 59);
    }
    if (
      (endMoment.format('mm')[1] === '4' || endMoment.format('mm')[1] === '9') &&
      endMoment.format('HH:mm') !== '23:59'
    ) {
      arg.event.setDates(arg.event.start, endMoment.add(1, 'seconds').toDate());
    }
    if (endMoment.format('HH:mm') === '00:00') {
      arg.event.setDates(arg.event.start, endMoment.subtract(1, 'seconds').toDate());
    }
    this.router.navigate([], {queryParams: {edited: true}, queryParamsHandling: 'merge'});
  }

  public onCancelClick() {
    combineLatest([this.editing$, this.edited$, this.skedTemplate$])
      .pipe(take(1))
      .subscribe(([editing, edited, template]) => {
        const calendarApi = this.calendarComponent?.getApi();
        const allEvents = calendarApi.getEvents();
        if (editing && !edited) {
          this.router.navigate([], {queryParams: {editing: null, edited: null}});
        } else {
          this.openSkedTemplateAbandonDialog(allEvents, template, editing);
        }
      });
  }

  public openSkedTemplateAbandonDialog(allEvents: EventApi[], template: FlexSkedTemplate, editing: boolean) {
    const dialog = this.dialog.open(SkedTemplateAbandonDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        if (allEvents.length > template?.skeds.length) {
          const difference = allEvents.length - template.skeds.length;
          const itemsToRemove = allEvents.splice(-difference, difference);
          itemsToRemove.forEach(event => event.remove());
        }
        if (editing) {
          this.router.navigate([], {queryParams: {editing: null}});
        } else {
          this.router.navigate(['chapters'], {queryParams: {name: null, editing: null}});
        }
      }
    });
  }

  public onSaveClick(newName?: string) {
    combineLatest([this.name$, this.skeds$, this.editing$])
      .pipe(take(1))
      .subscribe(([name, skeds, editing]) => {
        const skedsDto: SkedEvent[] = skeds.map(sked => {
          sked.remove();
          return {
            ...this.toPlainObject(sked),
            display: 'background',
            overlap: false,
            editable: true,
            allDay: false,
          };
        });
        if (editing) {
          this.updateTemplate(skedsDto, newName);
        } else {
          this.saveNewTemplate(name, skedsDto);
        }
      });
  }

  private toPlainObject(sked: EventApi): SkedEvent {
    const startMoment = moment(sked.start);
    const endMoment = moment(sked.end);
    const startDay = startMoment.format('dddd');
    const endDay = endMoment.format('dddd');
    const startTime = startMoment.format('HH:mm');
    const endTime = endMoment.format('HH:mm');
    const formattedEndTime = this.formatSaveEndTime(endTime, endMoment);

    return {
      start: sked.start,
      end: formattedEndTime,
      title: sked.title,
      id: sked.id,
      backgroundColor: sked.backgroundColor,
      borderColor: sked.borderColor,
      textColor: sked.borderColor,
      classNames: sked.classNames[0],
      skedData: {startDay, endDay, startTime, endTime},
    };
  }

  private formatSaveEndTime(endTime: string, endMoment: moment.Moment): Date {
    const endMomentSeconds = endMoment.get('seconds');

    if (endTime === '23:59') {
      return endMoment.set('seconds', 59).toDate();
    }
    if (endMomentSeconds === 0) {
      return endMoment.subtract(1, 'seconds').toDate();
    }
  }

  public saveNewTemplate(name: string, skeds: SkedEvent[]) {
    const template = {
      displayName: name,
      skeds: skeds || [],
      live: false,
      status: 'draft',
      lastUpdated: new Date(),
    };
    this.store$.dispatch(
      new CreateSkedTemplateAction({
        skedTemplate: template,
        onSuccess: () => this.onCreateTemplateSuccess(),
        onFailure: () => this.onCreateTemplateFailure(),
      })
    );
  }

  public updateTemplate(skeds: SkedEvent[], newName?: string) {
    this.skedTemplate$.pipe(take(1)).subscribe(template => {
      const templateDto = {
        ...template,
        lastUpdated: new Date(),
        skeds,
        displayName: newName || template.displayName,
      };
      this.store$.dispatch(
        new UpdateSkedTemplateAction({
          skedId: template.id,
          skedTemplate: templateDto,
          onSuccess: () => this.onUpdateTemplateSuccess(),
          onFailure: () => this.onUpdateTemplateFailure(),
        })
      );
    });
  }

  public onUseTemplateClick() {
    const dialog = this.dialog.open(SkedTemplateUseDialogComponent, {
      backdropClass: 'oph-backdrop',
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.skedTemplate$.pipe(take(1)).subscribe(template => {
          const templateDto = {...template, status: 'next', statusUpdate: true};
          this.store$.dispatch(
            new UpdateSkedTemplateAction({
              skedId: template.id,
              skedTemplate: templateDto,
              onSuccess: () => this.onUpdateTemplateSuccess(),
              onFailure: () => this.onUpdateTemplateFailure(),
            })
          );
        });
      }
    });
  }

  public onCreateTemplateSuccess() {
    this.messageService.add('Success! Your Chapter has been created.');
    this.router.navigate(['chapters'], {queryParams: {name: null}});
  }

  public onCreateTemplateFailure() {
    this.messageService.add('Error: There was a problem creating your Chapter.');
    this.router.navigate(['chapters'], {queryParams: {name: null}});
  }

  private onGetSkedTemplateFailure() {
    this.router.navigate(['/chapters']).then(() => this.messageService.add('Error: Chapter not found'));
  }

  public onUpdateTemplateSuccess() {
    this.messageService.add('Success! Your Chapter has been updated.');
    this.router.navigate([], {queryParams: {name: null}});
  }

  public onUpdateTemplateFailure() {
    this.messageService.add('Error: There was a problem updating your Chapter.');
    this.router.navigate([], {queryParams: {name: null}});
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
