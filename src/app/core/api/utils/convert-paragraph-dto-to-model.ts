import {ParagraphInstance} from '../../model/task-instance';
import {Paragraph} from './../../model/paragraph';
import {ParagraphDto} from './../dto/paragraph.dto';
import {convertCadenceFormDtoToModel} from './convert-cadence-form-dto-to-model';
import {convertSentenceDtoToModel} from './convert-sentence-dto-to-model';

export function convertParagraphDtoToModel(dto: ParagraphDto): Paragraph {
  return {
    assignedTo: dto.assignedTo,
    assignedToUser: dto.assignedToUser,
    derivedEffort: dto.derivedEffort,
    id: dto._id,
    lexicon: dto.lexicon,
    movability: dto.movability,
    name: dto.name,
    paragraphId: dto.paragraphID,
    priority: dto.priority,
    cadence: dto.cadence?.length ? dto.cadence.map(item => convertCadenceFormDtoToModel(item)) : [],
    score: dto.score,
    sentences: dto.sentences?.length ? dto.sentences.map(item => convertSentenceDtoToModel(item)) : [],
    startedAt: dto.startedAt,
    startDateTime: dto.startDateTime,
    status: dto.status,
    unpleasantness: dto.unpleasantness,
  };
}

export function convertParagraphInstanceDtoToModel(dto: ParagraphDto): ParagraphInstance {
  return {
    assignedTo: dto.assignedTo,
    assignedToUser: dto.assignedToUser,
    derivedEffort: dto.derivedEffort,
    id: dto._id,
    lexicon: dto.lexicon,
    movability: dto.movability,
    name: dto.name,
    paragraphId: dto.paragraphID,
    priority: dto.priority,
    cadence: dto.cadence?.length ? dto.cadence.map(item => convertCadenceFormDtoToModel(item)) : [],
    score: dto.score,
    sentences: dto.sentences?.length ? dto.sentences.map(item => convertSentenceDtoToModel(item)) : [],
    startedAt: dto.startedAt,
    startDateTime: dto.startDateTime,
    status: dto.status,
    unpleasantness: dto.unpleasantness,
  };
}
