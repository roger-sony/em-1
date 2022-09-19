import {selectAllInventoryItems} from 'src/app/core/store/inventory/inventory.selector';
import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {GetAllDecisionTablesAction} from 'src/app/core/store/decision-tables/decision-tables.action';
import {
  selectAllDecisionTables,
  selectDecisionTableByIdFromUrl,
  selectDecisionTablesBySearchFromUrl,
  selectDecisionTablesLoading,
} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {GetAllNounRuleTriggersAction} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.action';
import {
  selectAllNounRuleTriggers,
  selectNounRuleTriggersLoading,
} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {GetAllRuleSchedulesAction} from 'src/app/core/store/rule-schedules/rule-schedules.action';
import {
  selectAllRuleSchedules,
  selectRuleSchedulesLoading,
} from 'src/app/core/store/rule-schedules/rule-schedules.selector';
import {GetAllTaskRuleTriggersAction} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.action';
import {
  selectAllTaskRuleTriggers,
  selectTaskRuleTriggersLoading,
} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {GetTasksAction} from 'src/app/core/store/tasks/tasks.action';
import {selectAllTasks, selectTasksLoading} from 'src/app/core/store/tasks/tasks.selector';
import {GetUnitOfMeasuresAction} from 'src/app/core/store/unit-of-measures/unit-of-measures.action';
import {
  selectAllUnitOfMeasures,
  selectUnitOfMeasuresLoading,
} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {DecisionTable} from '../../core/model/decision-table';
import {GetAllFieldValuesAction, GetAllInventoryItemsAction} from '../../core/store/inventory/inventory.action';
import {selectRouterQueryParam} from '../../core/store/router/router.selector';
import {MobileService} from 'src/app/core/page/mobile.service';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {Chapter} from '../../core/model/chapter';
import {GetAllChaptersAction} from '../../core/store/chapters/chapters.action';
import {selectAllChapters} from '../../core/store/chapters/chapters.selector';
import {TitleService} from '../../core/page/title.service';
import {NounRuleTrigger} from '../../core/model/noun-rule-trigger';
import {TaskRuleTrigger} from '../../core/model/task-rule-trigger';
import {RuleSchedule} from '../../core/model/rule-schedule';
import {ProductionEnvironmentService} from 'src/app/core/page/production-environment.service';
import {map} from 'rxjs/operators';
import {InventoryItem} from 'src/app/core/model/inventory-item';

@Component({
  selector: 'plan-detail-page',
  templateUrl: './plan-detail-page.component.html',
  styleUrls: ['./plan-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailPageComponent implements OnInit, OnDestroy {
  public mobile$: Observable<boolean>;
  public plans$: Observable<DecisionTable[]>;
  public loadingPlans$: Observable<boolean>;
  public loadingNounRuleTriggers$: Observable<boolean>;
  public loadingTaskRuleTriggers$: Observable<boolean>;
  public loadingRuleSchedules$: Observable<boolean>;
  public nounRuleTriggers$: Observable<NounRuleTrigger[]>;
  public taskRuleTriggers$: Observable<TaskRuleTrigger[]>;
  public ruleSchedules$: Observable<RuleSchedule[]>;
  public unitOfMeasures$: Observable<UnitOfMeasure[]>;
  public unitOfMeasuresMap$: Observable<Record<string, UnitOfMeasure>>;
  public loadingUnitOfMeasures$: Observable<boolean>;
  public loadingTasks$: Observable<boolean>;
  public tasks$: Observable<Task[]>;
  public nouns$: Observable<InventoryItem[]>;
  public filteredPlans$: Observable<DecisionTable[]>;
  public activePlan$: Observable<DecisionTable>;
  public nounsSearch$: Observable<string>;
  public chapters$: Observable<Chapter[]>;

  public productionEnvironment$: Observable<boolean>;

  private subscriptions = new Subscription();

  constructor(
    private mobileService: MobileService,
    private productionEnvironmentService: ProductionEnvironmentService,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.titleService.subscribeToPlanPageTitle());

    this.mobile$ = this.mobileService.observeMobile();
    this.productionEnvironment$ = this.productionEnvironmentService.observeHostname();

    this.store$.dispatch(new GetAllDecisionTablesAction({}));
    this.store$.dispatch(new GetAllNounRuleTriggersAction({}));
    this.store$.dispatch(new GetAllTaskRuleTriggersAction({}));
    this.store$.dispatch(new GetAllRuleSchedulesAction({}));
    this.store$.dispatch(new GetUnitOfMeasuresAction({}));
    this.store$.dispatch(new GetTasksAction({force: true}));
    this.store$.dispatch(new GetAllFieldValuesAction({}));
    this.store$.dispatch(new GetAllChaptersAction({}));
    this.store$.dispatch(new GetAllInventoryItemsAction({}));

    this.plans$ = this.store$.pipe(select(selectAllDecisionTables));
    this.nounRuleTriggers$ = this.store$.pipe(select(selectAllNounRuleTriggers));
    this.taskRuleTriggers$ = this.store$.pipe(select(selectAllTaskRuleTriggers));
    this.ruleSchedules$ = this.store$.pipe(select(selectAllRuleSchedules));
    this.unitOfMeasures$ = this.store$.pipe(select(selectAllUnitOfMeasures));
    this.unitOfMeasuresMap$ = this.observeUnitOfMeasures();
    this.tasks$ = this.store$.pipe(select(selectAllTasks));
    this.nouns$ = this.store$.pipe(select(selectAllInventoryItems));
    this.loadingPlans$ = this.store$.pipe(select(selectDecisionTablesLoading));
    this.loadingNounRuleTriggers$ = this.store$.pipe(select(selectNounRuleTriggersLoading));
    this.loadingTaskRuleTriggers$ = this.store$.pipe(select(selectTaskRuleTriggersLoading));
    this.loadingRuleSchedules$ = this.store$.pipe(select(selectRuleSchedulesLoading));
    this.loadingUnitOfMeasures$ = this.store$.pipe(select(selectUnitOfMeasuresLoading));
    this.loadingTasks$ = this.store$.pipe(select(selectTasksLoading));

    this.nounsSearch$ = this.store$.pipe(select(selectRouterQueryParam('nouns')));
    this.activePlan$ = this.store$.pipe(select(selectDecisionTableByIdFromUrl));
    this.filteredPlans$ = this.store$.pipe(select(selectDecisionTablesBySearchFromUrl));
    this.chapters$ = this.store$.pipe(select(selectAllChapters));
  }

  private observeUnitOfMeasures(): Observable<Record<string, UnitOfMeasure>> {
    return this.unitOfMeasures$.pipe(
      map(uom =>
        uom.reduce((uomMap: Record<string, UnitOfMeasure>, obj) => ((uomMap[obj.nounSubcategory] = obj), uomMap), {})
      )
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
