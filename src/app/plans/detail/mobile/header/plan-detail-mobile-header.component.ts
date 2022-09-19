import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Router} from '@angular/router';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';

@Component({
  selector: 'plan-detail-mobile-header',
  templateUrl: './plan-detail-mobile-header.component.html',
  styleUrls: ['./plan-detail-mobile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailMobileHeaderComponent implements OnInit {
  @Input()
  public plan: DecisionTable;

  @Input()
  tasks: Task[];

  @Input()
  unitOfMeasures: UnitOfMeasure;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onBack() {
    this.router.navigate(['plans']);
  }
}
