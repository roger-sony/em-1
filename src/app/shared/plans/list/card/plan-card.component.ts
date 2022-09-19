import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';
import {DecisionTable} from 'src/app/core/model/decision-table';

@Component({
  selector: 'plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardComponent {
  @Input()
  public chapterId: string;

  @Input()
  public chapters: Chapter[];

  @Input()
  public selected: boolean;

  @Input()
  public plan: DecisionTable;
}
