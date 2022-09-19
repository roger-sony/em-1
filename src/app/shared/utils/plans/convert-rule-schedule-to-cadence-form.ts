import * as moment from 'moment';
import {Moment} from 'moment';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {CadenceEndForm, CadenceForm, CustomCadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {CadenceIntervalType} from '../../../core/model/form/cadence-interval-type';
import {CadenceMonthlyType} from '../../../core/model/form/cadence-monthly-type';
import {CadenceEndType} from '../../../core/model/form/cadence-end-type';
import {parseCadenceDateTime} from './parse-cadence-date-time';

export function convertRuleScheduleToCadenceForm(ruleSchedule: RuleSchedule): CadenceForm {
  if (!ruleSchedule) {
    return null;
  }

  const startDateTime = ruleSchedule.startDate
    ? moment(ruleSchedule.startDate)
    : parseCadenceDateTime(ruleSchedule.schedule);

  const repetition = convertScheduleToCadenceRepetition(ruleSchedule.schedule);

  const custom =
    repetition === CadenceRepetition.Custom ? convertScheduleToCustomCadenceForm(ruleSchedule.schedule) : null;

  const end = convertRuleScheduleToCadenceEndForm(ruleSchedule);

  return {startDateTime, repetition, custom, end};
}

function convertScheduleToCadenceRepetition(schedule: string): CadenceRepetition {
  if (schedule === '* * * * *') {
    return CadenceRepetition.EveryMinute;
  } else if (/^\d+ \* \* \* \*$/.test(schedule)) {
    return CadenceRepetition.Hourly;
  } else if (/^\d+ \d+ \* \* \*$/.test(schedule)) {
    return CadenceRepetition.Daily;
  } else if (/^\d+ \d+ \* \* \d+$/.test(schedule)) {
    return CadenceRepetition.Weekly;
  } else if (/^\d+ \d+ \d+ \* \*$/.test(schedule)) {
    return CadenceRepetition.Monthly;
  } else if (/^\d+ \d+ \d+ \d+ \*$/.test(schedule)) {
    return CadenceRepetition.Yearly;
  } else if (schedule.includes('*')) {
    return CadenceRepetition.Custom;
  } else {
    return CadenceRepetition.DoNotRepeat;
  }
}

function convertRuleScheduleToCadenceEndForm(ruleSchedule: RuleSchedule): CadenceEndForm {
  const maxSkedsNumber = ruleSchedule.numberOfSkeds;
  const endDate = !maxSkedsNumber && ruleSchedule.endDate ? moment(ruleSchedule.endDate) : null;
  const endType = detectCadenceEndType(endDate, maxSkedsNumber);
  return {endType, endDate, maxSkedsNumber};
}

function detectCadenceEndType(endDate: Moment, maxSkedsNumber: number): CadenceEndType {
  if (maxSkedsNumber) {
    return CadenceEndType.MaxSkedsNumber;
  } else if (endDate) {
    return CadenceEndType.EndDate;
  } else {
    return CadenceEndType.Never;
  }
}

function convertScheduleToCustomCadenceForm(schedule: string): CustomCadenceForm {
  let result = /^\*\/(\d+) \* \* \* \*$/.exec(schedule);
  if (result) {
    return {
      intervalType: CadenceIntervalType.Minute,
      intervalNumber: Number(result[1]),
    };
  }

  result = /^\d+ \*\/(\d+) \* \* \*$/.exec(schedule);
  if (result) {
    return {
      intervalType: CadenceIntervalType.Hour,
      intervalNumber: Number(result[1]),
    };
  }

  result = /^\d+ \d+ \* \* \*\/(\d+)$/.exec(schedule);
  if (result) {
    return {
      intervalType: CadenceIntervalType.Day,
      intervalNumber: Number(result[1]),
    };
  }

  result = /^\d+ \d+ \* \* ([\d+,]+)$/.exec(schedule);
  if (result) {
    return {
      intervalType: CadenceIntervalType.Week,
      intervalNumber: 1,
      weeklyDays: result[1]?.split(',').map(num => Number(num)) || [],
    };
  }

  result = /^\d+ \d+ \d+ \*\/(\d+) \*$/.exec(schedule);
  if (result) {
    return {
      intervalType: CadenceIntervalType.Month,
      intervalNumber: Number(result[1]),
      monthlyType: CadenceMonthlyType.DayOfMonth,
    };
  }

  result = /^\d+ \d+ \d+-\d+ \*\/(\d+) \d+$/.exec(schedule);
  if (result) {
    return {
      intervalType: CadenceIntervalType.Month,
      intervalNumber: Number(result[1]),
      monthlyType: CadenceMonthlyType.DayOfWeek,
    };
  }

  return null;
}
