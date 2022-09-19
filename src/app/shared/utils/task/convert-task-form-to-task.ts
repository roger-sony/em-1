import {ChecklistItem} from 'src/app/core/model/checklist-item';
import {Paragraph} from 'src/app/core/model/paragraph';
import {Role} from 'src/app/core/model/role';
import {User} from 'src/app/core/model/user';
import {TaskForm} from '../../../core/model/form/task-form';
import {Sentence} from '../../../core/model/sentence';

export function convertTaskFormToTask(
  taskForm: TaskForm,
  users?: User[],
  roles?: Role[],
  checkList?: ChecklistItem[],
  paragraph?: Paragraph
): Paragraph {
  return (
    taskForm && {
      ...paragraph,
      derivedEffort: countEffortFromSentences(paragraph.sentences),
      name: taskForm.name.trim(),
      priority: taskForm.priority,
      movability: taskForm.movability,
      instructions: taskForm.instructions,
      assignedTo: convertRoleNameToRoleId(taskForm.roles, roles),
      assignedToUser: convertUserNameToUserId(taskForm.users, users),
      category: taskForm.category,
      location: taskForm.location,
      unpleasantness: taskForm.upPoints,
      checkList: checkList ? checkList : paragraph?.checkList || [], // TODO
    }
  );
}

function convertUserNameToUserId(currentUsers: string[], allUsers: User[]): string[] {
  return allUsers.filter(user => currentUsers.includes(user.userName)).map(u => u.id);
}

function convertRoleNameToRoleId(currentRoles: string[], allRoles: Role[]): string[] {
  return allRoles.filter(role => currentRoles.includes(role.displayName)).map(u => u.id);
}

function countEffortFromSentences(sentences: Sentence[]): number {
  return sentences?.reduce((result, sentence) => result + +sentence.effort, 0) || 0;
}

// function convertChapterNameToChapterId(currentChapters: string[], allChapters: Chapter[]): string[] {
//   return allChapters.filter(chapter => currentChapters.includes(chapter.name)).map(u => u.id);
// }
