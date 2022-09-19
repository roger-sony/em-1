import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PlanDialogService} from '../../../../dialog/plan-dialog.service';

@Component({
  selector: 'plans-empty',
  templateUrl: './plans-empty.component.html',
  styleUrls: ['./plans-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansEmptyComponent implements OnInit {
  constructor(private planDialogService: PlanDialogService) {}

  ngOnInit(): void {}

  public createNewPlan(): void {
    this.planDialogService.openNewPlanDialog();
  }
}
