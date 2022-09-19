import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DecisionTableFact, DecisionTableRule} from '../../../../../../../core/model/decision-table';
import {FactFilter} from '../../../../../../../core/model/fact-filter';
import {Task} from '../../../../../../../core/model/task';
import {UnitOfMeasure} from '../../../../../../../core/model/unit-of-measure';

@Component({
  selector: 'plan-condition-view',
  templateUrl: './plan-condition-view.component.html',
  styleUrls: ['./plan-condition-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanConditionViewComponent implements OnChanges {
  @Input()
  public fact: DecisionTableFact;

  @Input()
  public rule: DecisionTableRule;

  @Input()
  public id: number;

  @Input()
  public tasks: Task[];

  @Input()
  public unitOfMeasure: UnitOfMeasure;

  @Output()
  public edit = new EventEmitter();

  @Output()
  public delete = new EventEmitter();

  hoveredItem: number;

  public facts: FactFilter[] = [];
  public taskName = '';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.fact && this.fact) {
      this.facts = [this.fact];
    }
    if (changes.rule && this.rule) {
      this.facts = this.rule.factFilters;
    }
    if ((changes.tasks || changes.rule) && this.tasks && this.rule) {
      this.taskName = this.tasks.find(task => task.id === this.rule.consequence)?.shortTask;
    }
  }

  public onEdit() {
    this.edit.emit();
  }

  public onDelete() {
    this.delete.emit();
  }
}
