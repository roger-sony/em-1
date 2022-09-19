import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'plan-triggers-list-collapsed',
  templateUrl: './plan-triggers-list-collapsed.component.html',
  styleUrls: ['./plan-triggers-list-collapsed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggersListCollapsedComponent {
  @Output() changePanelState = new EventEmitter();
}
