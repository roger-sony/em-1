import {Action} from '@ngrx/store';
import {RuleSchedule} from '../../model/rule-schedule';

export enum RuleSchedulesActionType {
  GET_ALL = '[Rule Schedules] Get All',
  GET_ALL_SUCCESS = '[Rule Schedules] Get All :: Success',

  GET_SINGLE = '[Rule Schedules] Get Single',
  GET_SINGLE_SUCCESS = '[Rule Schedules] Get Single :: Success',

  CREATE = '[Rule Schedules] Create',
  CREATE_SUCCESS = '[Rule Schedules] Create :: Success',

  DELETE = '[Rule Schedules] Delete',
  DELETE_SUCCESS = '[Rule Schedules] Delete :: Success',

  SET_LOADED = '[Rule Schedules] Set Loaded',

  CLEAR = '[Rule Schedules] Clear',
}

export class GetAllRuleSchedulesAction implements Action {
  public readonly type = RuleSchedulesActionType.GET_ALL;

  public constructor(
    public payload: {
      onSuccess?: (ruleSchedules: RuleSchedule[]) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetAllRuleSchedulesSuccessAction implements Action {
  public readonly type = RuleSchedulesActionType.GET_ALL_SUCCESS;

  public constructor(public payload: {ruleSchedules: RuleSchedule[]}) {}
}

export class GetSingleRuleScheduleAction implements Action {
  public readonly type = RuleSchedulesActionType.GET_SINGLE;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: (ruleSchedule: RuleSchedule) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class GetSingleRuleScheduleSuccessAction implements Action {
  public readonly type = RuleSchedulesActionType.GET_SINGLE_SUCCESS;

  public constructor(public payload: {ruleSchedule: RuleSchedule}) {}
}

export class CreateRuleScheduleAction implements Action {
  public readonly type = RuleSchedulesActionType.CREATE;

  public constructor(
    public payload: {
      ruleSchedule: RuleSchedule;
      onSuccess?: (ruleSchedule: RuleSchedule) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class CreateRuleScheduleSuccessAction implements Action {
  public readonly type = RuleSchedulesActionType.CREATE_SUCCESS;

  public constructor(public payload: {ruleSchedule: RuleSchedule}) {}
}

export class DeleteRuleScheduleAction implements Action {
  public readonly type = RuleSchedulesActionType.DELETE;

  public constructor(
    public payload: {
      id: string;
      onSuccess?: (id: string) => void;
      onFailure?: (error: Error) => void;
    }
  ) {}
}

export class DeleteRuleScheduleSuccessAction implements Action {
  public readonly type = RuleSchedulesActionType.DELETE_SUCCESS;

  public constructor(public payload: {id: string}) {}
}

export class SetRuleSchedulesLoadedAction implements Action {
  public readonly type = RuleSchedulesActionType.SET_LOADED;

  public constructor(public payload: {loaded: boolean}) {}
}

export class ClearRuleSchedulesAction implements Action {
  public readonly type = RuleSchedulesActionType.CLEAR;
}

export type RuleSchedulesAction =
  | GetAllRuleSchedulesAction
  | GetAllRuleSchedulesSuccessAction
  | GetSingleRuleScheduleAction
  | GetSingleRuleScheduleSuccessAction
  | CreateRuleScheduleAction
  | CreateRuleScheduleSuccessAction
  | DeleteRuleScheduleAction
  | DeleteRuleScheduleSuccessAction
  | SetRuleSchedulesLoadedAction
  | ClearRuleSchedulesAction;
