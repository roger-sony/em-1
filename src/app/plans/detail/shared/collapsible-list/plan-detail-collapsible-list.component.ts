import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlanCondition} from 'src/app/core/model/plan-condition';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';

@Component({
  selector: 'plan-detail-collapsible-list',
  templateUrl: './plan-detail-collapsible-list.component.html',
  styleUrls: ['./plan-detail-collapsible-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailCollapsibleListComponent implements OnInit {
  @Input()
  public options: PlanCondition[];

  @Input()
  public name: string;

  @Input()
  public tasks: Task[];

  @Input()
  public unitOfMeasures: UnitOfMeasure;

  @Input()
  public unitOfMeasuresMap: Record<string, UnitOfMeasure>;

  @Input()
  public iconName: string;

  public isOpened: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public onHeaderClick() {
    this.isOpened = !this.isOpened;
  }
}
