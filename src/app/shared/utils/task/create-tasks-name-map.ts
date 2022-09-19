import {Task} from '../../../core/model/task';

export function createTasksNameMap(tasks: Task[]): Record<string, Task> {
  return (tasks || []).reduce((tasksMap: Record<string, Task>, task) => {
    tasksMap[task.shortTask] = task;
    return tasksMap;
  }, {});
}
