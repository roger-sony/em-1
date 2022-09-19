import {SentenceVerb} from './../../model/sentence';
import {Sentence, SentenceNoun} from '../../model/sentence';
import {SentenceDto, SentenceNounDto, SentenceVerbDto} from './../dto/sentence.dto';

export function convertSentenceDtoToModel(dto: SentenceDto): Sentence {
  return {
    id: dto._id,
    verb: dto.verb ? convertSentenceVerbDtoToModel(dto.verb) : ({} as SentenceVerb),
    noun: dto.noun ? convertSentenceNounDtoToModel(dto.noun) : ({} as SentenceNoun),
    priority: dto.priority,
    movability: dto.movability,
    effort: dto.effort,
    lexicon: dto.lexicon,
    plot: dto.plot,
  };
}

export function convertSentenceNounDtoToModel(noun: SentenceNounDto): SentenceNoun {
  return {
    active: noun.active,
    adjectives: noun.adjectives,
    batchID: noun.batchID,
    createdAt: noun.createdAt,
    id: noun._id,
    name: noun.name,
    updatedAt: noun.updatedAt,
    version: noun.version,
  };
}

export function convertSentenceVerbDtoToModel(verb: SentenceVerbDto): SentenceVerb {
  return {
    name: verb.name,
    description: verb.description,
    id: verb._id,
  };
}
