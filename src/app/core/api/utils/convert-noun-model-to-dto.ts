import {NounDto, NounFromServiceDto} from '../dto/noun.dto';

export function convertNounModelToDto(model: NounDto): NounFromServiceDto {
  return {
    active: model.active,
    adjectives: model.adjectives,
    batchID: model.batchID,
    chapterIDs: model.chapterIDs,
    createdAt: model.createdAt,
    createdBy: model.createdBy,
    _id: model.id,
    name: model.name,
    updatedAt: model.updatedAt,
    __v: model.version,
  };
}
