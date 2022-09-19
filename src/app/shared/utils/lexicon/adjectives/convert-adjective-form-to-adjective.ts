import {Adjective} from 'src/app/core/model/adjective';
import {AdjectiveForm} from '../../../../core/model/adjective-form';

export function convertAdjectFormToAdjective(form: AdjectiveForm): Adjective {
  const {name, type, options} = form;
  return {
    name: name.trim(),
    type: form.type,
    unitOfMeasure: type === 'number' ? options : null,
    numeric: type === 'number',
    options: type === 'selection' || type === 'multiselection' ? options : null,
    validation: findValidation(form),
  };
}

function findValidation(form: AdjectiveForm): string {
  if (form.type === 'date') {
    return form.dateTypeOption;
  }
  if (form.type === 'number') {
    return form.numberTypeOption;
  }
  return '';
}
