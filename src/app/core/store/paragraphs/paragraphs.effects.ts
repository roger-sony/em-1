import {Paragraph} from '../../model/paragraph';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {convertParagraphModelToDto} from '../../api/utils/convert-paragraph-model-to-dto';
import {convertParagraphDtoToModel} from '../../api/utils/convert-paragraph-dto-to-model';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {ParagraphDto} from '../../api/dto/paragraph.dto';
import {ParagraphApiService} from '../../api/paragraph-api.service';
import {
  CreateParagraphAction,
  GetParagraphsAction,
  GetParagraphsSuccessAction,
  ParagraphsActionType,
  SetParagraphsLoadedAction,
  UpdateParagraphAction,
  UpdateParagraphSuccessAction,
  CreateParagraphSuccessAction,
  DeleteParagraphAction,
  DeleteParagraphSuccessAction,
  SetParagraphsCountAction,
} from './paragraphs.action';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class ParagraphsEffects {
  @Effect()
  public get$: Observable<Action> = this.actions$.pipe(
    ofType<GetParagraphsAction>(ParagraphsActionType.GET),
    mergeMap(action => {
      const {onSuccess, onFailure, queries} = action.payload || {};

      const params: {[key: string]: string} = {};

      if (queries?.sortField || queries?.sortDirection) {
        params.sortBy = `${queries?.sortField || 'name'} ${queries?.sortDirection || 'asc'}`;
      }

      if (queries?.search) {
        params.name = `${queries.search}`;
      }

      if (queries?.hideDisabled) {
        params.active = 'true';
      }

      return this.paragraphApiService.getAll(new HttpParams({fromObject: params})).pipe(
        map((dtos: ParagraphDto[]) => dtos.map(dto => convertParagraphDtoToModel(dto))),
        mergeMap(paragraphs => [
          new GetParagraphsSuccessAction({paragraphs}),
          new SetParagraphsCountAction({paragraphsCount: paragraphs.length}),
          new SetParagraphsLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, paragraphs),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  // @Effect()
  // public getInstances$: Observable<Action> = this.actions$.pipe(
  //   ofType<GetTaskInstancesAction>(ParagraphsActionType.GET_INSTANCES),
  //   mergeMap(action => {
  //     const {onSuccess, onFailure} = action.payload;
  //     return this.taskApiService.getAllTaskInstances().pipe(
  //       map((dtos: TaskInstanceDto[]) => dtos.map(dto => convertTaskInstanceDtoToModel(dto))),
  //       mergeMap(taskInstances => [
  //         new GetTaskInstancesSuccessAction({taskInstances}),
  //         new SetTaskInstancesLoadedAction({instancesLoaded: true}),
  //         ...createCallbackActions(onSuccess, taskInstances),
  //       ]),
  //       catchError(error => emitErrorActions(error, onFailure))
  //     );
  //   })
  // );

  // @Effect()
  // public getAllFieldValues$: Observable<Action> = this.actions$.pipe(
  //   ofType<GetAllTaskFieldValuesAction>(ParagraphsActionType.GET_ALL_FIELD_VALUES),
  //   mergeMap(action => {
  //     const {onSuccess, onFailure} = action.payload;

  //     return this.searchApiService.getAllTaskFieldValues().pipe(
  //       map((dto: FieldValuesDto) => convertFieldValuesDtoToModel(dto)),
  //       mergeMap(fieldValues => [
  //         new GetAllTaskFieldValuesSuccessAction({fieldValues}),
  //         ...createCallbackActions(onSuccess, fieldValues),
  //       ]),
  //       catchError(error => emitErrorActions(error, onFailure))
  //     );
  //   })
  // );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateParagraphAction>(ParagraphsActionType.CREATE),
    mergeMap(action => {
      const {paragraph, onSuccess, onFailure} = action.payload;
      const paragraphDto = convertParagraphModelToDto(paragraph);

      return this.paragraphApiService.create(paragraphDto).pipe(
        map(dto => convertParagraphDtoToModel(dto)),
        mergeMap(createdParagraph => [
          new CreateParagraphSuccessAction({paragraph: createdParagraph}),
          ...createCallbackActions(onSuccess, createdParagraph),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateParagraphAction>(ParagraphsActionType.UPDATE),
    mergeMap(action => {
      const {paragraphId, paragraphChange, edited, onSuccess, onFailure} = action.payload;
      const paragraphDto = convertParagraphModelToDto(paragraphChange as Paragraph);

      return this.paragraphApiService.put(paragraphId, paragraphDto, edited).pipe(
        map(dto => convertParagraphDtoToModel(dto)),
        mergeMap(paragraph => [
          new UpdateParagraphSuccessAction({paragraph}),
          ...createCallbackActions(onSuccess, paragraph),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteParagraphAction>(ParagraphsActionType.DELETE),
    mergeMap(action => {
      const {paragraphId, onSuccess, onFailure} = action.payload;

      return this.paragraphApiService.delete(paragraphId).pipe(
        mergeMap(() => [new DeleteParagraphSuccessAction({paragraphId}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  // @Effect()
  // public addToChapter$: Observable<Action> = this.actions$.pipe(
  //   ofType<AddTaskToChapterAction>(ParagraphsActionType.ADD_TO_CHAPTER),
  //   mergeMap(action => {
  //     const {taskId, chapterId, onSuccess, onFailure} = action.payload;

  //     return this.store$.pipe(
  //       select(selectTaskById(taskId)),
  //       take(1),
  //       filter(task => !!task),
  //       map(task => ({
  //         _chapterIDs: (task.chapterIds || []).filter((id: string) => id !== chapterId).concat(chapterId),
  //       })),
  //       switchMap(taskChange => this.taskApiService.patch(taskId, taskChange)),
  //       map(dto => convertTaskDtoToModel(dto)),
  //       mergeMap(task => [new AddTaskToChapterSuccessAction({task}), ...createCallbackActions(onSuccess, task)]),
  //       catchError(error => emitErrorActions(error, onFailure))
  //     );
  //   })
  // );

  // @Effect()
  // public removeFromChapter$: Observable<Action> = this.actions$.pipe(
  //   ofType<RemoveTaskFromChapterAction>(ParagraphsActionType.REMOVE_FROM_CHAPTER),
  //   mergeMap(action => {
  //     const {taskId, chapterId, onSuccess, onFailure} = action.payload;

  //     return this.store$.pipe(
  //       select(selectTaskById(taskId)),
  //       take(1),
  //       filter(task => !!task),
  //       map(task => ({_chapterIDs: (task.chapterIds || []).filter((id: string) => id !== chapterId)})),
  //       switchMap(taskChange => this.taskApiService.patch(taskId, taskChange)),
  //       map(dto => convertTaskDtoToModel(dto)),
  //       mergeMap(task => [new RemoveTaskFromChapterSuccessAction({task}), ...createCallbackActions(onSuccess, task)]),
  //       catchError(error => emitErrorActions(error, onFailure))
  //     );
  //   })
  // );

  constructor(
    private actions$: Actions,
    // private searchApiService: SearchApiService,
    private paragraphApiService: ParagraphApiService // private store$: Store<{}>
  ) {}
}
