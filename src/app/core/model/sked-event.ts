export interface SkedEvent {
  start?: Date | string;
  end?: Date | string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  classNames?: string;
  title?: string;
  id?: string;
  daysOfWeek?: number[];
  editable?: boolean;
  eventDurationEditable?: boolean;
  allDay?: boolean;
  display?: string;
  overlap?: boolean;
  skedData?: SkedData;
}

export interface SkedData {
  startDay: string;
  endDay: string;
  startTime: string;
  endTime: string;
}
