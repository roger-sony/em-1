import {Sentence, SentenceNoun} from '../../model/sentence';
import {SentenceDto, SentenceNounDto} from './../dto/sentence.dto';

export function convertSentenceModelToDto(model: Sentence): SentenceDto {
  return {
    _id: model.id,
    verb: model.verb,
    noun: convertSentenceNounModelToDto(model.noun),
    priority: model.priority,
    movability: model.movability,
    effort: model.effort,
    lexicon: model.lexicon,
    plot: model.plot,
  };
}

export function convertSentenceNounModelToDto(dto: SentenceNoun): SentenceNounDto {
  return {
    ...dto,
    _id: dto.id,
  };
}
