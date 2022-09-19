import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'plans-panel-header',
  templateUrl: './plans-panel-header.component.html',
  styleUrls: ['./plans-panel-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansPanelHeaderComponent implements OnInit {
  @Output() changePanelState = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
