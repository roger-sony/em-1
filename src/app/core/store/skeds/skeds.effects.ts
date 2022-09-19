import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {SkedApiService} from '../../api/sked-api.service';
import {
  CreateSkedTemplateAction,
  CreateSkedTemplateSuccessAction,
  DeleteSkedTemplateAction,
  DeleteSkedTemplateSuccessAction,
  GetAllSkedTemplatesAction,
  GetAllSkedTemplatesSuccessAction,
  GetSingleSkedTemplateAction,
  GetSingleSkedTemplateSuccessAction,
  ReinstantiateWeekSuccessAction,
  SkedsActionType,
  UpdateSkedTemplateAction,
  UpdateSkedTemplateSuccessAction,
} from './skeds.action';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {FlexSkedTemplateDto} from '../../api/dto/flex-sked-template.dto';
import {convertFlexSkedTemplateDtoToModel} from '../../api/utils/convert-flex-sked-template-dto-to-model';
import {convertFlexSkedTemplateModelToDto} from '../../api/utils/convert-flex-sked-template-model-to-dto';

@Injectable()
export class SkedsEffects {
  @Effect()
  public getAllTemplates$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllSkedTemplatesAction>(SkedsActionType.GET_ALL_TEMPLATES),
    mergeMap(action => {
      const {empty, onSuccess, onFailure, sort, sortDir} = action.payload;
      const params: {[key: string]: string | string[]} = {};

      if (empty) {
        params.empty = `${empty}`;
      }
      if (sort) {
        params.sort = `${sort} ${sortDir || 'asc'}`;
      }

      return this.skedApiService.getAllTemplates(params).pipe(
        map((dtos: FlexSkedTemplateDto[]) => dtos.map(dto => convertFlexSkedTemplateDtoToModel(dto))),
        mergeMap(skedTemplates => [
          new GetAllSkedTemplatesSuccessAction({skedTemplates}),
          ...createCallbackActions(onSuccess, skedTemplates),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getSingleTemplate$: Observable<Action> = this.actions$.pipe(
    ofType<GetSingleSkedTemplateAction>(SkedsActionType.GET_SINGLE_TEMPLATE),
    mergeMap(action => {
      const {templateId, onSuccess, onFailure} = action.payload;

      return this.skedApiService.getSingleTemplate(templateId).pipe(
        map((dto: FlexSkedTemplateDto) => convertFlexSkedTemplateDtoToModel(dto)),
        mergeMap(skedTemplate => [
          new GetSingleSkedTemplateSuccessAction({skedTemplate}),
          ...createCallbackActions(onSuccess, skedTemplate),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public createTemplate$: Observable<Action> = this.actions$.pipe(
    ofType<CreateSkedTemplateAction>(SkedsActionType.CREATE_TEMPLATE),
    mergeMap(action => {
      const {skedTemplate, onSuccess, onFailure} = action.payload;
      const skedTemplateDto = convertFlexSkedTemplateModelToDto(skedTemplate);

      return this.skedApiService.createTemplate(skedTemplateDto).pipe(
        map(dto => convertFlexSkedTemplateDtoToModel(dto)),
        mergeMap(template => [
          new CreateSkedTemplateSuccessAction({skedTemplate: template}),
          ...createCallbackActions(onSuccess, template),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public updateTemplate$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateSkedTemplateAction>(SkedsActionType.UPDATE_TEMPLATE),
    mergeMap(action => {
      const {skedId, skedTemplate, onSuccess, onFailure} = action.payload;
      const skedTemplateDto = convertFlexSkedTemplateModelToDto(skedTemplate);

      return this.skedApiService.updateTemplate(skedId, skedTemplateDto).pipe(
        map(dto => convertFlexSkedTemplateDtoToModel(dto)),
        mergeMap(template => [
          new UpdateSkedTemplateSuccessAction({skedTemplate: template}),
          ...createCallbackActions(onSuccess, template),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public deleteTemplate$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteSkedTemplateAction>(SkedsActionType.DELETE_TEMPLATE),
    mergeMap(action => {
      const {skedTemplateId, onSuccess, onFailure} = action.payload;

      return this.skedApiService.deleteTemplate(skedTemplateId).pipe(
        mergeMap(skedTemplate => [
          new DeleteSkedTemplateSuccessAction({skedTemplateId}),
          ...createCallbackActions(onSuccess, skedTemplate),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public reinstantiateWeek$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllSkedTemplatesAction>(SkedsActionType.REINSTANTIATE_WEEK),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.skedApiService.reinstantiateWeek().pipe(
        mergeMap(res => [new ReinstantiateWeekSuccessAction({}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  constructor(private actions$: Actions, private skedApiService: SkedApiService) {}
}
