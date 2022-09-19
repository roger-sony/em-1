import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {CadenceDisplay} from '../../../../core/model/cadence-display';
import {DecisionTable} from '../../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../../core/model/noun-rule-trigger';
import {RuleSchedule} from '../../../../core/model/rule-schedule';
import {TaskRuleTrigger} from '../../../../core/model/task-rule-trigger';
import {formatRuleSchedule} from '../../../../shared/utils/plans/format-rule-schedule';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {take} from 'rxjs/operators';
import {Chapter} from 'src/app/core/model/chapter';
import {
  AddDecisionTableToChapterAction,
  RemoveDecisionTableFromChapterAction,
} from '../../../../core/store/decision-tables/decision-tables.action';

@Component({
  selector: 'plan-detail-header',
  templateUrl: './plan-detail-header.component.html',
  styleUrls: ['./plan-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailHeaderComponent implements OnInit, OnChanges {
  @Input()
  filteredPlans: DecisionTable[];

  @Input()
  activePlan: DecisionTable;

  @Input()
  nounRuleTriggers: NounRuleTrigger[];

  @Input()
  taskRuleTriggers: TaskRuleTrigger[];

  @Input()
  ruleSchedules: RuleSchedule[];

  @Input()
  tasks: Task[];

  @Input()
  unitOfMeasures: UnitOfMeasure;

  @Input()
  public chapters: Chapter[];

  public cadenceArray: CadenceDisplay[] = [];
  public returnTo$: Observable<string>;

  constructor(private router: Router, private store$: Store<{}>) {}

  ngOnInit() {
    this.returnTo$ = this.store$.pipe(select(selectRouterQueryParam('returnTo')));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.activePlan && this.ruleSchedules) {
      this.ruleScheduleDisplay();
    }
  }

  ruleScheduleDisplay(): void {
    this.cadenceArray = [];
    const ruleSchedule = this.ruleSchedules.filter(r => r.ruleId === this.activePlan.id);
    if (ruleSchedule.length === 0) {
      const cadence = {
        type: 'plans-cal-empty',
        display: 'Set Cadence',
        id: '',
      };
      this.cadenceArray.push(cadence);
      return;
    }
    ruleSchedule.forEach(r => {
      const cadence = {
        type: '',
        display: '',
        id: '',
      };
      if (!r.schedule) {
        cadence.type = 'plan-cadence-onetime';
        cadence.display = moment(r.startDate).format('LL');
        cadence.id = r.id;
      } else if (r.schedule.slice(-1) === 'Z') {
        cadence.type = 'plan-cadence-onetime';
        cadence.display = moment(r.schedule).format('LL');
        cadence.id = r.id;
      } else {
        cadence.type = 'plan-cadence-recurring';
        cadence.display = formatRuleSchedule(r);
        cadence.id = r.id;
      }
      this.cadenceArray.push(cadence);
    });
  }

  public onBack(): void {
    this.returnTo$.pipe(take(1)).subscribe(returnTo => {
      if (returnTo) {
        this.router.navigateByUrl(
          returnTo,
          /* Removed unsupported properties by Angular migration: queryParams, queryParamsHandling. */ {}
        );
      } else {
        this.router.navigate(['plans']);
      }
    });
  }

  public onAddToChapter(chapter: Chapter) {
    this.store$.dispatch(
      new AddDecisionTableToChapterAction({decisionTableId: this.activePlan.id, chapterId: chapter.id})
    );
  }

  public onRemoveFromChapter(chapter: Chapter) {
    this.store$.dispatch(
      new RemoveDecisionTableFromChapterAction({decisionTableId: this.activePlan.id, chapterId: chapter.id})
    );
  }

  trackByType(index: number, c: CadenceDisplay): string {
    return c.type;
  }
}
