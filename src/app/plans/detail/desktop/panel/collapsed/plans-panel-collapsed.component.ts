import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'plans-panel-collapsed',
  templateUrl: './plans-panel-collapsed.component.html',
  styleUrls: ['./plans-panel-collapsed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansPanelCollapsedComponent implements OnInit {
  @Output() changePanelState = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
