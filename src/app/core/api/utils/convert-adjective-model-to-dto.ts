import {Adjective} from 'src/app/core/model/adjective';
import {AdjectiveDto} from '../dto/adjective.dto';

export function convertAdjectiveModelToDto(model: Adjective): AdjectiveDto {
  return {
    _id: model.id,
    active: model.active,
    lexicon: model.lexicon || '',
    name: model.name,
    numeric: model.numeric,
    options: model.options,
    resetValue: model.resetValue || '',
    type: model.type,
    value: model.value || '',
    validation: model.validation || '',
    unitOfMeasure: model.unitOfMeasure as string[],
    updateable: model.updateable || false,
  };
}
