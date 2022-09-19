import {Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges} from '@angular/core';
import {ConditionForm} from 'src/app/core/model/condition-form';
import {PlanCondition} from 'src/app/core/model/plan-condition';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {convertTableRuleToConditionForm} from 'src/app/shared/utils/plans/convert-table-rule-to-condition-form';

@Component({
  selector: 'plan-detail-condition-display',
  templateUrl: './plan-detail-condition-display.component.html',
  styleUrls: ['./plan-detail-condition-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailConditionDisplayComponent implements OnChanges {
  @Input()
  public option: PlanCondition;

  @Input()
  public tasks: Task[];

  @Input()
  public unitOfMeasures: UnitOfMeasure;

  @Input()
  public unitOfMeasuresMap: Record<string, UnitOfMeasure>;

  public conditionDisplay: ConditionForm;
  public taskName: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.option && this.option) {
      this.conditionDisplay = convertTableRuleToConditionForm(this.option);
    }
    if ((changes.tasks || changes.option) && this.tasks && this.option) {
      this.taskName = this.tasks.find(task => task.id === this.option.consequence)?.shortTask;
    }
  }
}
