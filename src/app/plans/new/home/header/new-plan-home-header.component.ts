import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ClearAllFormsAction} from 'src/app/core/store/forms/forms.action';

@Component({
  selector: 'new-plan-home-header',
  templateUrl: './new-plan-home-header.component.html',
  styleUrls: ['./new-plan-home-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanHomeHeaderComponent {
  @Input()
  public valid: boolean;

  @Output()
  public save = new EventEmitter();

  constructor(private router: Router, private store$: Store<{}>) {}

  public onBackClick() {
    if (this.router.url.startsWith('/plans/new')) {
      this.store$.dispatch(new ClearAllFormsAction());
      this.router.navigate(['/plans']);
    }
  }

  public onSave() {
    this.save.emit();
  }
}
