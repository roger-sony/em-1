import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Adjective} from './../../../../../core/model/adjective';

@Component({
  selector: 'adjective-table-value-cell',
  templateUrl: './adjective-table-value-cell.component.html',
  styleUrls: ['./adjective-table-value-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectiveTableValueCellComponent {
  @Input()
  public adjective: Adjective;
}
