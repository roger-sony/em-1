import {createEntityAdapter} from '@ngrx/entity';
import {dummySkedTemplates, MonthModel, SkedTemplateModel, WeekModel} from './scheduler-dummy-data';

export interface SchedulerState {
  currentMonth: MonthModel;
  currentWeek: WeekModel;
  hasUnsavedChanges: boolean;
  saveInProgress: boolean;
  skedTemplates: SkedTemplateModel[];
}

export const schedulerAdapter = createEntityAdapter<SchedulerState>();

export const initialSchedulerState: SchedulerState = schedulerAdapter.getInitialState({
  currentMonth: null, // dummyMonth,
  currentWeek: null, //dummyWeek,
  hasUnsavedChanges: false,
  saveInProgress: false,
  skedTemplates: dummySkedTemplates,
});
