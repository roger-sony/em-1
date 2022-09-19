import {Adjective} from 'src/app/core/model/adjective';
import {AdjectiveForm} from '../../../../core/model/adjective-form';

export function convertAdjectiveToAdjectiveForm(adjective: Adjective): AdjectiveForm {
  const {name, type, numeric, options, unitOfMeasure, validation} = adjective;
  return {
    name,
    type,
    numeric,
    options: options || (unitOfMeasure as string[]),
    dateTypeOption: type === 'date' ? validation : null,
    numberTypeOption: type === 'number' ? validation : null,
  };
}
