import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DecisionTable} from '../../../../../core/model/decision-table';
import {CadenceDisplay} from '../../../../../core/model/cadence-display';
import {Chapter} from '../../../../../core/model/chapter';

@Component({
  selector: 'plan-card-content',
  templateUrl: './plan-card-content.component.html',
  styleUrls: ['./plan-card-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardContentComponent implements OnChanges {
  @Input()
  plan: DecisionTable;

  @Input()
  triggerCount: number;

  @Input()
  cadenceArray: CadenceDisplay[];

  @Input()
  public chapters: Chapter[];

  conditionCount: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.plan) {
      this.conditionDisplayCount();
    }
  }

  conditionDisplayCount(): void {
    const facts = this.plan?.facts?.length || 0;
    let rules = 0;
    this.plan?.rules.forEach(r => {
      if (r.factFilters) {
        rules += r.factFilters.length;
      }
    });
    this.conditionCount = facts + rules;
  }
}
