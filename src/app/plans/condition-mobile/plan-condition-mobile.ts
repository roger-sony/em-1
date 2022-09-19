import {Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {selectRouterParam, selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {Router} from '@angular/router';
import {Observable, BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {take, switchMap} from 'rxjs/operators';
import {FieldValues} from 'src/app/core/model/field-values';
import {selectFieldValues} from 'src/app/core/store/inventory/inventory.selector';
import {selectAllTasks} from 'src/app/core/store/tasks/tasks.selector';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {selectUnitOfMeasureByNounSubcategory} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {GetUnitOfMeasuresAction} from 'src/app/core/store/unit-of-measures/unit-of-measures.action';
import {GetTasksAction} from 'src/app/core/store/tasks/tasks.action';
import {GetAllFieldValuesAction} from 'src/app/core/store/inventory/inventory.action';
import {RuleForm} from '../shared/rule-form/rule-form';
import {areFactsEqual} from 'src/app/shared/utils/plans/are-facts-equal';
import {DecisionTableRule, DecisionTableFact, DecisionTable} from 'src/app/core/model/decision-table';
import {areRulesEqual} from 'src/app/shared/utils/plans/are-rules-equal';
import {
  GetAllDecisionTablesAction,
  UpdateDecisionTableAction,
} from 'src/app/core/store/decision-tables/decision-tables.action';
import {selectDecisionTableByIdFromUrl} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {RuleFormComponent} from '../shared/rule-form/rule-form.component';
import {TitleService} from '../../core/page/title.service';

@Component({
  selector: 'plan-condition-mobile',
  templateUrl: './plan-condition-mobile.html',
  styleUrls: ['./plan-condition-mobile.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanConditionMobileComponent implements OnInit, OnDestroy {
  public planId$: Observable<string>;
  public nounId$: Observable<string>;
  public nounName$: Observable<string>;
  public index$: Observable<number>;
  public global$: Observable<boolean>;
  public fieldValues$: Observable<FieldValues>;
  public tasks$: Observable<Task[]>;
  public unitOfMeasure$: Observable<UnitOfMeasure>;
  public plan$: Observable<DecisionTable>;

  public valid$ = new BehaviorSubject(true);

  public index: number;
  public filteredFacts: DecisionTableFact[] = [];

  @ViewChild(RuleFormComponent)
  public ruleForm: RuleFormComponent;

  private subscriptions = new Subscription();

  constructor(private router: Router, private store$: Store<{}>, private titleService: TitleService) {}

  public ngOnInit(): void {
    this.subscriptions.add(this.titleService.subscribeToPlanPageTitle('New Condition'));

    this.store$.dispatch(new GetUnitOfMeasuresAction({}));
    this.store$.dispatch(new GetTasksAction({}));
    this.store$.dispatch(new GetAllFieldValuesAction({}));
    this.store$.dispatch(new GetAllDecisionTablesAction({}));
    this.planId$ = this.store$.pipe(select(selectRouterParam('planId')));
    this.nounId$ = this.store$.pipe(select(selectRouterQueryParam('id')));
    this.nounName$ = this.store$.pipe(select(selectRouterQueryParam('name')));
    this.global$ = this.store$.pipe(select(selectRouterQueryParam('global')));
    this.index$ = this.store$.pipe(select(selectRouterQueryParam('index')));
    this.fieldValues$ = this.store$.pipe(select(selectFieldValues));
    this.tasks$ = this.store$.pipe(select(selectAllTasks));
    this.unitOfMeasure$ = this.nounName$.pipe(
      switchMap(name => this.store$.pipe(select(selectUnitOfMeasureByNounSubcategory(name))))
    );
    this.plan$ = this.store$.pipe(select(selectDecisionTableByIdFromUrl));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onBackClick() {
    this.planId$.pipe(take(1)).subscribe(planId => {
      this.router.navigate(['plans', planId]);
    });
  }

  public onSaveClick() {
    this.ruleForm.onSaveClick();
  }

  public onFormValidityChange(value: boolean) {
    this.valid$.next(value);
  }

  public onRuleFormSave(ruleForm: RuleForm) {
    this.global$.pipe(take(1)).subscribe(global => {
      if (global) {
        this.updateDecisionTableFact(ruleForm);
      } else {
        this.updateDecisionTableRule(ruleForm);
      }
    });
  }

  private updateDecisionTableFact(ruleForm: RuleForm) {
    combineLatest([this.plan$, this.index$])
      .pipe(take(1))
      .subscribe(([plan, index]) => {
        const filteredFacts = plan.facts.filter(fact => fact.name !== '__v');

        const [newFact] = ruleForm.facts;

        const facts = [...filteredFacts];

        if (index || index === 0) {
          const [oldFact] = facts.splice(index, 1, newFact);

          if (areFactsEqual(newFact, oldFact)) {
            this.router.navigate(['plans', plan.id]);
            return;
          }
        } else {
          facts.push(newFact);
        }

        const decisionTable = {...plan, facts};
        this.updateDecisionTable(decisionTable);
      });
  }

  private updateDecisionTableRule(ruleForm: RuleForm) {
    combineLatest([this.plan$, this.nounName$, this.index$])
      .pipe(take(1))
      .subscribe(([plan, nounName, index]) => {
        const newRule: DecisionTableRule = {
          factFilters: ruleForm.facts,
          consequence: ruleForm.consequence,
          sked: ruleForm.sked,
          configName: nounName,
        };

        const rules = [...plan.rules];

        if (index || index === 0) {
          const [oldRule] = rules.splice(index, 1, newRule);

          if (areRulesEqual(newRule, oldRule)) {
            this.router.navigate(['plans', plan.id]);
            return;
          }
        } else {
          rules.push(newRule);
        }

        const decisionTable = {...plan, rules};
        this.updateDecisionTable(decisionTable);
      });
  }

  private updateDecisionTable(decisionTable: DecisionTable) {
    this.store$.dispatch(
      new UpdateDecisionTableAction({
        decisionTable,
        onSuccess: () => {
          this.router.navigate(['plans', decisionTable.id]);
        },
      })
    );
  }
}
