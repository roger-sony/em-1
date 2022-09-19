import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action, select, Store} from '@ngrx/store';
import {delay, mergeMap, withLatestFrom} from 'rxjs/operators';
import {createCallbackActions} from '../store.utils';
import {
  CreateProjectAction,
  CreateProjectSuccessAction,
  CreateTaskAction,
  CreateTaskSuccessAction,
  GetAllProjectsAction,
  GetAllProjectsSuccessAction,
  SaveCurrentProjectAction,
  SaveCurrentProjectSuccessAction,
  ProjectBuilderActionType,
  SetSaveInProgressAction,
  SortProjectTemplatesAction,
  SortProjectTemplatesSuccessAction,
} from './project-builder.action';
import {selectProjectBuilderProjectTemplates, selectUnsavedProjectChanges} from './project-builder.selectors';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {UnsavedChangesConfirmComponent} from './unsaved-changes-confirm/unsaved-changes-confirm.component';

@Injectable()
export class ProjectBuilderEffects {
  @Effect()
  sortProjectTemplates$: Observable<Action> = this.actions$.pipe(
    ofType<SortProjectTemplatesAction>(ProjectBuilderActionType.SORT_PROJECT_TEMPLATES),
    withLatestFrom(this.store$.pipe(select(selectProjectBuilderProjectTemplates))),
    mergeMap(([, templates]) => {
      const sortedTemplates = templates.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      return [new SortProjectTemplatesSuccessAction({projectTemplates: sortedTemplates})];
    })
  );

  @Effect()
  createProject$: Observable<Action> = this.actions$.pipe(
    ofType<CreateProjectAction>(ProjectBuilderActionType.CREATE_PROJECT),
    withLatestFrom(this.store$.pipe(select(selectUnsavedProjectChanges))),
    mergeMap(([action, hasUnsavedChanges]) => {
      const {onSuccess, project} = action.payload;
      if (hasUnsavedChanges) {
        return this.dialog
          .open(UnsavedChangesConfirmComponent, {
            ...new MatDialogConfig(),
          })
          .afterClosed()
          .pipe(
            mergeMap(canContinue => {
              if (canContinue) {
                return [new CreateProjectSuccessAction({project}), ...createCallbackActions(onSuccess)];
              } else {
                return [];
              }
            })
          );
      } else {
        return [new CreateProjectSuccessAction({project}), ...createCallbackActions(onSuccess)];
      }
    })
  );

  @Effect()
  createTask$: Observable<Action> = this.actions$.pipe(
    ofType<CreateTaskAction>(ProjectBuilderActionType.CREATE_TASK),
    mergeMap(action => {
      const {task, onSuccess} = action.payload;
      // return this.projectsService.createProject(project)
      //   .pipe(
      //     mergeMap(() => ([...createCallbackActions(onSuccess)])),
      //   );
      return [...createCallbackActions(onSuccess), new CreateTaskSuccessAction({task})];
    })
  );

  @Effect()
  getAllProjects$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllProjectsAction>(ProjectBuilderActionType.GET_ALL_PROJECTS),
    mergeMap(action => {
      // return this.projectsService.getAll()
      //   .pipe(
      //     mergeMap((result) => ([
      //         ...createCallbackActions(action.payload.onSuccess),
      //         new GetAllProjectsSuccessAction(),
      //       ])
      //     ),
      //   );
      return [...createCallbackActions(action.payload.onSuccess), new GetAllProjectsSuccessAction()];
    })
  );

  @Effect()
  saveCurrentProject$: Observable<Action> = this.actions$.pipe(
    ofType<SaveCurrentProjectAction>(ProjectBuilderActionType.SAVE_CURRENT_PROJECT),
    delay(1500),
    mergeMap(action => {
      // return this.projectsService.saveProject()
      //   .pipe(
      //     mergeMap((result) => ([
      //         ...createCallbackActions(action.payload.onSuccess),
      //         new GetAllProjectsSuccessAction(),
      //       ])
      //     ),
      //   );
      return [
        new SetSaveInProgressAction({saveInProgress: false}),
        new SaveCurrentProjectSuccessAction({project: action.payload.project}),
      ];
    })
  );

  constructor(private actions$: Actions, private store$: Store, private dialog: MatDialog) {}
}
