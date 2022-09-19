import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {catchError, filter, map, mergeMap, take, tap} from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {convertCadenceFormToRuleSchedule} from '../../../shared/utils/plans/convert-cadence-form-to-rule-schedule';
import {DecisionTableApiService} from '../../api/decision-table-api.service';
import {DecisionTablePreviewDto} from '../../api/dto/decision-table-preview.dto';
import {DecisionTableDto} from '../../api/dto/decision-table.dto';
import {convertDecisionTableDtoToModel} from '../../api/utils/convert-decision-table-dto-to-model';
import {convertDecisionTableModelToDto} from '../../api/utils/convert-decision-table-model-to-dto';
import {convertDecisionTablePreviewDtoToModel} from '../../api/utils/convert-decision-table-preview-dto-to-model';
import {convertDecisionTablePreviewModelToDto} from '../../api/utils/convert-decision-table-preview-model-to-dto';
import {DecisionTable} from '../../model/decision-table';
import {TriggerFormType} from '../../model/form/trigger-form-type';
import {CreateNounRuleTriggerAction} from '../noun-rule-triggers/noun-rule-triggers.action';
import {CreateRuleScheduleAction} from '../rule-schedules/rule-schedules.action';
import {createCallbackActions, emitErrorActions} from '../store.utils';
import {CreateTaskRuleTriggerAction} from '../task-rule-triggers/task-rule-triggers.action';
import {
  AddDecisionTableReportAction,
  AddDecisionTableToChapterAction,
  CreateDecisionTableAction,
  CreateDecisionTableSuccessAction,
  CreateDecisionTableWithTriggersAction,
  DecisionTablesActionType,
  DeleteDecisionTableAction,
  DeleteDecisionTableSuccessAction,
  DownloadExcelFileAction,
  GetAllDecisionTablesAction,
  GetAllDecisionTablesSuccessAction,
  GetDecisionTablePreviewAction,
  GetDecisionTablePreviewSuccessAction,
  GetSingleDecisionTableAction,
  GetSingleDecisionTableSuccessAction,
  PatchDecisionTableAction,
  RemoveDecisionTableFromChapterAction,
  RunDecisionTableRuleAction,
  SetDecisionTablesLoadedAction,
  UpdateDecisionTableAction,
  UpdateDecisionTableSuccessAction,
} from './decision-tables.action';
import {selectDecisionTableById} from './decision-tables.selector';
import {convertDecisionTableChangeModelToDto} from '../../api/utils/convert-decision-table-change-model-to-dto';

@Injectable()
export class DecisionTablesEffects {
  @Effect()
  public getAll$: Observable<Action> = this.actions$.pipe(
    ofType<GetAllDecisionTablesAction>(DecisionTablesActionType.GET_ALL),
    mergeMap(action => {
      const {onSuccess, onFailure} = action.payload;

      return this.decisionTableApiService.getAll().pipe(
        map((dtos: DecisionTableDto[]) => dtos.map(dto => convertDecisionTableDtoToModel(dto))),
        mergeMap(decisionTables => [
          new GetAllDecisionTablesSuccessAction({decisionTables}),
          new SetDecisionTablesLoadedAction({loaded: true}),
          ...createCallbackActions(onSuccess, decisionTables),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getSingle$: Observable<Action> = this.actions$.pipe(
    ofType<GetSingleDecisionTableAction>(DecisionTablesActionType.GET_SINGLE),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.decisionTableApiService.getById(id).pipe(
        map((dto: DecisionTableDto) => convertDecisionTableDtoToModel(dto)),
        mergeMap(decisionTable => [
          new GetSingleDecisionTableSuccessAction({decisionTable}),
          ...createCallbackActions(onSuccess, decisionTable),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public getPreview$: Observable<Action> = this.actions$.pipe(
    ofType<GetDecisionTablePreviewAction>(DecisionTablesActionType.GET_PREVIEW),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.decisionTableApiService
        .runOnDemand(id, {preview: true, triggerActions: false, saveReport: false})
        .pipe(
          map((dto: DecisionTablePreviewDto) => convertDecisionTablePreviewDtoToModel(dto)),
          mergeMap(preview => [
            new GetDecisionTablePreviewSuccessAction({preview}),
            ...createCallbackActions(onSuccess, preview),
          ]),
          catchError(error => emitErrorActions(error, onFailure))
        );
    })
  );

  @Effect()
  public addReport$: Observable<Action> = this.actions$.pipe(
    ofType<AddDecisionTableReportAction>(DecisionTablesActionType.ADD_REPORT),
    mergeMap(action => {
      const {preview, onSuccess, onFailure} = action.payload;
      const dtoChange = convertDecisionTablePreviewModelToDto(preview);

      return this.decisionTableApiService.addReport(dtoChange).pipe(
        mergeMap(() => [...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public createWithTriggers$: Observable<Action> = this.actions$.pipe(
    ofType<CreateDecisionTableWithTriggersAction>(DecisionTablesActionType.CREATE_WITH_TRIGGERS),
    map(action => {
      const {planForm, cadenceForm, triggerForm, onSuccess, onFailure} = action.payload;

      const createTrigger = (decisionTable: DecisionTable) => {
        if (
          !triggerForm ||
          ((!triggerForm.noun || !triggerForm.noun.id) && (!triggerForm.task || !triggerForm.task.id))
        ) {
          onSuccess(decisionTable);
          return;
        }

        if (triggerForm.type === TriggerFormType.Noun) {
          this.store$.dispatch(
            new CreateNounRuleTriggerAction({
              trigger: {
                ruleId: decisionTable.id,
                nounSubcategory: triggerForm.noun.displayName,
                saveReport: triggerForm.saveReport,
                triggerActions: triggerForm.triggerActions,
              },
              onSuccess: () => onSuccess(decisionTable),
              onFailure,
            })
          );
        } else {
          this.store$.dispatch(
            new CreateTaskRuleTriggerAction({
              trigger: {
                ruleId: decisionTable.id,
                taskId: triggerForm.task.id,
                taskEvent: triggerForm.task.event,
                saveReport: triggerForm.saveReport,
                triggerActions: triggerForm.triggerActions,
              },
              onSuccess: () => onSuccess(decisionTable),
              onFailure,
            })
          );
        }
      };

      const createCadence = (decisionTable: DecisionTable) => {
        const ruleSchedule = convertCadenceFormToRuleSchedule(cadenceForm);
        if (!ruleSchedule) {
          createTrigger(decisionTable);
          return;
        }

        this.store$.dispatch(
          new CreateRuleScheduleAction({
            ruleSchedule: {
              ...ruleSchedule,
              ruleId: decisionTable.id,
              saveReport: cadenceForm?.saveReport ?? triggerForm?.saveReport,
              triggerActions: cadenceForm?.triggerActions ?? triggerForm?.triggerActions,
            },
            onSuccess: () => {
              createTrigger(decisionTable);
            },
            onFailure,
          })
        );
      };

      return new CreateDecisionTableAction({
        decisionTable: {
          displayName: planForm.name,
          facts: [],
          rules: [],
        },
        onSuccess: decisionTable => createCadence(decisionTable),
        onFailure,
      });
    })
  );

  @Effect()
  public create$: Observable<Action> = this.actions$.pipe(
    ofType<CreateDecisionTableAction>(DecisionTablesActionType.CREATE),
    mergeMap(action => {
      const {decisionTable, onSuccess, onFailure} = action.payload;
      const dto = convertDecisionTableModelToDto(decisionTable);

      return this.decisionTableApiService.create(dto).pipe(
        map((createdDto: DecisionTableDto) => convertDecisionTableDtoToModel(createdDto)),
        mergeMap(createdDecisionTable => [
          new CreateDecisionTableSuccessAction({decisionTable: createdDecisionTable}),
          ...createCallbackActions(onSuccess, createdDecisionTable),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public update$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateDecisionTableAction>(DecisionTablesActionType.UPDATE),
    mergeMap(action => {
      const {decisionTable, onSuccess, onFailure} = action.payload;
      const dto = convertDecisionTableModelToDto(decisionTable);

      return this.decisionTableApiService.update(dto).pipe(
        map((updatedDto: DecisionTableDto) => convertDecisionTableDtoToModel(updatedDto)),
        mergeMap(updatedDecisionTable => [
          new UpdateDecisionTableSuccessAction({decisionTable: updatedDecisionTable}),
          ...createCallbackActions(onSuccess, updatedDecisionTable),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public patch$: Observable<Action> = this.actions$.pipe(
    ofType<PatchDecisionTableAction>(DecisionTablesActionType.PATCH),
    mergeMap(action => {
      const {decisionTableId, decisionTableChange, onSuccess, onFailure} = action.payload;
      const dto = convertDecisionTableChangeModelToDto(decisionTableChange);

      return this.decisionTableApiService.patch(decisionTableId, dto).pipe(
        map((updatedDto: DecisionTableDto) => convertDecisionTableDtoToModel(updatedDto)),
        mergeMap(updatedDecisionTable => [
          new UpdateDecisionTableSuccessAction({decisionTable: updatedDecisionTable}),
          ...createCallbackActions(onSuccess, updatedDecisionTable),
        ]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public delete$: Observable<Action> = this.actions$.pipe(
    ofType<DeleteDecisionTableAction>(DecisionTablesActionType.DELETE),
    mergeMap(action => {
      const {id, onSuccess, onFailure} = action.payload;

      return this.decisionTableApiService.delete(id).pipe(
        mergeMap(() => [new DeleteDecisionTableSuccessAction({id}), ...createCallbackActions(onSuccess)]),
        catchError(error => emitErrorActions(error, onFailure))
      );
    })
  );

  @Effect()
  public addToChapter$: Observable<Action> = this.actions$.pipe(
    ofType<AddDecisionTableToChapterAction>(DecisionTablesActionType.ADD_TO_CHAPTER),
    mergeMap(action => {
      const {decisionTableId, chapterId, onSuccess, onFailure} = action.payload;

      return this.store$.pipe(
        select(selectDecisionTableById(decisionTableId)),
        take(1),
        filter(decisionTable => !!decisionTable),
        map(decisionTable => (decisionTable.chapterIds || []).filter(id => id !== chapterId).concat(chapterId)),
        map(
          chapterIds =>
            new PatchDecisionTableAction({decisionTableId, decisionTableChange: {chapterIds}, onSuccess, onFailure})
        )
      );
    })
  );

  @Effect()
  public removeFromChapter$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveDecisionTableFromChapterAction>(DecisionTablesActionType.REMOVE_FROM_CHAPTER),
    mergeMap(action => {
      const {decisionTableId, chapterId, onSuccess, onFailure} = action.payload;

      return this.store$.pipe(
        select(selectDecisionTableById(decisionTableId)),
        take(1),
        filter(decisionTable => !!decisionTable),
        map(decisionTable => (decisionTable.chapterIds || []).filter(id => id !== chapterId)),
        map(
          chapterIds =>
            new PatchDecisionTableAction({decisionTableId, decisionTableChange: {chapterIds}, onSuccess, onFailure})
        )
      );
    })
  );

  @Effect()
  public runRule$: Observable<Action> = this.actions$.pipe(
    ofType<RunDecisionTableRuleAction>(DecisionTablesActionType.RUN_RULE),
    mergeMap(action => {
      const {decisionTableId, saveReport, triggerActions, onSuccess, onFailure} = action.payload;

      return this.decisionTableApiService
        .runOnDemand(decisionTableId, {preview: false, triggerActions, saveReport})
        .pipe(
          mergeMap(() => createCallbackActions(onSuccess)),
          catchError(error => emitErrorActions(error, onFailure))
        );
    })
  );

  @Effect({dispatch: false})
  public downloadExcelFile$ = this.actions$.pipe(
    ofType<DownloadExcelFileAction>(DecisionTablesActionType.DOWNLOAD_EXCEL_FILE),
    tap(action => {
      const {tableData, name} = action.payload;
      const formattedTableData = tableData.map(row => {
        return {
          noun: row.noun,
          attributes:
            row.attributes.length > 1
              ? row.attributes.map((a, index) => (index === row.attributes.length - 1 ? a : a + ', '))
              : row.attributes[0],
          condition:
            row.conditions.length > 1
              ? row.conditions.map((c, index) =>
                  index === row.attributes.length - 1
                    ? `${c.operation} ${c.value} ${c.uom}`
                    : `${c.operation} ${c.value} ${c.uom}, `
                )
              : `${row.conditions[0].operation} ${row.conditions[0].value} ${row.conditions[0].uom}`,
          measuredValue: row.measuredValue,
          taskTriggered: row.taskTriggered,
          lastUpdate: row.lastUpdate,
          conditionMet: row.conditionMet,
        };
      });
      const fileName = `${name}.xlsx`;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedTableData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, fileName);
    })
  );

  constructor(
    private actions$: Actions,
    private decisionTableApiService: DecisionTableApiService,
    private store$: Store<{}>
  ) {}
}
