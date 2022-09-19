import {DecisionTable} from '../../model/decision-table';
import {DecisionTableDto} from '../dto/decision-table.dto';

export function convertDecisionTableChangeModelToDto(change: Partial<DecisionTable>): Partial<DecisionTableDto> {
  const dto: Partial<DecisionTableDto> = {};

  if (change.chapterIds) {
    dto._chapterIDs = change.chapterIds;
  }

  if (change.displayName) {
    dto.display_name = change.displayName;
  }

  // TODO add more fields if needed

  return dto;
}
