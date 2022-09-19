import {Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {DecisionTable} from '../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../core/model/noun-rule-trigger';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {Task} from '../../../core/model/task';
import {TaskRuleTrigger} from '../../../core/model/task-rule-trigger';
import {UnitOfMeasure} from '../../../core/model/unit-of-measure';

@Component({
  selector: 'plan-detail-mobile',
  templateUrl: './plan-detail-mobile.component.html',
  styleUrls: ['./plan-detail-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailMobileComponent implements OnInit, OnChanges {
  @Input()
  filteredPlans: DecisionTable[];

  @Input()
  public nounsSearch: string;

  @Input()
  activePlan: DecisionTable;

  @Input()
  nounRuleTriggers: NounRuleTrigger[];

  @Input()
  taskRuleTriggers: TaskRuleTrigger[];

  @Input()
  ruleSchedules: RuleSchedule[];

  @Input()
  unitOfMeasures: UnitOfMeasure;

  @Input()
  tasks: Task[];

  @Input()
  loadingPlans: boolean;

  @Input()
  loadingNounRuleTriggers: boolean;

  @Input()
  loadingTaskRuleTriggers: boolean;

  @Input()
  loadingRuleSchedules: boolean;

  @Input()
  loadingUnitOfMeasures: boolean;

  @Input()
  loadingTasks: boolean;

  public planId$: Observable<Params>;

  public planTaskTriggers: TaskRuleTrigger[];
  public planNounTriggers: NounRuleTrigger[];
  public planRuleSchedule: RuleSchedule;

  constructor(private store$: Store<{}>) {}

  ngOnInit(): void {
    this.planId$ = this.store$.pipe(select(selectRouterParam('planId')));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes.activePlan || changes.taskRuleTriggers || changes.nounRuleTriggers) &&
      this.activePlan &&
      this.taskRuleTriggers &&
      this.nounRuleTriggers
    ) {
      this.planTaskTriggers = this.taskRuleTriggers.filter(t => t.ruleId === this.activePlan.id);
      this.planNounTriggers = this.nounRuleTriggers.filter(t => t.ruleId === this.activePlan.id);
    }
    if ((changes.activePlan || changes.ruleSchedules) && this.activePlan && this.ruleSchedules) {
      this.planRuleSchedule = this.ruleSchedules.find(r => r.ruleId === this.activePlan.id);
    }
  }
}
