import {Action} from '@ngrx/store';
import {MonthModel, WeekModel} from './scheduler-dummy-data';

export enum SchedulerActionType {
  COPY_WEEK_TO_NEXT_EMPTY_SLOT = '[Scheduler] Copy Week To Next Empty Slot',

  CREATE_SKED = '[Scheduler] Create Sked Template',
  CREATE_SKED_SUCCESS = '[Scheduler] Create Sked Template :: Success',

  CREATE_WEEK = '[Scheduler] Create Week',
  CREATE_WEEK_SUCCESS = '[Scheduler] Create Week :: Success',

  INSERT_WEEK_IN_SLOT_BY_INDEX = '[Scheduler] Insert Week In Slot By Index',

  FETCH_CURRENT_MONTH = '[Scheduler] Fetch Current Month',
  FETCH_CURRENT_MONTH_SUCCESS = '[Scheduler] Fetch Current Month :: Success',

  FETCH_CURRENT_WEEK = '[Scheduler] Init Current Week',
  FETCH_CURRENT_WEEK_SUCCESS = '[Scheduler] Init Current Week :: Success',

  REMOVE_WEEK = '[Scheduler] Remove Week',

  SET_SAVE_IN_PROGRESS = '[Scheduler] Set Save In progress',

  UPDATE_WEEK = '[Scheduler] Update Week',
  UPDATE_WEEK_SUCCESS = '[Scheduler] Update Week :: Success',
}

export class CopyToNextEmptyWeekAction implements Action {
  public readonly type = SchedulerActionType.COPY_WEEK_TO_NEXT_EMPTY_SLOT;

  constructor(public week: WeekModel) {}
}

export class CreateSkedTemplateAction implements Action {
  public readonly type = SchedulerActionType.CREATE_SKED;

  public constructor() {}
}

export class CreateSkedTemplateSuccessAction implements Action {
  public readonly type = SchedulerActionType.CREATE_SKED_SUCCESS;

  public constructor() {}
}

export class CreateWeekAction implements Action {
  public readonly type = SchedulerActionType.CREATE_WEEK;

  public constructor(public payload: {onSuccess: (week: WeekModel) => void; startDate: string}) {}
}

export class CreateWeekSuccessAction implements Action {
  public readonly type = SchedulerActionType.CREATE_WEEK_SUCCESS;

  public constructor(public payload: {week: WeekModel}) {}
}

export class FetchCurrentWeekAction implements Action {
  public readonly type = SchedulerActionType.FETCH_CURRENT_WEEK;

  constructor(public weekId: string) {}
}

export class FetchCurrentWeekSuccessAction implements Action {
  public readonly type = SchedulerActionType.FETCH_CURRENT_WEEK_SUCCESS;

  constructor(public week: WeekModel) {}
}

export class InsertWeekInSlotByIndexAction implements Action {
  public readonly type = SchedulerActionType.INSERT_WEEK_IN_SLOT_BY_INDEX;

  constructor(public payload: {week: WeekModel; slotIndex: number}) {}
}

export class FetchCurrentMonthAction implements Action {
  public readonly type = SchedulerActionType.FETCH_CURRENT_MONTH;

  constructor(public payload: {onSuccess: (month: MonthModel) => void}) {}
}

export class FetchCurrentMonthSuccessAction implements Action {
  public readonly type = SchedulerActionType.FETCH_CURRENT_MONTH_SUCCESS;

  constructor(public payload: {month: MonthModel}) {}
}

export class SetSaveInProgressAction implements Action {
  public readonly type = SchedulerActionType.SET_SAVE_IN_PROGRESS;

  constructor(public state: boolean) {}
}

export class RemoveWeekAction implements Action {
  public readonly type = SchedulerActionType.REMOVE_WEEK;

  constructor(public id: string) {}
}

export class UpdateWeekAction implements Action {
  public readonly type = SchedulerActionType.UPDATE_WEEK;

  constructor(public week: WeekModel) {}
}

export class UpdateWeekSuccessAction implements Action {
  public readonly type = SchedulerActionType.UPDATE_WEEK_SUCCESS;

  constructor(public week: WeekModel) {}
}

export type SchedulerAction =
  | CopyToNextEmptyWeekAction
  | CreateSkedTemplateAction
  | CreateSkedTemplateSuccessAction
  | CreateWeekAction
  | CreateWeekSuccessAction
  | FetchCurrentWeekAction
  | FetchCurrentWeekSuccessAction
  | InsertWeekInSlotByIndexAction
  | FetchCurrentMonthAction
  | FetchCurrentMonthSuccessAction
  | RemoveWeekAction
  | SetSaveInProgressAction
  | UpdateWeekAction
  | UpdateWeekSuccessAction;
