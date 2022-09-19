import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PlanDialogService} from '../../../../../../../dialog/plan-dialog.service';

@Component({
  selector: 'create-plan-small-button',
  templateUrl: './create-plan-small-button.component.html',
  styleUrls: ['./create-plan-small-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanSmallButtonComponent implements OnInit {
  constructor(private planDialogService: PlanDialogService) {}

  ngOnInit(): void {}

  createNewPlan(): void {
    this.planDialogService.openNewPlanDialog();
  }
}
