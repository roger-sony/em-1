import {Moment} from 'moment';
import {CadenceIntervalType} from './cadence-interval-type';
import {CadenceMonthlyType} from './cadence-monthly-type';
import {CadenceEndType} from './cadence-end-type';

export interface CadenceForm {
  id?: string;
  planId?: string;
  cadenceId?: string;
  startDateTime: Moment;
  repetition: string;
  custom?: CustomCadenceForm;
  end?: CadenceEndForm;
  saveReport?: boolean;
  triggerActions?: boolean;
  page?: CadenceFormPage;
}

export interface CustomCadenceForm {
  intervalNumber: number;
  intervalType: CadenceIntervalType;
  monthlyType?: CadenceMonthlyType;
  weeklyDays?: number[];
}

export interface CadenceEndForm {
  endType: CadenceEndType;
  endDate?: Moment;
  maxSkedsNumber?: number;
}

export enum CadenceFormPage {
  SetCadence = 'SetCadence',
  CreatePlan = 'CreatePlan',
  CreateTask = 'CreateTask',
}
