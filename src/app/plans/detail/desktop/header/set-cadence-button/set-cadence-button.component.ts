import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {PlanDialogService} from '../../../../../dialog/plan-dialog.service';
import {DecisionTable} from '../../../../../core/model/decision-table';
import {CadenceDisplay} from '../../../../../core/model/cadence-display';

@Component({
  selector: 'set-cadence-button',
  templateUrl: './set-cadence-button.component.html',
  styleUrls: ['./set-cadence-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetCadenceButtonComponent {
  @Input()
  cadence: CadenceDisplay;

  @Input()
  activePlan: DecisionTable;

  constructor(private planDialogService: PlanDialogService) {}

  openCadenceDialog(): void {
    const cadenceId = this.cadence.type === 'plan-cadence-none' ? '' : this.cadence.id;
    this.planDialogService.openSetCadenceDialog(this.activePlan.id, cadenceId);
  }
}
