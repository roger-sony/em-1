import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {SkedService} from '../../core/api/legacy/sked.service';
import {TaskService} from '../../core/api/legacy/task.service';
import {RecipeService} from '../../core/api/legacy/recipe.service';
import {Role} from '../../core/model/role';
import {User} from '../../core/model/user';
import {SpinnerService} from '../../core/page/spinner.service';
import {TitleService} from '../../core/page/title.service';
import {GetAllRolesAction} from '../../core/store/roles/roles.action';
import {selectRolesMap} from '../../core/store/roles/roles.selector';
import {GetAllUsersAction} from '../../core/store/users/users.action';
import {selectUsersMap} from '../../core/store/users/users.selector';

/* tslint:disable:no-any */
@Component({
  selector: 'sked-instance-detail',
  templateUrl: './sked-instance-detail.component.html',
  styleUrls: ['./sked-instance-detail.component.css'],
})
export class SkedInstanceDetailComponent implements OnInit {
  objectKeys: any = Object.keys;
  sked: any;
  skedToCompare: any;
  tasks: any[];
  recipes: any = {};
  // For task detail modal
  activeTask: any;
  viewingTaskDetail: boolean = false;
  taskAutocompleteOptions: any = {};
  // For sked balance card
  hideSkedBalanceCard: boolean = false;
  skedUpdate: any = {updated: [], new: []};

  public usersMap$: Observable<Record<string, User>>;
  public rolesMap$: Observable<Record<string, Role>>;

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private skedService: SkedService,
    private taskService: TaskService,
    private recipeService: RecipeService,
    private loading: SpinnerService,
    private titleService: TitleService,
    private store$: Store<{}>
  ) {}

  ngOnInit() {
    this.loading.show();
    this.getTasks();
    this.getRecipes();
    this.getTaskFieldValues();
    this.getSked();

    this.store$.dispatch(new GetAllUsersAction({}));
    this.usersMap$ = this.store$.pipe(select(selectUsersMap));

    this.store$.dispatch(new GetAllRolesAction({}));
    this.rolesMap$ = this.store$.pipe(select(selectRolesMap));
  }

  /*******************************************************************************
                                Service Calls
*******************************************************************************/
  goBack(): void {
    this.location.back();
  }

  getSked(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.skedService.getSkedWithSortedTasks(id).subscribe(s => {
      this.sked = s[0];
      this.titleService.setPageTitle(this.sked.displayName, 'Skeds');
      this.loading.hide();
    });
  }

  compareSkedVersionBeforeSave(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.skedService.getSkedWithSortedTasks(id).subscribe(s => {
      this.skedToCompare = s[0];
      const versionsMatch = this.sked._version === this.skedToCompare._version;
      const skedComplete = this.skedToCompare.status === 'complete';
      if (versionsMatch && !skedComplete) {
        this.saveSked();
      } else if (skedComplete) {
        if (confirm('Uh oh! This sked is now complete and may not be edited. Go to current sked?')) {
          this.router.navigate(['/current-sked']);
        }
      } else if (!versionsMatch) {
        if (confirm('This sked may have changed since you started editing it. Ok to overwrite changes?')) {
          // Edge case: User is editing a future sked, and that sked gets marked
          // 'in progress' while the user is editing.
          const skedStatusHasChangedToInProgress =
            this.sked.status === 'created' && this.skedToCompare.status === 'in progress';
          if (skedStatusHasChangedToInProgress) {
            this.sked.status = 'in progress';
          }
          this.saveSked();
        }
      }
    });
  }

  async saveSked() {
    await this.splitTasks();
    this.loading.show();
    this.skedService.updateSked(this.skedUpdate, this.sked._id).subscribe(s => {
      this.getSked();
      window.scroll(0, 0);
      this.loading.hide();
      this.skedUpdate = {updated: [], new: []};
    });
  }

  saveDeleteTask(instanceTaskId: string, skedId: string): void {
    this.loading.show();
    this.skedService.deletetaskinSked(instanceTaskId, skedId).subscribe(s => {
      this.getSked();
      this.loading.hide();
    });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(t => {
      this.tasks = t;
    });
  }

  getTaskFieldValues(): void {
    this.loading.show();
    this.taskService.getFieldValues().subscribe(v => {
      this.taskAutocompleteOptions = v;
      this.loading.hide();
    });
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((r: any[]) => {
      this.recipes = r.reduce((map, obj) => ((map[obj._id] = obj), map), {});
    });
  }

  /*******************************************************************************
                              Click Handlers
*******************************************************************************/
  toggleSkedBalanceCard(): void {
    this.hideSkedBalanceCard = !this.hideSkedBalanceCard;
  }

  /* TODO: If kept in UI redesign, task detail modal should probably be factored
  out into a child component. */
  viewTaskDetail(task: any): void {
    /* Clone the task for editing in case the user decides not to save changes. */
    if (task.hasOwnProperty('movability')) {
      this.activeTask = JSON.parse(JSON.stringify(task));
    } else {
      this.activeTask = JSON.parse(JSON.stringify(this.tasks.find(t => t._id === task._id)));
    }
    this.viewingTaskDetail = true;
  }

  closeTaskDetail(confirmToClose?: boolean): void {
    if (confirmToClose) {
      if (confirm('Discard changes - are you sure?')) {
        this.activeTask = null;
        this.viewingTaskDetail = false;
      }
    } else {
      this.activeTask = null;
      this.viewingTaskDetail = false;
    }
  }

  saveTaskDetail() {
    this.loading.show();
    delete this.activeTask._editing;
    const taskIndexToUpdate = this.sked.tasks.findIndex((t: any) => t._id === this.activeTask._id);
    this.sked.tasks[taskIndexToUpdate] = this.activeTask;
    this.calculateWeightedDuration(taskIndexToUpdate);
    this.saveSked();
  }

  editTaskFields(): void {
    this.activeTask._editing = true;
  }

  /*******************************************************************************
                                Form Methods
*******************************************************************************/
  submitForm(): void {
    this.sked.balanced = this.remainingEmployeeTime - this.totalSkedEffort >= 0;
    this.compareSkedVersionBeforeSave();
  }

  addTask(): void {
    this.sked.tasks.push({weight: 1, status: 'created'});
  }

  deleteTask(index: number): void {
    // this.sked.tasks.splice(index, 1);
    const instanceTaskId: any = {
      instanceTaskId: this.sked.tasks[index].instanceTaskId,
    };
    const skedId = this.sked._id;
    this.saveDeleteTask(instanceTaskId, skedId);
  }

  updateTaskSelection(taskIndex: number): void {
    let instanceTaskId;
    const taskId = this.sked.tasks[taskIndex]._id;
    if (this.sked.tasks[taskIndex].instanceTaskId) {
      instanceTaskId = this.sked.tasks[taskIndex].instanceTaskId.slice(0);
    }
    this.sked.tasks[taskIndex] = JSON.parse(JSON.stringify(this.tasks.find(t => t._id === taskId)));
    this.sked.tasks[taskIndex].weight = 1;
    this.sked.tasks[taskIndex].status = 'created';
    if (instanceTaskId) {
      this.sked.tasks[taskIndex].instanceTaskId = instanceTaskId;
    }
    this.calculateWeightedDuration(taskIndex);
  }

  /*******************************************************************************
                                Utilities
*******************************************************************************/
  get totalSkedEffort(): number {
    return this.sked.tasks.reduce((accumulator: number, current: any) => {
      if (
        current.status === 'complete' ||
        current.status === 'abandoned' ||
        current.status === 'moved' ||
        current.status === 'auto-abandoned'
      ) {
        return accumulator;
      }
      return accumulator + (current.weightedDuration || 0);
    }, 0);
  }

  get remainingEmployeeTime(): number {
    if (this.sked.status === 'created') {
      return (this.sked.assignedEmployees || 0) * 120;
    }
    const date = new Date();
    const currentTime =
      (date.getHours() < 10 ? '0' : '') +
      date.getHours() +
      ':' +
      (date.getMinutes() < 10 ? '0' : '') +
      date.getMinutes();
    const minutesRemainingInSked = this.minutesBetween(currentTime, this.sked._EndTime);
    return (this.sked.assignedEmployees || 0) * minutesRemainingInSked;
  }

  // Function to find difference in current time and end time.
  minutesBetween(now: string, end: string) {
    return Math.abs(this.toMinutes(end) - this.toMinutes(now));
  }

  toMinutes(time: any) {
    time = /^(\d{1,2}):(\d{2})$/.exec(time);
    return time[1] * 60 + +time[2];
  }

  get employeesToAdd(): number {
    return Math.ceil(this.totalSkedEffort / 120 - (this.sked.assignedEmployees || 0)) || 1;
  }

  /* TODO: Simplify since we now copy over fields as soon as task is added */
  calculateWeightedDuration(taskIndex: number): void {
    /* If the task has already been saved to the sked, its fields have
    been copied over. If it is a newly added task, we must reference its
    fields (e.g. effort) from the Tasks collection. */
    let task = null;
    if (this.sked.tasks[taskIndex].hasOwnProperty('effort')) {
      task = this.sked.tasks[taskIndex];
    } else {
      const id = this.sked.tasks[taskIndex]._id;
      task = this.tasks.find(t => t._id === id);
    }
    const weight = this.sked.tasks[taskIndex].weight;
    this.sked.tasks[taskIndex].weightedDuration = weight * task.effort;
    this.sked.tasks[taskIndex].changed = true;
  }

  priorityChange(taskIndex: number): void {
    this.sked.tasks[taskIndex].changed = true;
  }

  getIconForStatus(status: string): string {
    switch (status) {
      case 'complete':
        return 'check_circle';
      case 'in progress':
        return 'schedule';
      case 'abandoned':
        return 'block';
      case 'auto-abandoned':
        return 'block';
      case 'created':
        return 'block';
      case 'moved':
        return 'arrow_forward';
      default:
        return '';
    }
  }

  /* TODO: When this component is refactored, delete this method and refactor
    anything in the code that calls this method. Task displayName is no longer
    used for anything. We use task.shortTask instead. */
  constructTaskDisplayName(): void {
    this.activeTask.displayName = `${this.activeTask.verb} ${this.activeTask.noun}`;
    if (!!this.activeTask.location) {
      this.activeTask.displayName += ` in ${this.activeTask.location}`;
    }
  }

  async splitTasks() {
    this.sked.tasks.forEach((t: any) => {
      if (t.changed && t.instanceTaskId) {
        this.skedUpdate.updated.push(t);
        delete t.changed;
      }
      if (!t.instanceTaskId) {
        this.skedUpdate.new.push(t);
        delete t.changed;
      }
    });
    this.skedUpdate.assignedEmployees = this.sked.assignedEmployees;
  }
}
