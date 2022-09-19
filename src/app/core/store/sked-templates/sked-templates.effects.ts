import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {SkedTemplateDto} from '../../api/dto/sked-template.dto';
import {SkedTemplateApiService} from '../../api/sked-template-api.service';
import {convertSkedTemplateDtoToModel} from '../../api/utils/convert-sked-template-dto-to-model';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {
  GetAllSkedTemplatesAction,
  GetAllSkedTemplatesSuccessAction,
  SkedTemplatesActionType,
} from './sked-templates.action';

@Injectable()
export class SkedTemplatesEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllSkedTemplatesAction>(SkedTemplatesActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.skedTemplateApiService.getAll().pipe(
        map((dtos: SkedTemplateDto[]) => dtos.map(dto => convertSkedTemplateDtoToModel(dto))),
        mergeMap(skedTemplates => [
          new GetAllSkedTemplatesSuccessAction({skedTemplates}),
          ...createCallbackActions(onSuccess, skedTemplates),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private skedTemplateApiService: SkedTemplateApiService) {}
}
