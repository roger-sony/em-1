import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PlanDialogService} from 'src/app/dialog/plan-dialog.service';

@Component({
  selector: 'plan-create-condition-button',
  templateUrl: './plan-create-condition-button.component.html',
  styleUrls: ['./plan-create-condition-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCreateConditionButtonComponent implements OnInit {
  constructor(private planDialogService: PlanDialogService) {}

  ngOnInit(): void {}

  public onCreateConditionClick() {
    this.planDialogService.openNewPlanConditionDialog();
  }
}
