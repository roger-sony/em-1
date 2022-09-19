import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ChapterApiService} from '../../api/chapter-api.service';
import {ChapterDto} from '../../api/dto/chapter.dto';
import {convertChapterDtoToModel} from '../../api/utils/convert-chapter-dto-to-model';
import {convertChapterModelToDto} from '../../api/utils/convert-chapter-model-to-dto';
import {convertTaskDtoToModel} from '../../api/utils/convert-task-dto-to-model';
import {Chapter} from '../../model/chapter';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  ChaptersActionType,
  CreateChapterAction,
  CreateChapterSuccessAction,
  DeleteChapterAction,
  DeleteChapterSuccessAction,
  GetAllChaptersAction,
  GetAllChaptersSuccessAction,
  GetChapterTasksAction,
  GetChapterTasksSuccessAction,
  GetSingleChapterAction,
  GetSingleChapterSuccessAction,
  UpdateChapterAction,
  UpdateChapterSuccessAction,
  GetChapterNounsAction,
  GetChapterNounsSuccessAction,
  GetChapterPlansAction,
  GetChapterPlansSuccessAction,
} from './chapters.action';
import {convertInventoryItemDtoToModel} from '../../api/utils/convert-inventory-item-dto-to-model';
import {convertDecisionTableDtoToModel} from '../../api/utils/convert-decision-table-dto-to-model';

@Injectable()
export class ChaptersEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllChaptersAction>(ChaptersActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.chapterApiService.getAll().pipe(
        map((dtos: ChapterDto[]) => dtos.map(dto => convertChapterDtoToModel(dto))),
        mergeMap(chapters => [
          new GetAllChaptersSuccessAction({chapters}),
          ...createCallbackActions(onSuccess, chapters),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getSingle$: Observable<Action> = this.actions$.pipe(
    ofType<GetSingleChapterAction>(ChaptersActionType.GET_SINGLE),
    mergeMap(action => {
      const {chapterId, onSuccess, onFailure} = action.payload;

      return this.chapterApiService.getById(chapterId).pipe(
        map(dto => convertChapterDtoToModel(dto)),
        mergeMap(chapter => [
          new GetSingleChapterSuccessAction({chapter}),
          ...createCallbackActions(onSuccess, chapter),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getTasks$: Observable<Action> = this.actions$.pipe(
    ofType<GetChapterTasksAction>(ChaptersActionType.GET_TASKS),
    mergeMap(action => {
      const {chapterId, onSuccess, onFailure} = action.payload;

      return this.chapterApiService.getTasks(chapterId).pipe(
        map(dtos => dtos?.tasks?.map(dto => convertTaskDtoToModel(dto)) || []),
        mergeMap(tasks => [
          new GetChapterTasksSuccessAction({chapterId, tasks}),
          ...createCallbackActions(onSuccess, tasks),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getNouns$: Observable<Action> = this.actions$.pipe(
    ofType<GetChapterNounsAction>(ChaptersActionType.GET_NOUNS),
    mergeMap(action => {
      const {chapterId, onSuccess, onFailure} = action.payload;

      return this.chapterApiService.getNouns(chapterId).pipe(
        map(dtos => dtos?.map(dto => convertInventoryItemDtoToModel(dto)) || []),
        mergeMap(nouns => [
          new GetChapterNounsSuccessAction({chapterId, nouns}),
          ...createCallbackActions(onSuccess, nouns),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getPlans$: Observable<Action> = this.actions$.pipe(
    ofType<GetChapterPlansAction>(ChaptersActionType.GET_PLANS),
    mergeMap(action => {
      const {chapterId, onSuccess, onFailure} = action.payload;

      return this.chapterApiService.getPlans(chapterId).pipe(
        map(dtos => dtos?.map(dto => convertDecisionTableDtoToModel(dto)) || []),
        mergeMap(plans => [
          new GetChapterPlansSuccessAction({chapterId, plans}),
          ...createCallbackActions(onSuccess, plans),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateChapterAction>(ChaptersActionType.CREATE),
    mergeMap(action => {
      const {chapter, onSuccess, onFailure} = action.payload;
      const chapterDto = convertChapterModelToDto(chapter);

      return this.chapterApiService.create(chapterDto).pipe(
        map(dto => convertChapterDtoToModel(dto)),
        mergeMap(createdChapter => [
          new CreateChapterSuccessAction({chapter: createdChapter}),
          new GetAllChaptersAction({}),
          ...createCallbackActions(onSuccess, createdChapter),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateChapterAction>(ChaptersActionType.UPDATE),
    mergeMap(action => {
      const {chapterId, chapterChange, onSuccess, onFailure} = action.payload;
      const chapterDto = convertChapterModelToDto(chapterChange as Chapter);

      return this.chapterApiService.update(chapterId, chapterDto).pipe(
        map(dto => convertChapterDtoToModel(dto)),
        mergeMap(chapter => [new UpdateChapterSuccessAction({chapter}), ...createCallbackActions(onSuccess, chapter)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteChapterAction>(ChaptersActionType.DELETE),
    mergeMap(action => {
      const {chapterId, onSuccess, onFailure} = action.payload;

      return this.chapterApiService.delete(chapterId).pipe(
        mergeMap(() => [new DeleteChapterSuccessAction({chapterId}), ...createCallbackActions(onSuccess, chapterId)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private chapterApiService: ChapterApiService) {}
}
