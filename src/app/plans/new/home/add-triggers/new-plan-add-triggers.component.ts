import {Component, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TriggerForm} from 'src/app/core/model/form/trigger-form';

@Component({
  selector: 'new-plan-add-triggers',
  templateUrl: './new-plan-add-triggers.component.html',
  styleUrls: ['./new-plan-add-triggers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanAddTriggersComponent implements OnChanges {
  @Input()
  public triggerForm: TriggerForm;

  public iconName: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.triggerForm && this.triggerForm) {
      this.findIcon();
    }
  }

  private findIcon() {
    if (this.triggerForm.noun.displayName || this.triggerForm.task.displayName) {
      this.iconName = this.triggerForm.type === 'noun' ? 'noun-trigger' : 'tasks-trigger';
    }
  }

  public onButtonClick() {
    this.router.navigate(['./trigger'], {relativeTo: this.activatedRoute});
  }
}
