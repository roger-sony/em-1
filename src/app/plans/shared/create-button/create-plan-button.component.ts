import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'create-plan-button',
  templateUrl: './create-plan-button.component.html',
  styleUrls: ['./create-plan-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlanButtonComponent {}
