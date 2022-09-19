import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PlanDialogService} from '../../../../../dialog/plan-dialog.service';

@Component({
  selector: 'plans-control-panel',
  templateUrl: './plans-control-panel.component.html',
  styleUrls: ['./plans-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansControlPanelComponent {
  constructor(private planDialogService: PlanDialogService) {}

  public onCreateClick() {
    this.planDialogService.openNewPlanDialog();
  }
}
