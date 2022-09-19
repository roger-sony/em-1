import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FactFilter} from 'src/app/core/model/fact-filter';

@Component({
  selector: 'condition-statement',
  templateUrl: './condition-statement.component.html',
  styleUrls: ['./condition-statement.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionStatementComponent {
  @Input()
  public fact: FactFilter;
}
