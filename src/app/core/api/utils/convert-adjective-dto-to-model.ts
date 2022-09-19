import {Adjective} from 'src/app/core/model/adjective';
import {AdjectiveDto} from './../dto/adjective.dto';

export function convertAdjectiveDtoToModel(dto: AdjectiveDto): Adjective {
  return {
    active: dto.active || false,
    id: dto._id,
    lexicon: dto.lexicon || '',
    name: dto.name,
    numeric: dto.numeric,
    options: dto.options,
    resetValue: dto.resetValue || null,
    type: dto.type,
    validation: dto.validation,
    value: dto.value || null,
    unitOfMeasure: dto.unitOfMeasure,
    updateable: dto.updateable || false,
  };
}
