import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';

@Component({
  selector: 'plan-conditions-list',
  templateUrl: './plan-conditions-list.component.html',
  styleUrls: ['./plan-conditions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanConditionsListComponent {
  @Input()
  public plan: DecisionTable;

  @Input()
  public tasks: Task[];

  @Input()
  public unitOfMeasures: UnitOfMeasure;

  @Input()
  public unitOfMeasuresMap: Record<string, UnitOfMeasure>;
}
