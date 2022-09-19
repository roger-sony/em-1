import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {Chapter} from 'src/app/core/model/chapter';
import {DecisionTable} from 'src/app/core/model/decision-table';

@Component({
  selector: 'plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansListComponent {
  @Input()
  public chapterId: string;

  @Input()
  public chapters: Chapter[];

  @Input()
  public plans: DecisionTable[];

  @Input()
  public selectedPlanId: string;

  @Output()
  public selectedPlanIdChange = new EventEmitter<string>();

  public onCardClick(plan: DecisionTable) {
    this.selectedPlanIdChange.emit(plan.id);
  }

  public trackByPlan(index: number, plan: DecisionTable): string {
    return plan.id;
  }
}
