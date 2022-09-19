import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlanCondition} from 'src/app/core/model/plan-condition';

@Component({
  selector: 'plan-detail-collapsible-list-item',
  templateUrl: './plan-detail-collapsible-list-item.component.html',
  styleUrls: ['./plan-detail-collapsible-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailCollapsibleListItemComponent implements OnInit {
  @Input()
  public option: PlanCondition;

  @Input()
  public iconName: string;

  constructor() {}

  ngOnInit(): void {}
}
