import {CalendarOptions, DayHeaderContentArg} from '@fullcalendar/angular';
import * as moment from 'moment';

export const SKED_CALENDAR_VIEW_OPTIONS: CalendarOptions = {
  initialView: 'timeGridWeek',
  slotEventOverlap: false,
  snapDuration: '00:15:00',
  contentHeight: 'auto',
  nowIndicator: true,
  displayEventEnd: false,
  stickyHeaderDates: true,
  headerToolbar: {
    left: '',
    center: '',
    right: '',
  },
  dayHeaderContent: arg => formatDayHeader(arg),
};

function formatDayHeader(arg: DayHeaderContentArg) {
  const uppercaseDay = moment.weekdays(arg.date.getDay()).substring(0, 3).toUpperCase();
  return {
    html: `
          <div class="calendar-day">${uppercaseDay}<div>
          <div class="calendar-date">${arg.date.getDate()}<div>
        `,
  };
}
