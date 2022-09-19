import {CadenceEndType} from '../../../core/model/form/cadence-end-type';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceIntervalType} from '../../../core/model/form/cadence-interval-type';
import {CadenceMonthlyType} from '../../../core/model/form/cadence-monthly-type';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';

export function convertCadenceFormToRuleSchedule(cadenceForm: CadenceForm): RuleSchedule {
  if (!cadenceForm?.startDateTime?.isValid()) {
    return null;
  }

  const ruleId = cadenceForm.planId;
  const displayName = 'name is never shown in the new design';

  const startDate = cadenceForm.startDateTime.toDate();

  const endDate =
    cadenceForm.end?.endType === CadenceEndType.EndDate ? cadenceForm.end?.endDate?.endOf('day').toDate() : null;
  const numberOfSkeds =
    cadenceForm.end?.endType === CadenceEndType.MaxSkedsNumber ? cadenceForm.end?.maxSkedsNumber : null;

  const schedule = convertCadenceFormToSchedule(cadenceForm);
  const saveReport = cadenceForm.saveReport || false; // TODO show in the desktop form
  const triggerActions = cadenceForm.triggerActions || true; // TODO show in the desktop form
  return {ruleId, displayName, startDate, schedule, endDate, numberOfSkeds, saveReport, triggerActions};
}

function convertCadenceFormToSchedule(form: CadenceForm): string {
  switch (form.repetition) {
    case CadenceRepetition.EveryMinute:
      return '* * * * *';
    case CadenceRepetition.Hourly:
      return form.startDateTime.utc().format('m * * * *');
    case CadenceRepetition.Daily:
      return form.startDateTime.utc().format('m H * * *');
    case CadenceRepetition.Weekly:
      return form.startDateTime.utc().format('m H * * d');
    case CadenceRepetition.Monthly:
      return form.startDateTime.utc().format('m H D * *');
    case CadenceRepetition.Yearly:
      return form.startDateTime.utc().format('m H D M *');
    case CadenceRepetition.Custom:
      return convertCustomCadenceFormToSchedule(form);
    default:
      return '';
  }
}

function convertCustomCadenceFormToSchedule(form: CadenceForm): string {
  switch (form.custom?.intervalType) {
    case CadenceIntervalType.Minute:
      return `*/${form.custom.intervalNumber} * * * *`;
    case CadenceIntervalType.Hour:
      return form.startDateTime.utc().format(`m */${form.custom.intervalNumber} * * *`);
    case CadenceIntervalType.Day:
      return form.startDateTime.utc().format(`m H * * */${form.custom.intervalNumber}`);
    case CadenceIntervalType.Week:
      // TODO cannot do something like every two weeks
      return form.startDateTime.utc().format(`m H * * ${form.custom.weeklyDays.join(',')}`);
    case CadenceIntervalType.Month:
      if (form.custom.monthlyType === CadenceMonthlyType.DayOfMonth) {
        return form.startDateTime.utc().format(`m H D */${form.custom.intervalNumber} *`);
      } else if (form.custom.monthlyType === CadenceMonthlyType.DayOfWeek) {
        const rangeEnd = Math.ceil(form.startDateTime.date() / 7) * 7;
        const range = `${rangeEnd - 6}-${Math.min(rangeEnd, 31)}`;
        return form.startDateTime.utc().format(`m H ${range} */${form.custom.intervalNumber} d`);
      } else {
        return '';
      }
    default:
      return '';
  }
}
