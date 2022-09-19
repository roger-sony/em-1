import {CalendarOptions, DayHeaderContentArg} from '@fullcalendar/angular';
import * as moment from 'moment';

export const SKED_TEMPLATE_CALENDAR_OPTIONS: CalendarOptions = {
  initialView: 'timeGridWeek',
  eventOverlap: false,
  eventResizableFromStart: true,
  eventDurationEditable: true,
  slotDuration: '00:30:00',
  snapDuration: '00:15:00',
  contentHeight: 'auto',
  stickyHeaderDates: true,
  headerToolbar: {
    left: '',
    center: '',
    right: '',
  },
  views: {
    month: {
      titleFormat: 'MM',
    },
    day: {
      titleFormat: 'DD',
    },
  },
  dayHeaderContent: arg => formatDayHeader(arg),
};

function formatDayHeader(arg: DayHeaderContentArg) {
  const uppercaseDay = moment.weekdays(arg.date.getDay()).substring(0, 3).toUpperCase();
  return {
    html: `
          <div class="calendar-day">${uppercaseDay}<div>
        `,
  };
}
