import {Paragraph} from 'src/app/core/model/paragraph';
import {Role} from 'src/app/core/model/role';
import {User} from 'src/app/core/model/user';
import {TaskForm} from '../../../core/model/form/task-form';
import {Sentence} from '../../../core/model/sentence';

export function convertTaskToTaskForm(paragraph: Paragraph, users?: User[], roles?: Role[]): TaskForm {
  return (
    paragraph && {
      name: paragraph.name,
      skedTemplateIds: [],
      effort: countEffortFromSentences(paragraph.sentences),
      priority: paragraph.priority,
      movability: paragraph.movability,
      instructions: paragraph.instructions,
      roles: convertRoleIdToRoleName(paragraph.assignedTo, roles),
      users: convertUserIdToUserName(paragraph.assignedToUser, users),
      category: paragraph.category,
      location: paragraph.location,
      chapterIds: [],
      upPoints: paragraph.unpleasantness,
    }
  );
}

function convertUserIdToUserName(currentUsers: string[], allUsers: User[]): string[] {
  return allUsers.filter(user => currentUsers.includes(user.id)).map(u => u.userName);
}

function convertRoleIdToRoleName(currentRoles: string[], allRoles: Role[]): string[] {
  return allRoles.filter(role => currentRoles.includes(role.id)).map(u => u.displayName);
}

function countEffortFromSentences(sentences: Sentence[]): number {
  return sentences?.reduce((result, sentence) => result + +sentence.effort, 0) || 0;
}

// function convertChaperIdToChapterName(currentChapters: string[], allChapters: Chapter[]): string[] {
//   return allChapters.filter(user => currentChapters.includes(user.id)).map(u => u.name);
// }
