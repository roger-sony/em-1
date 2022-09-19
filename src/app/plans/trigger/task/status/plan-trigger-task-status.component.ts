import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {TaskEvent} from 'src/app/core/model/task-event';
import {TriggerForm} from '../../../../core/model/form/trigger-form';
import {TriggerFormType} from '../../../../core/model/form/trigger-form-type';
import {UpdateTriggerFormAction} from '../../../../core/store/forms/forms.action';
import {selectTriggerForm} from '../../../../core/store/forms/forms.selector';

@Component({
  selector: 'plan-trigger-task-status',
  templateUrl: './plan-trigger-task-status.component.html',
  styleUrls: ['./plan-trigger-task-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggerTaskStatusComponent implements OnInit {
  public readonly statuses = Object.values(TaskEvent);

  private triggerForm$: Observable<TriggerForm>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.triggerForm$ = this.store$.pipe(select(selectTriggerForm));
  }

  public onStatusClick(status: TaskEvent) {
    this.triggerForm$.pipe(take(1)).subscribe(triggerForm => {
      this.store$.dispatch(
        new UpdateTriggerFormAction({
          triggerForm: {
            ...triggerForm,
            type: TriggerFormType.Task,
            task: {id: triggerForm?.task?.id || '', displayName: triggerForm?.task?.displayName || '', event: status},
          },
        })
      );
      this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
    });
  }

  public onBackClick() {
    this.router.navigate(['../..'], {relativeTo: this.activatedRoute});
  }
}
