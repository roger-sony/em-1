import {RuleSchedule} from '../../../core/model/rule-schedule';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {CadenceIntervalType} from '../../../core/model/form/cadence-interval-type';
import {convertRuleScheduleToCadenceForm} from './convert-rule-schedule-to-cadence-form';
import {formatCadenceFormMonthlyType} from './format-cadence-form-monthly-type';
import {formatCadenceFormWeeklyDays} from './format-cadence-form-weekly-days';

export function formatRuleSchedule(ruleSchedule: RuleSchedule): string {
  const cadenceForm = convertRuleScheduleToCadenceForm(ruleSchedule);
  if (!cadenceForm?.repetition || cadenceForm.repetition === CadenceRepetition.DoNotRepeat) {
    return 'No cadence';
  } else if (cadenceForm.repetition === CadenceRepetition.Custom && cadenceForm.custom) {
    const {intervalNumber, intervalType} = cadenceForm.custom;
    const interval =
      intervalNumber > 1 ? `${intervalNumber} ${intervalType.toLowerCase()}s` : intervalType.toLowerCase();

    switch (intervalType) {
      case CadenceIntervalType.Minute:
        return `Every ${interval}`;
      case CadenceIntervalType.Week:
        return `Weekly ${formatCadenceFormWeeklyDays(cadenceForm, false)}`;
      case CadenceIntervalType.Month:
        return `Monthly ${formatCadenceFormMonthlyType(cadenceForm, false)}`;
      default:
        return `Every ${interval} at ${cadenceForm.startDateTime?.format('H:mm a')}`;
    }
  } else {
    return cadenceForm.repetition;
  }
}
