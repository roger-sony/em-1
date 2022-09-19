import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'plan-card-loading',
  templateUrl: './plan-card-loading.component.html',
  styleUrls: ['./plan-card-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardLoadingComponent implements OnInit {
  ngOnInit(): void {}
}
