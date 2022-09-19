import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'plans-panel-collapse-button',
  templateUrl: './plans-panel-collapse-button.component.html',
  styleUrls: ['./plans-panel-collapse-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansPanelCollapseButtonComponent implements OnInit {
  @Output() panelStateClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
