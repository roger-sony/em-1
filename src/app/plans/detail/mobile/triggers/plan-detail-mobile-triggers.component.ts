import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NounRuleTrigger} from 'src/app/core/model/noun-rule-trigger';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';
import {Task} from 'src/app/core/model/task';

@Component({
  selector: 'plan-detail-mobile-triggers',
  templateUrl: './plan-detail-mobile-triggers.component.html',
  styleUrls: ['./plan-detail-mobile-triggers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailMobileTriggersComponent implements OnInit, OnChanges {
  @Input()
  public planId: string;

  @Input()
  public nounRuleTriggers: NounRuleTrigger[];

  @Input()
  public taskRuleTriggers: TaskRuleTrigger[];

  @Input()
  public tasks: Task[];

  public isOpened: boolean = true;
  public tasksMap: Record<string, Task>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tasks && this.tasks) {
      this.tasksMap = this.tasks.reduce((map: Record<string, Task>, obj) => ((map[obj.id] = obj), map), {});
    }
  }
}
