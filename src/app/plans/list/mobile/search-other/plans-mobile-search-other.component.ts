import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectNounRuleTriggersLoading} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectTaskRuleTriggersLoading} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectRuleSchedulesLoading} from 'src/app/core/store/rule-schedules/rule-schedules.selector';
import {selectAllDecisionTables} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {selectFilteredNounRuleTriggers} from 'src/app/core/store/noun-rule-triggers/noun-rule-triggers.selector';
import {selectFilteredTaskRuleTriggers} from 'src/app/core/store/task-rule-triggers/task-rule-triggers.selector';
import {selectAllRuleSchedules} from 'src/app/core/store/rule-schedules/rule-schedules.selector';
import {selectFilteredTasks} from 'src/app/core/store/tasks/tasks.selector';
import {
  selectAllUnitOfMeasures,
  selectUnitOfMeasuresLoading,
} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {NounRuleTrigger} from 'src/app/core/model/noun-rule-trigger';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';
import {RuleSchedule} from '../../../../core/model/rule-schedule';

@Component({
  selector: 'plans-mobile-search-other',
  templateUrl: './plans-mobile-search-other.component.html',
  styleUrls: ['./plans-mobile-search-other.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansMobileSearchOtherComponent implements OnInit {
  plans$: Observable<DecisionTable[]>;
  loadingPlans$: Observable<boolean>;
  loadingNounRuleTriggers$: Observable<boolean>;
  loadingTaskRuleTriggers$: Observable<boolean>;
  loadingRuleSchedules$: Observable<boolean>;
  filteredNounRuleTriggers$: Observable<NounRuleTrigger[]>;
  filteredTaskRuleTriggers$: Observable<TaskRuleTrigger[]>;
  filteredTasks$: Observable<Task[]>;
  unitOfMeasures$: Observable<UnitOfMeasure[]>;
  loadingUnitOfMeasures$: Observable<boolean>;
  ruleSchedules$: Observable<RuleSchedule[]>;
  plans: DecisionTable[];
  emptyCards: number[];

  constructor(private store$: Store<{}>) {}

  ngOnInit(): void {
    this.loadingNounRuleTriggers$ = this.store$.pipe(select(selectNounRuleTriggersLoading));
    this.loadingTaskRuleTriggers$ = this.store$.pipe(select(selectTaskRuleTriggersLoading));
    this.loadingRuleSchedules$ = this.store$.pipe(select(selectRuleSchedulesLoading));
    this.loadingUnitOfMeasures$ = this.store$.pipe(select(selectUnitOfMeasuresLoading));
    this.plans$ = this.store$.pipe(select(selectAllDecisionTables));
    this.unitOfMeasures$ = this.store$.pipe(select(selectAllUnitOfMeasures));
    this.ruleSchedules$ = this.store$.pipe(select(selectAllRuleSchedules));
    this.filteredNounRuleTriggers$ = this.store$.pipe(select(selectFilteredNounRuleTriggers));
    this.filteredTaskRuleTriggers$ = this.store$.pipe(select(selectFilteredTaskRuleTriggers));
    this.filteredTasks$ = this.store$.pipe(select(selectFilteredTasks));
  }
}
