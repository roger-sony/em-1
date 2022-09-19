import {NounDto, NounFromServiceDto} from '../dto/noun.dto';

export function convertNounDtoToModel(dto: NounFromServiceDto): NounDto {
  return {
    active: dto.active,
    adjectives: dto.adjectives,
    batchID: dto.batchID,
    chapterIDs: dto.chapterIDs,
    createdAt: dto.createdAt,
    createdBy: dto.createdBy,
    id: dto['_id'],
    name: dto.name,
    updatedAt: dto.updatedAt,
    version: dto['__v'],
  };
}
