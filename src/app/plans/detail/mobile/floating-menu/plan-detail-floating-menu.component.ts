import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'plan-detail-floating-menu',
  templateUrl: './plan-detail-floating-menu.component.html',
  styleUrls: ['./plan-detail-floating-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanDetailFloatingMenuComponent {
  @Input()
  private planId: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public onTriggerClick() {
    this.router.navigate(['./trigger'], {relativeTo: this.activatedRoute});
  }

  public onGlobalConditionClick() {
    this.router.navigate(['/plans', this.planId, 'condition', 'new'], {
      queryParams: {global: true},
    });
  }

  public onNewConditionClick() {
    this.router.navigate(['/plans', this.planId, 'condition', 'new', 'noun-search']);
  }
}
