import {Params} from '@angular/router';
import {SearchParams} from '../../../core/model/search/search-params';
import {Task, TaskFull} from '../../../core/model/task';

export function filterTasksBySearchParamsPagination(
  tasks: Task[],
  searchParams: SearchParams,
  queryParams: Params
): Task[] {
  const paginationFrom = queryParams?.paginationFrom || 0;
  const paginationTo = queryParams?.paginationTo || 20;
  return filterTasksBySearchParams(tasks, searchParams).slice(paginationFrom, paginationTo);
}

export function filterTasksBySearchParams(tasks: Task[], searchParams: SearchParams): Task[] {
  const {text, chapterIds, sortDirection, empty} = searchParams || {};
  const filteredTasks = (tasks || [])
    .filter(task => !text || task.shortTask?.toLowerCase().includes(text.toLowerCase()))
    .filter(task => !chapterIds?.length || chapterIds.every(chapterId => task.chapterIds?.includes(chapterId)))
    .filter(task => !empty || (!task.conditionCount && !task.triggerCount));

  const sortField = searchParams?.sortField || 'shortTask';

  // tslint:disable-next-line:no-any
  return filteredTasks.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (Number.isInteger(a[sortField]) && Number.isInteger(b[sortField])) {
      return (a[sortField] - b[sortField]) * (sortDirection === 'desc' ? -1 : 1);
    } else {
      return String(a[sortField] || '').localeCompare(String(b[sortField] || '')) * (sortDirection === 'desc' ? -1 : 1);
    }
  });
}

export function filterTasksTableBySearchParams(tasks: TaskFull[], queryParams: Params): TaskFull[] {
  const {shortTask, category, effort, location, priority, movability, abandon} = queryParams || {};
  const filteredTasks = (tasks || [])
    .filter(task => !shortTask || task.shortTask?.toLowerCase().includes(shortTask.toLowerCase()))
    .filter(task => !category || task.category?.toLowerCase().includes(category.toLowerCase()))
    .filter(task => !effort || task.effort === parseInt(effort))
    .filter(task => !location || task.location?.toLowerCase().includes(location.toLowerCase()))
    .filter(task => !priority || task.priority === parseInt(priority))
    .filter(task => !movability || task.movability === parseInt(movability))
    .filter(task => !abandon || task.abandon === (abandon === 'Yes'));
  return filteredTasks;
}
