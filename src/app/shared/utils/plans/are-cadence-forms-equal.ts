import * as moment from 'moment';
import {CadenceEndType} from '../../../core/model/form/cadence-end-type';
import {CadenceEndForm, CadenceForm, CustomCadenceForm} from '../../../core/model/form/cadence-form';

export function areCadenceFormsEqual(form1: CadenceForm, form2: CadenceForm): boolean {
  return (
    form1 &&
    form2 &&
    moment(form1.startDateTime).isSame(moment(form2.startDateTime)) &&
    form1.repetition === form2.repetition &&
    areCustomCadenceFormsEqual(form1.custom, form2.custom) &&
    areCadenceEndFormsEqual(form1.end, form2.end) &&
    Boolean(form1.saveReport) === Boolean(form2.saveReport) &&
    Boolean(form1.triggerActions) === Boolean(form2.triggerActions)
  );
}

export function areCustomCadenceFormsEqual(form1: CustomCadenceForm, form2: CustomCadenceForm): boolean {
  return JSON.stringify(form1 || {}) === JSON.stringify(form2 || {});
}

export function areCadenceEndFormsEqual(form1: CadenceEndForm, form2: CadenceEndForm): boolean {
  if (!form1 && !form2) {
    return true;
  }

  return (
    form1 &&
    form2 &&
    form1.endType === form2.endType &&
    ((form1.endType === CadenceEndType.MaxSkedsNumber && form1.maxSkedsNumber === form2.maxSkedsNumber) ||
      (form1.endType === CadenceEndType.EndDate && moment(form1.endDate).isSame(moment(form2.endDate))))
  );
}
