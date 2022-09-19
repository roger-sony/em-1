import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {CadenceDisplay} from '../../../../../../core/model/cadence-display';

@Component({
  selector: 'plan-card-cadence',
  templateUrl: './plan-card-cadence.component.html',
  styleUrls: ['./plan-card-cadence.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardCadenceComponent {
  @Input()
  cadence: CadenceDisplay;
}
