import {createSelector} from '@ngrx/store';
import {AppState} from '../app-state';

export const selectProjectBuilderState = (state: AppState) => state.projectBuilder;

export const selectProjectBuilderType = createSelector(selectProjectBuilderState, state => state.type);

export const selectProjectBuilderTabIndex = createSelector(selectProjectBuilderState, state => state.tabIndex);

export const selectProjectBuilderProjectTemplates = createSelector(
  selectProjectBuilderState,
  state => state.projectTemplates
);

export const selectProjectBuilderCurrentProject = createSelector(
  selectProjectBuilderState,
  state => state.currentProject
);

export const selectProjectBuilderTaskTemplates = createSelector(
  selectProjectBuilderState,
  state => state.taskTemplates
);

export const selectUnsavedProjectChanges = createSelector(selectProjectBuilderState, state => state.hasUnsavedChanges);

export const selectSaveInProgress = createSelector(selectProjectBuilderState, state => state.saveInProgress);
