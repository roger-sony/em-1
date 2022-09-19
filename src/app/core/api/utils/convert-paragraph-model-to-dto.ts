import {Paragraph} from './../../model/paragraph';
import {ParagraphDto} from './../dto/paragraph.dto';
import {convertCadenceFormModelToDto} from './convert-cadence-form-model-to-dto';
import {convertSentenceModelToDto} from './convert-sentence-model-to-dto';

export function convertParagraphModelToDto(model: Paragraph): ParagraphDto {
  return {
    assignedTo: model.assignedTo,
    assignedToUser: model.assignedToUser,
    derivedEffort: model.derivedEffort || null,
    _id: model.id,
    lexicon: model.lexicon,
    movability: model.movability,
    name: model.name,
    paragraphID: model.paragraphId,
    startDateTime: model.startDateTime,
    priority: model.priority,
    cadence: model.cadence ? model.cadence.map(item => convertCadenceFormModelToDto(item)) : [],
    score: model.score,
    sentences: model.sentences?.length ? model.sentences.map(item => convertSentenceModelToDto(item)) : [],
    startedAt: model.startedAt,
    status: model.status,
  };
}
