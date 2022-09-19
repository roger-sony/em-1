import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, filter, map, mergeMap, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {FieldValuesDto} from '../../api/dto/field-values.dto';
import {ParagraphDto} from '../../api/dto/paragraph.dto';
import {TaskDto} from '../../api/dto/task.dto';
import {SearchApiService} from '../../api/search-api.service';
import {TaskApiService} from '../../api/task-api.service';
import {convertFieldValuesDtoToModel} from '../../api/utils/convert-field-values-dto-to-model';
import {convertParagraphInstanceDtoToModel} from '../../api/utils/convert-paragraph-dto-to-model';
import {convertTaskDtoToModel} from '../../api/utils/convert-task-dto-to-model';
import {convertTaskModelToDto} from '../../api/utils/convert-task-model-to-dto';
import {Task} from '../../model/task';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  AddTaskToChapterAction,
  AddTaskToChapterSuccessAction,
  CreateTaskAction,
  CreateTaskSuccessAction,
  DeleteTaskAction,
  DeleteTaskSuccessAction,
  GetAllTaskFieldValuesAction,
  GetAllTaskFieldValuesSuccessAction,
  GetTaskInstancesAction,
  GetTaskInstancesSuccessAction,
  GetTasksAction,
  GetTasksSuccessAction,
  RemoveTaskFromChapterAction,
  RemoveTaskFromChapterSuccessAction,
  SetTaskInstancesLoadedAction,
  SetTasksLoadedAction,
  TasksActionType,
  UpdateTaskAction,
  UpdateTaskSuccessAction,
} from './tasks.action';
import {selectTaskById, selectTasksLoaded} from './tasks.selector';

@Injectable()
export class TasksEffects {
  @Effect()
  public get$: Observable<Action> = this.actions$.pipe(
    ofType<GetTasksAction>(TasksActionType.GET),
    withLatestFrom(this.store$.pipe(select(selectTasksLoaded))),
    filter(([action, loaded]) => !loaded || action.payload.force),
    mergeMap(([action]) => {
      const {onSuccess, onFailure} = action.payload;
      return this.taskApiService.getAll().pipe(
        map((dtos: TaskDto[]) => dtos.map(dto => convertTaskDtoToModel(dto))),
        mergeMap(tasks => [
          new GetTasksSuccessAction({tasks}),
          new SetTasksLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, tasks),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getInstances$: Observable<Action> = this.actions$.pipe(
    ofType<GetTaskInstancesAction>(TasksActionType.GET_INSTANCES),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;
      return this.taskApiService.getAllTaskInstances().pipe(
        map((dtos: ParagraphDto[]) => dtos.map(dto => convertParagraphInstanceDtoToModel(dto))),
        mergeMap(taskInstances => [
          new GetTaskInstancesSuccessAction({taskInstances}),
          new SetTaskInstancesLoadedAction({instancesLoaded: true}),
          ...createCallbackActions(onSuccess, []),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getAllFieldValues$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllTaskFieldValuesAction>(TasksActionType.GET_ALL_FIELD_VALUES),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.searchApiService.getAllTaskFieldValues().pipe(
        map((dto: FieldValuesDto) => convertFieldValuesDtoToModel(dto)),
        mergeMap(fieldValues => [
          new GetAllTaskFieldValuesSuccessAction({fieldValues}),
          ...createCallbackActions(onSuccess, fieldValues),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateTaskAction>(TasksActionType.CREATE),
    mergeMap(action => {
      const {task, onSuccess, onFailure} = action.payload;
      const taskDto = convertTaskModelToDto(task);

      return this.taskApiService.create(taskDto).pipe(
        map(dto => convertTaskDtoToModel(dto)),
        mergeMap(createdTask => [
          new CreateTaskSuccessAction({task: createdTask}),
          ...createCallbackActions(onSuccess, createdTask),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateTaskAction>(TasksActionType.UPDATE),
    mergeMap(action => {
      const {taskId, taskChange, onSuccess, onFailure} = action.payload;
      const taskDto = convertTaskModelToDto(taskChange as Task);

      return this.taskApiService.patch(taskId, taskDto).pipe(
        map(dto => convertTaskDtoToModel(dto)),
        mergeMap(task => [new UpdateTaskSuccessAction({task}), ...createCallbackActions(onSuccess, task)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteTaskAction>(TasksActionType.DELETE),
    mergeMap(action => {
      const {taskId, onSuccess, onFailure} = action.payload;

      return this.taskApiService.delete(taskId).pipe(
        mergeMap(() => [new DeleteTaskSuccessAction({taskId}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public addToChapter$: Observable<Action> = this.actions$.pipe(
    ofType<AddTaskToChapterAction>(TasksActionType.ADD_TO_CHAPTER),
    mergeMap(action => {
      const {taskId, chapterId, onSuccess, onFailure} = action.payload;

      return this.store$.pipe(
        select(selectTaskById(taskId)),
        take(1),
        filter(task => !!task),
        map(task => ({
          _chapterIDs: (task.chapterIds || []).filter((id: string) => id !== chapterId).concat(chapterId),
        })),
        switchMap(taskChange => this.taskApiService.patch(taskId, taskChange)),
        map(dto => convertTaskDtoToModel(dto)),
        mergeMap(task => [new AddTaskToChapterSuccessAction({task}), ...createCallbackActions(onSuccess, task)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public removeFromChapter$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveTaskFromChapterAction>(TasksActionType.REMOVE_FROM_CHAPTER),
    mergeMap(action => {
      const {taskId, chapterId, onSuccess, onFailure} = action.payload;

      return this.store$.pipe(
        select(selectTaskById(taskId)),
        take(1),
        filter(task => !!task),
        map(task => ({_chapterIDs: (task.chapterIds || []).filter((id: string) => id !== chapterId)})),
        switchMap(taskChange => this.taskApiService.patch(taskId, taskChange)),
        map(dto => convertTaskDtoToModel(dto)),
        mergeMap(task => [new RemoveTaskFromChapterSuccessAction({task}), ...createCallbackActions(onSuccess, task)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private searchApiService: SearchApiService,
    private taskApiService: TaskApiService,
    private store$: Store<{}>
  ) {}
}
