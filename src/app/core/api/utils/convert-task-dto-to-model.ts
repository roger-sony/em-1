import {Task} from '../../model/task';
import {TaskDto} from '../dto/task.dto';
import {convertCadenceFormDtoToModel} from './convert-cadence-form-dto-to-model';
import {convertDecisionTableFactDtoToModel} from './convert-decision-table-dto-to-model';

export function convertTaskDtoToModel(dto: TaskDto): Task {
  return {
    abandon: dto.abandon,
    assignedTo: dto.assignedTo,
    assignedToUser: dto.assignedToUser,
    category: dto.category,
    cadence: dto.cadence?.length ? dto.cadence.map(item => convertCadenceFormDtoToModel(item)) : [],
    checkList: dto.checkList || [],
    displayName: dto.displayName,
    effort: dto.effort || 15,
    facts: dto.ref_fact?.map(fact => convertDecisionTableFactDtoToModel(fact)) || [],
    id: dto._id,
    taskId: dto.taskID,
    instructions: dto.instructions,
    location: dto.location,
    movability: dto.movability,
    priority: dto.priority,
    recipes: dto.recipes,
    shortTask: dto.shortTask,
    subtasks: [],
    unpleasantness: dto.unpleasantness,
    chapterIds: dto._chapterIDs || [],
    conditionCount: dto.conditionCount,
    triggerCount: dto.triggerCount,
    ruleTriggers: dto.ruleTriggers,
  };
}

// export function convertSubtaskDtoToModel(subtaskDto: SentenceDto): Sentence {
//   return (
//     subtaskDto && {
//       verb: subtaskDto.verb,
//       noun: convertSentenceNounDtoToModel(subtaskDto.noun),
//       priority: subtaskDto.priority,
//       movability: subtaskDto.movability,
//       effort: subtaskDto.effort,
//       lexicon: subtaskDto.lexicon,
//       plot: subtaskDto.plot,
//       blkUpdate: subtaskDto.blkUpdate,
//     }
//   );
// }
