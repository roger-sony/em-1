import {createSelector} from '@ngrx/store';
import {
  filterTasksBySearchParams,
  filterTasksBySearchParamsPagination,
} from '../../../shared/utils/task/filter-tasks-by-search-params';
// import {addUsersAndRolesToTask} from '../../../shared/utils/task/add-users-and-roles-to-task';
import {AppState} from '../app-state';
import {selectSearchParams} from '../router/router.selector';
import {tasksAdapter} from './tasks.state';

export const selectTasksState = (state: AppState) => state.tasks;

export const selectCustomRouterState = (state: AppState) => state.router;
export const selectRouterState = createSelector(selectCustomRouterState, state => state && state.state);
export const selectRouterQueryParams = createSelector(selectRouterState, state => (state && state.queryParams) || {});

export const selectAllTasks = createSelector(selectTasksState, tasksAdapter.getSelectors().selectAll);

// export const selectAllTasksForTable = createSelector(
//   selectAllTasks,
//   selectAllUsers,
//   selectAllRoles,
//   (tasks, users, roles) => addUsersAndRolesToTask(tasks, users, roles)
// );

// export const selectFilteredTasksTable = createSelector(
//   selectAllTasksForTable,
//   selectRouterQueryParams,
//   (tasks, queryParams) => filterTasksTableBySearchParams(tasks, queryParams)
// );

export const selectTaskInstances = createSelector(selectTasksState, state => state.taskInstances);

export const selectTasksMap = createSelector(selectTasksState, tasksAdapter.getSelectors().selectEntities);

export const selectTaskById = (id: string) => createSelector(selectTasksMap, tasksMap => tasksMap[id]);

export const selectTasksByChapter = (chapterId: string) =>
  createSelector(selectAllTasks, tasks => tasks.filter(task => task.chapterIds?.includes(chapterId)));

export const selectFilteredTasks = createSelector(selectAllTasks, selectSearchParams, (tasks, searchParams) =>
  filterTasksBySearchParams(tasks, searchParams)
);

export const selectFilteredTasksPagination = createSelector(
  selectAllTasks,
  selectSearchParams,
  selectRouterQueryParams,
  (tasks, searchParams, queryParams) => filterTasksBySearchParamsPagination(tasks, searchParams, queryParams)
);

export const selectTaskFieldValues = createSelector(selectTasksState, state => state.fieldValues);
export const selectTaskFieldValue = (fieldName: string) =>
  createSelector(selectTaskFieldValues, fieldValues => (fieldValues || {})[fieldName]);

export const selectStoredTaskRuleTriggers = createSelector(selectTasksState, state => state.taskRuleTriggers);

export const selectStoredFacts = createSelector(selectTasksState, state => state.facts);

export const selectStoredSubtasks = createSelector(selectTasksState, state => state.subtasks);

export const selectTasksLoaded = createSelector(selectTasksState, state => state.loaded);

export const selectTasksLoading = createSelector(selectTasksLoaded, loaded => !loaded);
