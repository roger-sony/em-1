import {Verb} from './../../model/verb';
import {VerbDto} from './../dto/verb.dto';

export function convertVerbDtoToModel(dto: VerbDto): Verb {
  return {
    id: dto._id,
    name: dto.name,
    description: dto.description,
  };
}
