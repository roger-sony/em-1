import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Router} from '@angular/router';
import {DecisionTable} from '../../../../../core/model/decision-table';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
@Component({
  selector: 'plan-detail-menu',
  templateUrl: './plan-detail-menu.component.html',
  styleUrls: ['./plan-detail-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailMenuComponent implements OnInit {
  @Input()
  plan: DecisionTable;

  @Input()
  tasks: Task[];

  @Input()
  unitOfMeasures: UnitOfMeasure[];

  isOpened: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToList(): void {
    this.router.navigate(['plans']);
  }
}
