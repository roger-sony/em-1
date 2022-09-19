import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DecisionTable} from '../../../../core/model/decision-table';

@Component({
  selector: 'plan-nouns-toolbar',
  templateUrl: './plan-nouns-toolbar.component.html',
  styleUrls: ['./plan-nouns-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounsToolbarComponent {
  @Input()
  public plan: DecisionTable;

  @Input()
  public productionEnvironment: boolean;
}
