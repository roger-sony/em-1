import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'new-plan-dialog-description',
  templateUrl: './new-plan-dialog-description.component.html',
  styleUrls: ['./new-plan-dialog-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanDialogDescriptionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
