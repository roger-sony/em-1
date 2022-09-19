import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'plan-detail-condition-delete-dialog',
  templateUrl: './plan-detail-condition-delete-dialog.component.html',
  styleUrls: ['./plan-detail-condition-delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailConditionDeleteDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
