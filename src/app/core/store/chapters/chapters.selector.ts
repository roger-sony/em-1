import {createSelector} from '@ngrx/store';
import {filterTasksBySearchParams} from '../../../shared/utils/task/filter-tasks-by-search-params';
import {filterNounsBySearchParams} from '../../../shared/utils/nouns/filter-nouns-by-search-params';
import {filterPlansBySearchParams} from '../../../shared/utils/plans/filter-plans-by-search-params';
import {filterChaptersBySearchParams} from '../../../shared/utils/chapter/filter-chapters-by-search-params';
import {filterNounActivityByParams} from '../../../shared/utils/chapter/filter-noun-activity-by-params';
import {filterTaskActivityByParams} from '../../../shared/utils/chapter/filter-task-activity-by-params';
import {AppState} from '../app-state';
import {selectSearchParams, selectRouterQueryParam} from '../router/router.selector';
import {chaptersAdapter} from './chapters.state';

export const selectChaptersState = (state: AppState) => state.chapters;

export const selectAllChapters = createSelector(selectChaptersState, chaptersAdapter.getSelectors().selectAll);

export const selectChaptersMap = createSelector(selectChaptersState, chaptersAdapter.getSelectors().selectEntities);

export const selectChapterById = (id: string) => createSelector(selectChaptersMap, chaptersMap => chaptersMap[id]);

export const selectChaptersLoaded = createSelector(selectChaptersState, state => state.loaded);

export const selectChaptersTasksMap = createSelector(selectChaptersState, state => state.tasksMap);
export const selectChapterTasks = (chapterId: string) =>
  createSelector(selectChaptersTasksMap, tasksMap => tasksMap[chapterId] || []);
export const selectFilteredChapterTasks = (chapterId: string) =>
  createSelector(selectChapterTasks(chapterId), selectSearchParams, (tasks, searchParams) =>
    filterTasksBySearchParams(tasks, searchParams)
  );

export const selectChaptersNounsMap = createSelector(selectChaptersState, state => state.nounsMap);
export const selectChapterNouns = (chapterId: string) =>
  createSelector(selectChaptersNounsMap, nounsMap => nounsMap[chapterId] || []);
export const selectFilteredChapterNouns = (chapterId: string) =>
  createSelector(selectChapterNouns(chapterId), selectSearchParams, (nouns, searchParams) =>
    filterNounsBySearchParams(nouns, searchParams)
  );

export const selectChaptersPlansMap = createSelector(selectChaptersState, state => state.plansMap);
export const selectChapterPlans = (chapterId: string) =>
  createSelector(selectChaptersPlansMap, plansMap => plansMap[chapterId] || []);
export const selectFilteredChapterPlans = (chapterId: string) =>
  createSelector(selectChapterPlans(chapterId), selectSearchParams, (plans, searchParams) =>
    filterPlansBySearchParams(plans, searchParams)
  );

export const selectFilteredNounActivity = (chapterId: string) =>
  createSelector(selectChapterById(chapterId), selectRouterQueryParam('dateRange'), (chapter, dateString) =>
    filterNounActivityByParams(chapter?.nounActivity, dateString)
  );

export const selectFilteredTaskActivity = (chapterId: string) =>
  createSelector(
    selectChapterById(chapterId),
    selectRouterQueryParam('dateRange'),
    selectRouterQueryParam('activityFilter'),
    (chapter, dateString, filterString) => filterTaskActivityByParams(chapter?.taskActivity, dateString, filterString)
  );

export const selectFilteredChapters = createSelector(selectAllChapters, selectSearchParams, (chapters, searchParams) =>
  filterChaptersBySearchParams(chapters, searchParams)
);
