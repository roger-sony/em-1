import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {GetTasksAction} from 'src/app/core/store/tasks/tasks.action';
import {selectFilteredTasks} from 'src/app/core/store/tasks/tasks.selector';
import {TriggerForm} from '../../../core/model/form/trigger-form';
import {TriggerFormType} from '../../../core/model/form/trigger-form-type';
import {UpdateTriggerFormAction} from '../../../core/store/forms/forms.action';
import {selectTriggerForm} from '../../../core/store/forms/forms.selector';
import {selectRouterQueryParam} from '../../../core/store/router/router.selector';

@Component({
  selector: 'plan-trigger-task',
  templateUrl: './plan-trigger-task.component.html',
  styleUrls: ['./plan-trigger-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanTriggerTaskComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput')
  public searchInput: ElementRef<HTMLInputElement>;

  public search$: Observable<string>;

  public filteredTasks$: Observable<Task[]>;

  private triggerForm$: Observable<TriggerForm>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.store$.dispatch(new GetTasksAction({force: true}));

    this.search$ = this.store$.pipe(
      select(selectRouterQueryParam('search')),
      map(search => search || ''),
      take(1)
    );
    this.filteredTasks$ = this.store$.pipe(select(selectFilteredTasks));

    this.triggerForm$ = this.store$.pipe(select(selectTriggerForm));
  }

  public ngAfterViewInit() {
    this.searchInput.nativeElement.focus();
  }

  public onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.router.navigate([], {queryParams: {search: inputElement.value || null}, queryParamsHandling: 'merge'});
  }

  public onTaskClick(task: Task) {
    this.triggerForm$.pipe(take(1)).subscribe(triggerForm => {
      this.store$.dispatch(
        new UpdateTriggerFormAction({
          triggerForm: {
            ...triggerForm,
            type: TriggerFormType.Task,
            task: {id: task.id, displayName: task.shortTask, event: triggerForm?.task?.event || ''},
          },
        })
      );
      this.router.navigate(['..'], {relativeTo: this.activatedRoute});
    });
  }

  public onBackClick() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute});
  }
}
