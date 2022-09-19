import {Moment} from 'moment';

export interface ChapterForm {
  name: string;
  color: string;
  startDate: Moment;
  endDate: Moment;
  progress: number;
  plot: string;
  description: string;
}
