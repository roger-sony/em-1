import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlanDialogService} from '../../../../../dialog/plan-dialog.service';
import {DecisionTable} from '../../../../..//core/model/decision-table';

@Component({
  selector: 'add-trigger-button',
  templateUrl: './add-trigger-button.component.html',
  styleUrls: ['./add-trigger-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTriggerButtonComponent implements OnInit {
  @Input()
  activePlan: DecisionTable;

  constructor(private planDialogService: PlanDialogService) {}

  ngOnInit(): void {}

  createNewTrigger(): void {
    this.planDialogService.openNewTriggerDialog(this.activePlan.id);
  }
}
