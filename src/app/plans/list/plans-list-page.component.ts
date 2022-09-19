import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, withLatestFrom} from 'rxjs/operators';
import {MobileService} from 'src/app/core/page/mobile.service';
import {selectRouterUrl} from '../../core/store/router/router.selector';
import {GetAllDecisionTablesAction} from 'src/app/core/store/decision-tables/decision-tables.action';
import {GetUnitOfMeasuresAction} from 'src/app/core/store/unit-of-measures/unit-of-measures.action';
import {
  selectAllUnitOfMeasures,
  selectUnitOfMeasuresLoading,
} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {GetAllNounRuleTriggersAction} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.action';
import {GetAllTaskRuleTriggersAction} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.action';
import {GetAllRuleSchedulesAction} from 'src/app/core/store/rule-schedules/rule-schedules.action';
import {GetTasksAction} from 'src/app/core/store/tasks/tasks.action';
import {
  selectAllDecisionTables,
  selectDecisionTablesLoading,
  selectFilteredDecisionTables,
} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {
  selectAllNounRuleTriggers,
  selectNounRuleTriggersLoading,
} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {
  selectAllTaskRuleTriggers,
  selectTaskRuleTriggersLoading,
} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {
  selectAllRuleSchedules,
  selectRuleSchedulesLoading,
} from 'src/app/core/store/rule-schedules/rule-schedules.selector';
import {selectAllTasks} from 'src/app/core/store/tasks/tasks.selector';
import {DecisionTable} from '../../core/model/decision-table';
import {Task} from '../../core/model/task';
import {UnitOfMeasure} from '../../core/model/unit-of-measure';
import {TitleService} from '../../core/page/title.service';
import {GetAllChaptersAction} from '../../core/store/chapters/chapters.action';
import {Chapter} from '../../core/model/chapter';
import {selectAllChapters} from '../../core/store/chapters/chapters.selector';
import {RuleSchedule} from '../../core/model/rule-schedule';
import {NounRuleTrigger} from '../../core/model/noun-rule-trigger';
import {TaskRuleTrigger} from '../../core/model/task-rule-trigger';

@Component({
  selector: 'plans-list-page',
  templateUrl: './plans-list-page.component.html',
  styleUrls: ['./plans-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansListPageComponent implements OnInit, OnDestroy {
  public mobile$: Observable<boolean>;
  public chapters$: Observable<Chapter[]>;

  private subscriptions = new Subscription();

  plans$: Observable<DecisionTable[]>;
  loadingPlans$: Observable<boolean>;
  loadingNounRuleTriggers$: Observable<boolean>;
  loadingTaskRuleTriggers$: Observable<boolean>;
  loadingRuleSchedules$: Observable<boolean>;
  nounRuleTriggers$: Observable<NounRuleTrigger[]>;
  taskRuleTriggers$: Observable<TaskRuleTrigger[]>;
  tasks$: Observable<Task[]>;
  unitOfMeasures$: Observable<UnitOfMeasure[]>;
  loadingUnitOfMeasures$: Observable<boolean>;
  ruleSchedules$: Observable<RuleSchedule[]>;
  filteredPlans$: Observable<DecisionTable[]>;
  plans: DecisionTable[];

  constructor(
    private store$: Store<{}>,
    private router: Router,
    private mobileService: MobileService,
    private titleService: TitleService
  ) {}

  public ngOnInit(): void {
    this.titleService.setPageTitle('Plans');

    this.mobile$ = this.mobileService.observeMobile();
    this.subscriptions.add(this.subscribeToMobileAndUrl());
    this.store$.dispatch(new GetAllDecisionTablesAction({}));
    this.store$.dispatch(new GetAllNounRuleTriggersAction({}));
    this.store$.dispatch(new GetAllTaskRuleTriggersAction({}));
    this.store$.dispatch(new GetAllRuleSchedulesAction({}));
    this.store$.dispatch(new GetUnitOfMeasuresAction({}));
    this.store$.dispatch(new GetTasksAction({force: true}));
    this.store$.dispatch(new GetAllChaptersAction({}));

    this.chapters$ = this.store$.pipe(select(selectAllChapters));
    this.loadingPlans$ = this.store$.pipe(select(selectDecisionTablesLoading));
    this.loadingNounRuleTriggers$ = this.store$.pipe(select(selectNounRuleTriggersLoading));
    this.loadingTaskRuleTriggers$ = this.store$.pipe(select(selectTaskRuleTriggersLoading));
    this.loadingRuleSchedules$ = this.store$.pipe(select(selectRuleSchedulesLoading));
    this.loadingUnitOfMeasures$ = this.store$.pipe(select(selectUnitOfMeasuresLoading));
    this.plans$ = this.store$.pipe(select(selectAllDecisionTables));
    this.nounRuleTriggers$ = this.store$.pipe(select(selectAllNounRuleTriggers));
    this.taskRuleTriggers$ = this.store$.pipe(select(selectAllTaskRuleTriggers));
    this.unitOfMeasures$ = this.store$.pipe(select(selectAllUnitOfMeasures));
    this.ruleSchedules$ = this.store$.pipe(select(selectAllRuleSchedules));
    this.tasks$ = this.store$.pipe(select(selectAllTasks));
    this.filteredPlans$ = this.store$.pipe(select(selectFilteredDecisionTables));
  }

  private subscribeToMobileAndUrl(): Subscription {
    return this.mobile$
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(
          this.store$.pipe(
            select(selectRouterUrl),
            filter(routerUrl => !!routerUrl)
          )
        )
      )
      .subscribe(([mobile, routerUrl]) => {
        if (!mobile && routerUrl.startsWith('/plans/search')) {
          this.router.navigate(['/plans'], {queryParamsHandling: 'preserve'});
        }
        if (mobile && !routerUrl.startsWith('/plans/search')) {
          this.router.navigate(['/plans/search'], {queryParamsHandling: 'preserve'});
        }
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
