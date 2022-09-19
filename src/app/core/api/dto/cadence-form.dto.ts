import {Moment} from 'moment';
import {CadenceIntervalType} from '../../model/form/cadence-interval-type';
import {CadenceMonthlyType} from '../../model/form/cadence-monthly-type';
import {CadenceEndType} from '../../model/form/cadence-end-type';

export interface CadenceFormDto {
  planId?: string;
  cadenceId?: string;
  startDateTime: string;
  repetition: string;
  custom?: CustomCadenceFormDto;
  end?: CadenceEndFormDto;
  saveReport?: boolean;
  triggerActions?: boolean;
  page?: CadenceFormPage;
  id?: string;
}

export interface CustomCadenceFormDto {
  intervalNumber: number;
  intervalType: CadenceIntervalType;
  monthlyType?: CadenceMonthlyType;
  weeklyDays?: number[];
}

export interface CadenceEndFormDto {
  endType: CadenceEndType;
  endDate?: Moment;
  maxSkedsNumber?: number;
}

export enum CadenceFormPage {
  SetCadence = 'SetCadence',
  CreatePlan = 'CreatePlan',
  CreateTask = 'CreateTask',
}
