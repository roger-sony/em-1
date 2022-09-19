import {Task} from '../../model/task';
import {TaskDto} from '../dto/task.dto';
import {Sentence} from './../../model/sentence';
import {SentenceDto} from './../dto/sentence.dto';
import {convertCadenceFormModelToDto} from './convert-cadence-form-model-to-dto';
import {convertDecisionTableFactModelToDto} from './convert-decision-table-preview-model-to-dto';
import {convertTaskRuleTriggerModelToDto} from './convert-task-rule-trigger-model-to-dto';
import {convertSentenceNounModelToDto} from './convert-sentence-model-to-dto';

export function convertTaskModelToDto(model: Task): TaskDto {
  return {
    _id: model.id,
    taskID: model.taskId,
    abandon: model.abandon,
    assignedTo: model.assignedTo,
    assignedToUser: model.assignedToUser,
    category: model.category,
    cadence: model.cadence ? model.cadence.map(item => convertCadenceFormModelToDto(item)) : [],
    checkList: model.checkList || [],
    displayName: model.displayName,
    effort: model.effort,
    ref_fact: model.facts?.map(fact => convertDecisionTableFactModelToDto(fact)) || [],
    instructions: model.instructions,
    location: model.location,
    movability: model.movability,
    priority: model.priority,
    recipes: model.recipes,
    shortTask: model.shortTask,
    //TODO: Variable name
    // subtasks: model.subtasks?.map(subtask => convertSubtaskModelToDto(subtask)) || [],
    subtasks: model.subtasks?.map(subtask => convertSubtaskModelToDto(subtask)) || [],
    unpleasantness: model.unpleasantness,
    _chapterIDs: model.chapterIds || [],
    ruleTriggers: model.ruleTriggers?.map(trigger => convertTaskRuleTriggerModelToDto(trigger)),
    conditionCount: model.conditionCount,
    triggerCount: model.triggerCount,
  };
}

export function convertSubtaskModelToDto(model: Sentence): SentenceDto {
  return (
    model && {
      verb: model.verb,
      noun: convertSentenceNounModelToDto(model.noun),
      priority: model.priority,
      movability: model.movability,
      effort: model.effort,
      lexicon: model.lexicon,
      plot: model.plot,
      blkUpdate: model.blkUpdate,
    }
  );
}

//TODO: Variable name
// export function convertSubtaskModelToDto(model: Subtask): SubtaskDto {
//   return (
//     model && {
//       config_name: model.configName,
//       fact_filter: model.factFilters,
//       verb: model.verb,
//     }
//   );
// }
