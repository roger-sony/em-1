import {SentencesApiService} from './../../api/sentences-api.service';
import {SentenceDto} from './../../api/dto/sentence.dto';
import {
  GetSentencesAction,
  SentencesActionType,
  GetSentencesSuccessAction,
  SetSentencesLoadedAction,
  CreateSentenceAction,
  CreateSentenceSuccessAction,
  DeleteSentenceAction,
  DeleteSentenceSuccessAction,
} from './sentences.action';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {convertSentenceDtoToModel} from '../../api/utils/convert-sentence-dto-to-model';

@Injectable()
export class SentencesEffects {
  @Effect()
  public get$: Observable<Action> = this.actions$.pipe(
    ofType<GetSentencesAction>(SentencesActionType.GET),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.sentencesApiService.getAll().pipe(
        map((dtos: SentenceDto[]) => dtos.map(dto => convertSentenceDtoToModel(dto))),
        mergeMap(sentences => [
          new GetSentencesSuccessAction({sentences}),
          new SetSentencesLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, sentences),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateSentenceAction>(SentencesActionType.CREATE),
    mergeMap(action => {
      const {sentence, onSuccess, onFailure} = action.payload;

      return this.sentencesApiService.create(sentence).pipe(
        mergeMap(createdSentence => [
          new CreateSentenceSuccessAction({sentence: createdSentence}),
          new GetSentencesAction({}),
          ...createCallbackActions(onSuccess, createdSentence),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteSentenceAction>(SentencesActionType.DELETE),
    mergeMap(action => {
      const {sentenceId, onSuccess, onFailure} = action.payload;

      return this.sentencesApiService.delete(sentenceId).pipe(
        mergeMap(() => [
          new DeleteSentenceSuccessAction({sentenceId}),
          new GetSentencesAction({}),
          ...createCallbackActions(onSuccess),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private sentencesApiService: SentencesApiService) {}
}
