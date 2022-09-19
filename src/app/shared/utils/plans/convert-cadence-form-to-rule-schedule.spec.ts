import * as moment from 'moment';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';
import {convertCadenceFormToRuleSchedule} from './convert-cadence-form-to-rule-schedule';

describe('convertCadenceFormToRuleSchedule', () => {
  it('no repetition', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('3/2/2020 10:08 am'),
      repetition: '',
    };

    const ruleSchedule = convertCadenceFormToRuleSchedule(cadenceForm);
    expect(ruleSchedule.schedule).toBe('');
    expect(ruleSchedule.startDate.toISOString()).toBe('2020-03-02T10:08:00.000Z');
  });

  it('do not repeat', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('3/2/2020 10:08 am'),
      repetition: CadenceRepetition.DoNotRepeat,
    };

    const ruleSchedule = convertCadenceFormToRuleSchedule(cadenceForm);
    expect(ruleSchedule.schedule).toBe('');
    expect(ruleSchedule.startDate.toISOString()).toBe('2020-03-02T10:08:00.000Z');
  });

  it('every minute', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('3/2/2020 10:08 am'),
      repetition: CadenceRepetition.EveryMinute,
    };
    expect(convertCadenceFormToRuleSchedule(cadenceForm).schedule).toBe('* * * * *');
  });

  it('hourly', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('3/2/2020 10:05 am'),
      repetition: CadenceRepetition.Hourly,
    };
    expect(convertCadenceFormToRuleSchedule(cadenceForm).schedule).toBe('5 * * * *');
  });

  it('daily', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('3/2/2020 12:05 am'),
      repetition: CadenceRepetition.Daily,
    };
    expect(convertCadenceFormToRuleSchedule(cadenceForm).schedule).toBe('5 0 * * *');
  });

  it('weekly', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('3/2/2020 8:30 am'),
      repetition: CadenceRepetition.Weekly,
    };
    expect(convertCadenceFormToRuleSchedule(cadenceForm).schedule).toBe('30 8 * * 1');
  });

  it('monthly', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('3/2/2020 12:30 pm'),
      repetition: CadenceRepetition.Monthly,
    };
    expect(convertCadenceFormToRuleSchedule(cadenceForm).schedule).toBe('30 12 2 * *');
  });

  it('yearly', () => {
    const cadenceForm: CadenceForm = {
      startDateTime: moment.utc('2/10/2020 4:30 pm'),
      repetition: CadenceRepetition.Yearly,
    };
    expect(convertCadenceFormToRuleSchedule(cadenceForm).schedule).toBe('30 16 10 2 *');
  });
});
