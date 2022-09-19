import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {DecisionTable} from 'src/app/core/model/decision-table';

@Component({
  selector: 'plan-detail-mobile-conditions',
  templateUrl: './plan-detail-mobile-conditions.component.html',
  styleUrls: ['./plan-detail-mobile-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailMobileConditionsComponent implements OnInit {
  @Input()
  public plan: DecisionTable;

  @Input()
  public search: string;

  constructor() {}

  ngOnInit(): void {}
}
