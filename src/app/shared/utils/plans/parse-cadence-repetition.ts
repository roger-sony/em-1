import {CadenceRepetition} from '../../../dialog/plan/shared/cadence-form/cadence-repetition';

export function parseCadenceRepetition(schedule: string): CadenceRepetition {
  if (schedule === '* * * * *') {
    return CadenceRepetition.EveryMinute;
  } else if (/[0-9,]+ \* \* \* \*/.test(schedule)) {
    return CadenceRepetition.Hourly;
  } else if (/[0-9,\*]+ [0-9,]+ \* \* \*/.test(schedule)) {
    return CadenceRepetition.Daily;
  } else if (/[0-9,\*]+ [0-9,\*]+ \* \* [0-9,]+/.test(schedule)) {
    return CadenceRepetition.Weekly;
  } else if (/[0-9,\*]+ [0-9,\*]+ [0-9,]+ \* \*/.test(schedule)) {
    return CadenceRepetition.Monthly;
  } else if (/[0-9,\*]+ [0-9,\*]+ [0-9,\*]+ [0-9,]+ \*/.test(schedule)) {
    return CadenceRepetition.Yearly;
  } else {
    return CadenceRepetition.DoNotRepeat;
  }
}
