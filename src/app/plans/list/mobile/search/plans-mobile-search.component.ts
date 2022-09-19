import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {selectDecisionTablesLoading} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {selectNounRuleTriggersLoading} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectTaskRuleTriggersLoading} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectRuleSchedulesLoading} from 'src/app/core/store/rule-schedules/rule-schedules.selector';
import {selectAllDecisionTables} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {selectAllNounRuleTriggers} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectAllTaskRuleTriggers} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectAllRuleSchedules} from 'src/app/core/store/rule-schedules/rule-schedules.selector';
import {selectAllTasks} from 'src/app/core/store/tasks/tasks.selector';
import {
  selectAllUnitOfMeasures,
  selectUnitOfMeasuresLoading,
} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {Chapter} from '../../../../core/model/chapter';
import {selectAllChapters} from '../../../../core/store/chapters/chapters.selector';
import {NounRuleTrigger} from '../../../../core/model/noun-rule-trigger';
import {TaskRuleTrigger} from '../../../../core/model/task-rule-trigger';
import {RuleSchedule} from '../../../../core/model/rule-schedule';

@Component({
  selector: 'plans-mobile-search',
  templateUrl: './plans-mobile-search.component.html',
  styleUrls: ['./plans-mobile-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansMobileSearchComponent implements OnInit {
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
  filteredPlans: DecisionTable[];
  plans: DecisionTable[];
  emptyCards: number[];

  public chapters$: Observable<Chapter[]>;

  constructor(private activatedRoute: ActivatedRoute, private store$: Store<{}>) {
    this.emptyCards = Array(20).fill(0);
  }

  ngOnInit(): void {
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
    this.filteredPlans$ = this.observeQueryParamChanges();
    this.chapters$ = this.store$.pipe(select(selectAllChapters));
  }

  private observeQueryParamChanges(): Observable<DecisionTable[]> {
    return combineLatest([this.activatedRoute.queryParams, this.plans$]).pipe(
      map(([param, plans]) => {
        if (param.search) {
          return plans.filter(p => p.displayName.toLowerCase().includes(param.search.toLowerCase()));
        } else {
          return plans;
        }
      })
    );
  }
}
