import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DecisionTable, DecisionTableFact, DecisionTableRule} from '../../../../../../../core/model/decision-table';
import {FieldValues} from '../../../../../../../core/model/field-values';
import {Task} from '../../../../../../../core/model/task';
import {UnitOfMeasure} from '../../../../../../../core/model/unit-of-measure';
import {areFactsEqual} from '../../../../../../../shared/utils/plans/are-facts-equal';
import {areRulesEqual} from '../../../../../../../shared/utils/plans/are-rules-equal';
import {RuleForm} from '../../../../../../shared/rule-form/rule-form';

@Component({
  selector: 'plan-noun-condition-edit',
  templateUrl: './plan-condition-edit.component.html',
  styleUrls: ['./plan-condition-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanConditionEditComponent implements OnChanges {
  @Input()
  public fieldValues: FieldValues;

  @Input()
  public global: boolean;

  @Input()
  public index: number;

  @Input()
  public mobile: boolean;

  @Input()
  public nounName: string;

  @Input()
  public plan: DecisionTable;

  @Input()
  public tasks: Task[];

  @Input()
  public unitOfMeasure: UnitOfMeasure;

  @Output()
  public planChange = new EventEmitter<DecisionTable>();

  @Output()
  public close = new EventEmitter();

  public filteredFacts: DecisionTableFact[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.plan && this.plan) {
      this.filteredFacts = this.plan.facts.filter(fact => fact.name !== '__v');
    }
  }

  public onSave(ruleForm: RuleForm) {
    if (this.global) {
      this.updateDecisionTableFact(ruleForm);
    } else {
      this.updateDecisionTableRule(ruleForm);
    }
  }

  private updateDecisionTableFact(ruleForm: RuleForm) {
    const [newFact] = ruleForm.facts;

    const facts = [...this.filteredFacts];

    if (this.index || this.index === 0) {
      const [oldFact] = facts.splice(this.index, 1, newFact);

      if (areFactsEqual(newFact, oldFact)) {
        this.close.emit();
        return;
      }
    } else {
      facts.push(newFact);
    }

    const decisionTable = {...this.plan, facts};
    this.planChange.emit(decisionTable);
  }

  private updateDecisionTableRule(ruleForm: RuleForm) {
    const newRule: DecisionTableRule = {
      factFilters: ruleForm.facts,
      consequence: ruleForm.consequence,
      sked: ruleForm.sked,
      configName: this.nounName,
    };

    const rules = [...this.plan.rules];

    if (this.index || this.index === 0) {
      const [oldRule] = rules.splice(this.index, 1, newRule);

      if (areRulesEqual(newRule, oldRule)) {
        this.close.emit();
        return;
      }
    } else {
      rules.push(newRule);
    }

    const decisionTable = {...this.plan, rules};
    this.planChange.emit(decisionTable);
  }

  public onCancel() {
    this.close.emit();
  }
}
