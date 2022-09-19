import {InventoryItem} from 'src/app/core/model/inventory-item';
import {Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TaskRuleTrigger} from '../../../../core/model/task-rule-trigger';
import {Task} from '../../../../core/model/task';
import {DecisionTable} from '../../../../core/model/decision-table';
import {NounRuleTrigger} from '../../../../core/model/noun-rule-trigger';

@Component({
  selector: 'plan-triggers-list',
  templateUrl: './plan-triggers-list.component.html',
  styleUrls: ['./plan-triggers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggersListComponent implements OnChanges {
  @Input()
  taskRuleTriggers: TaskRuleTrigger[];

  @Input()
  nounRuleTriggers: NounRuleTrigger[];

  @Input()
  activePlan: DecisionTable;

  @Input()
  tasks: Task[];

  @Input()
  nouns: InventoryItem[];

  planTaskTriggers: TaskRuleTrigger[];
  planNounTriggers: NounRuleTrigger[];
  isOpened: boolean = true;
  emptyTriggers: boolean;
  tasksMap: Record<string, Task>;
  nounsMap: Record<string, InventoryItem>;
  hoveredItem: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.activePlan && this.taskRuleTriggers && this.nounRuleTriggers && this.tasks) {
      this.tasksMap = this.tasks.reduce((map: Record<string, Task>, obj) => ((map[obj.id] = obj), map), {});
      this.findTriggers();
      this.isOpened = true;
    }
    if (changes.nouns && this.nouns) {
      this.nounsMap = this.nouns.reduce(
        (map: Record<string, InventoryItem>, obj) => ((map[obj.subcategory] = obj), map),
        {}
      );
    }
  }

  findTriggers(): void {
    this.planTaskTriggers = this.taskRuleTriggers.filter(t => t.ruleId === this.activePlan.id);
    this.planNounTriggers = this.nounRuleTriggers.filter(t => t.ruleId === this.activePlan.id);
    this.emptyTriggers = this.planNounTriggers.length > 0 || this.planTaskTriggers.length > 0 ? false : true;
  }

  changePanel(): void {
    this.isOpened = !this.isOpened;
  }

  hoverEnter(item: NounRuleTrigger | TaskRuleTrigger): void {
    this.hoveredItem = item.id;
  }

  hoverLeave(): void {
    this.hoveredItem = '';
  }

  public triggerItemClick(e: Event) {
    e.stopPropagation();
  }

  trackByDisplayName(index: number, n: NounRuleTrigger): string {
    return n.displayName;
  }

  trackById(index: number, t: TaskRuleTrigger): string {
    return t.id;
  }
}
