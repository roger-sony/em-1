import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Location} from '@angular/common';
import {SkedService} from '../../core/api/legacy/sked.service';
import {RecipeService} from '../../core/api/legacy/recipe.service';
import {RoleService} from '../../core/api/legacy/role.service';
import {takeUntil, delay, tap, skip, concatMap, map, take} from 'rxjs/operators';
import {Subject, of, BehaviorSubject, concat, Observable} from 'rxjs';
import {SharedService} from '../../services/shared.service';
import {TaskService} from '../../core/api/legacy/task.service';
import {UserService} from 'src/app/core/api/legacy/user.service';
import {TitleService} from '../../core/page/title.service';
import {RoleDto} from '../../core/api/dto/role.dto';
import {UserDto} from '../../core/api/dto/user.dto';
import {ProductionEnvironmentService} from 'src/app/core/page/production-environment.service';
import * as moment from 'moment';

/* tslint:disable:no-any */
@Component({
  selector: 'app-sked-detail',
  templateUrl: './sked-detail.component.html',
  styleUrls: ['./sked-detail.component.css'],
})
export class SkedDetailComponent implements OnInit, OnDestroy {
  /*******************************************************************************
                                Utilities
*******************************************************************************/
  get totalSkedEffort(): number {
    return this.sked.tasks.reduce((accumulator: number, current: any) => {
      const taskIsComplete = current.status === 'complete' || current.status === 'abandoned';
      return taskIsComplete ? accumulator : accumulator + (current.effort || 0);
    }, 0);
  }

  get remainingEmployeeTime(): number {
    const date = new Date();
    const currentTime =
      (date.getHours() < 10 ? '0' : '') +
      date.getHours() +
      ':' +
      (date.getMinutes() < 10 ? '0' : '') +
      date.getMinutes();
    const minutesRemainingInSked = this.minutesBetween(
      currentTime,
      this.sked._EndTime || moment(this.sked.end).local().format('HH:mm')
    );
    return (this.sked.assignedEmployees || 0) * minutesRemainingInSked;
  }

  objectKeys: any = Object.keys;
  destroy: Subject<unknown>;
  sked: any;
  skedSubtasks: any = [];
  recipes: any;
  roles: any;
  displayedRoles: string[];
  users: UserDto[];
  usersMap: any = {};
  currentUser: any;
  activeTask: any;
  viewingTaskDetail: boolean = false;
  viewingSubtaskDetail: boolean = false;
  viewingTaskClaimDetail: boolean = false;
  viewingTaskBeginPhDetail: boolean = false;
  viewingAbandonModal: boolean = false;
  viewingAddActivityModal: boolean = false;
  skedFilters: any = {input: {}};
  pageSize: number;

  /* TODO: Remove if polling strategy changes */
  public skedsLoading$ = new BehaviorSubject<boolean>(true);
  load$ = new BehaviorSubject('');
  sked$: Observable<string>;
  tasks: any;
  public skedsLegacy$: Observable<boolean>;

  /******************************************************************************
                            Table Configuration
******************************************************************************/
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayCreatedTasks: boolean = true;
  displayInProgressTasks: boolean = true;
  displayCompletedTasks: boolean = false;
  displayFilters: any = {claimedBy: ''};
  displayedColumns: string[] = [];
  possibleColumns: string[] = [
    'details',
    'displayName',
    'updateTaskStatus',
    'effort',
    'status',
    'dateCreated',
    'startedAt',
    'completedAt',
    'category',
    'location',
    'unpleasantness',
    'assignedTo',
    'roles',
    'claimedBy',
    'startedBy',
    'completedBy',
    'actualDuration',
  ];
  unfilterableColumns = [
    'details',
    'update',
    'dateCreated',
    'dateAssigned',
    'completedAt',
    'startedAt',
    'updateTaskStatus',
    'effort',
    'assignedTo',
    'roles',
  ];
  dataSource: any = [];
  searchValue: string = '';

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private skedService: SkedService,
    private recipeService: RecipeService,
    private roleService: RoleService,
    private userService: UserService,
    private location: Location,
    private sharedService: SharedService,
    private taskService: TaskService,
    private titleService: TitleService,
    private changeDetector: ChangeDetectorRef,
    private productionEnvironmentService: ProductionEnvironmentService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Current Sked');
    this.skedsLegacy$ = this.productionEnvironmentService.observeHostname();

    this.getTasks();
    this.displayedColumns = [
      'details',
      'displayName',
      'effort',
      'updateTaskStatus',
      'category',
      'location',
      'assignedTo',
    ];
    // TODO: Remove conditional & add mock user data for testing env
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
    }
    this.getRoles();
    this.getUsers();
    this.getRecipes();
    this.getSked();
    this.getDefaultRows();
    this.checkSubtaskLocalStorage();

    // This code polls the server for updates every 5 seconds. The observable
    // subject destroys the polling interval when the user navigates away
    // from the component.
    this.destroy = new Subject();
    const whenToRefresh$ = of('').pipe(
      takeUntil(this.destroy),
      delay(5000),
      tap(_ => this.load$.next('')),
      skip(1)
    );

    let skedCall$;

    this.skedsLegacy$.pipe(take(1)).subscribe(skedsLegacy => {
      if (skedsLegacy) {
        skedCall$ = this.skedService.getCurrentSked();
      } else {
        skedCall$ = this.skedService.getCurrentFlexSked();
      }
    });
    const poll$ = concat(skedCall$, whenToRefresh$);

    this.sked$ = this.load$.pipe(
      concatMap(_ => poll$),
      map(response => response),
      tap((s: any) => {
        if (this.sked._version < s[0]._version || this.sked._SkedID !== s[0].SkedID) {
          this.structureSkedForDisplay(s);
        }
      })
    );
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

  /*******************************************************************************
                                Service Calls
*******************************************************************************/
  goBack(): void {
    this.location.back();
  }

  getSked(): void {
    this.skedsLegacy$.pipe(take(1)).subscribe(skedsLegacy => {
      if (skedsLegacy) {
        this.getCurrentLegacySked();
      } else {
        this.getCurrentFlexSked();
      }
    });
  }

  public getCurrentLegacySked() {
    this.skedService.getCurrentSked().subscribe(s => {
      this.skedsLoading$.next(false);
      this.sked = s[0];
      this.initializeSkedTaskTable();
      this.checkSkedStatus();
      this.changeDetector.markForCheck();
    });
  }

  public getCurrentFlexSked() {
    this.skedService.getCurrentFlexSked().subscribe(s => {
      this.skedsLoading$.next(false);
      this.sked = s[0];
      this.initializeSkedTaskTable();
      this.checkSkedStatus();
      this.changeDetector.markForCheck();
    });
  }

  structureSkedForDisplay(s: any[]): void {
    this.sked = s[0];
    this.initializeSkedTaskTable();
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((r: any[]) => {
      this.recipes = r.reduce((recipesMap: Record<string, any>, obj) => ((recipesMap[obj._id] = obj), recipesMap), {});
    });
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe((r: RoleDto[]) => {
      this.roles = r.reduce((rolesMap: Record<string, RoleDto>, obj) => ((rolesMap[obj._id] = obj), rolesMap), {});
      this.displayedRoles = r.map(i => i._id);
      this.checkLocalStorage();
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((u: UserDto[]) => {
      this.users = u;
      this.usersMap = u.reduce((usersMap: Record<string, UserDto>, obj) => ((usersMap[obj._id] = obj), usersMap), {});
    });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(t => {
      this.tasks = t;
    });
  }

  updateTaskStatus(task: any, justClaimed?: boolean) {
    task._updated = true;
    let skedIdToSend: string;
    let onCurrentSked: boolean;
    if (task.status === 'complete' && task.skedId !== this.sked._id) {
      skedIdToSend = task.skedId;
      onCurrentSked = false;
    } else {
      skedIdToSend = this.sked._id;
      onCurrentSked = true;
    }
    delete task.skedId;
    this.skedsLegacy$.pipe(take(1)).subscribe(skedsLegacy => {
      if (skedsLegacy) {
        this.updateTaskInLegacySked(task, skedIdToSend, onCurrentSked, justClaimed);
      } else {
        this.updateTaskInFlexSked(task, skedIdToSend, onCurrentSked, justClaimed);
      }
    });
  }

  updateTaskInLegacySked(task: any, skedIdToSend: string, onCurrentSked: boolean, justClaimed?: boolean) {
    this.skedService.updatetaskinSked(task, skedIdToSend, onCurrentSked).subscribe(
      s => {
        this.getSked();
        let tempTask;
        if (s) {
          tempTask = s.tasks.filter((t: any) => t._id === task._id);
        }
        if (justClaimed && tempTask[0].claimedBy === this.currentUser) {
          this.viewingTaskClaimDetail = true;
          setTimeout(() => {
            this.viewingTaskClaimDetail = false;
          }, 2000);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTaskInFlexSked(task: any, skedIdToSend: string, onCurrentSked: boolean, justClaimed?: boolean) {
    this.skedService.updatetaskinFlexSked(task, skedIdToSend, onCurrentSked).subscribe(
      s => {
        this.getSked();
        let tempTask;
        if (s) {
          tempTask = s.tasks.filter((t: any) => t._id === task._id);
        }
        if (justClaimed && tempTask[0].claimedBy === this.currentUser) {
          this.viewingTaskClaimDetail = true;
          setTimeout(() => {
            this.viewingTaskClaimDetail = false;
          }, 2000);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  initializeSkedTaskTable(): void {
    this.dataSource = new MatTableDataSource(this.sked?.tasks || []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'startedAt':
          return new Date(item.startedAt);
        case 'completedAt':
          return new Date(item.completedAt);
        case 'effort':
          return parseFloat(item.weight) * parseFloat(item.effort);
        case 'displayName':
          return item.shortTask;
        case 'updateTaskStatus':
          return item.status;
        case 'source':
          if (item.attributes && item.attributes[0]._id) {
            return item['attributes'][0]['_id']['source'] || '';
          }
          return '';
        default:
          return item[property];
      }
    };
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter: boolean[] = [];
      const filters: any[] = JSON.parse(filtersJson);
      filters.forEach(filter => {
        // TODO: This code is deprecated since we removed dynamic tasks, e.g.
        // 'Replenish Inventory'. This should be refactored/simplified.
        if (filter.id === 'source' && data['attributes'] && data['attributes'][0]['_id']['source']) {
          const val =
            data['attributes'][0]['_id'][filter.id] === (null || undefined)
              ? ''
              : data['attributes'][0]['_id'][filter.id].toString();
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        } else if (filter.id === 'claimedBy' && filter.value === undefined) {
          const val = data[filter.id] === (null || undefined);
          matchFilter.push(val);
        } else if (filter.id === 'assignedTo') {
          // Show all unassigned tasks + any tasks that match any of the assignedTo filters
          const found = data[filter.id] ? filter.value.some((v: any) => data[filter.id].includes(v)) : true;
          matchFilter.push(found);
        } else {
          const val = data[filter.id] === (null || undefined) ? '' : data[filter.id].toString();
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        }
      });
      return matchFilter.every(Boolean); // AND condition
      // return matchFilter.some(Boolean); // OR condition
    };
    this.applyFilters();
  }

  isFilterable(column: string): boolean {
    return !this.unfilterableColumns.includes(column);
  }

  updateFilters(columnId: string, value: string): void {
    if (columnId !== 'assignedTo') {
      this.skedFilters.input[columnId] = value;
      localStorage.setItem('skedFilters', JSON.stringify(this.skedFilters));
    }
    this.displayFilters[columnId] = value;
    this.applyFilters(); // TODO: May need debounce
  }

  applyFilters(): void {
    const tableFilters: any[] = [];
    const filterKeys: string[] = this.objectKeys(this.displayFilters);
    filterKeys.forEach(filter => {
      tableFilters.push({
        id: filter,
        value: this.displayFilters[filter],
      });
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  /*******************************************************************************
                              Click Handlers
*******************************************************************************/
  viewTaskDetail(task: any): void {
    // TODO: Refactor to avoid task duplication & enable
    // a start/complete task button within task detail modal
    this.activeTask = JSON.parse(JSON.stringify(task));
    this.viewingTaskDetail = true;
  }

  closeTaskDetail(): void {
    this.activeTask = null;
    this.viewingTaskDetail = false;
  }

  viewSubtaskDetail(task: any): void {
    this.activeTask = JSON.parse(JSON.stringify(task));
    this.viewingSubtaskDetail = true;
  }

  closeSubtaskDetail(): void {
    this.activeTask = null;
    this.viewingSubtaskDetail = false;
  }

  closeTaskBeginPhDetail(): void {
    this.activeTask = null;
    this.viewingTaskBeginPhDetail = false;
  }

  closeAbandonModal(): void {
    localStorage.removeItem('locationFilter');
    this.viewingTaskBeginPhDetail = false;
    this.viewingAbandonModal = false;
    this.changeTaskStatus(this.activeTask, 'abandoned');
    this.constructStatusMessage(this.activeTask);
  }

  closeAbandonModalOnly(): void {
    this.viewingAbandonModal = false;
  }

  openAbandonModal(): void {
    this.viewingAbandonModal = true;
  }

  handleTaskStatusClick(task: any, status: string): void {
    this.activeTask = task;
    if (status === 'in progress') {
      this.activeTask.skedId = this.sked._id;
    }
    if (status === 'abandoned') {
      if (confirm('Abandon task - are you sure?')) {
        this.changeTaskStatus(task, status);
      }
    } else {
      this.changeTaskStatus(task, status);
    }
  }

  handleTaskClaimClick(task: any): void {
    task.claimedBy = this.currentUser;
    this.updateTaskStatus(task, true);
  }

  handleTaskUnclaimClick(task: any): void {
    delete task.claimedBy;
    this.updateTaskStatus(task);
  }

  pauseTask(task: any): void {
    task.paused = true;
    if (!task.pauses) {
      task.pauses = [];
    }
    task.pauses.push({
      startPause: new Date(),
      endPause: null,
    });
    localStorage.removeItem('locationFilter');
    this.viewingTaskBeginPhDetail = false;
    this.updateTaskStatus(task);
  }

  handleTaskResumeClick(task: any): void {
    delete task.paused;
    // Reference last element in array (without popping it off)
    task.pauses[task.pauses.length - 1].endPause = new Date();
    this.activeTask = task;
    this.activeTask.skedId = this.sked._id;
    this.viewingTaskBeginPhDetail = true;
    this.updateTaskStatus(task);
  }

  closeTaskClaimDetail(): void {
    this.viewingTaskClaimDetail = false;
  }

  closeTaskDetailDone(): void {
    localStorage.removeItem('locationFilter');
    this.handleTaskStatusClick(this.activeTask, 'complete');
  }

  updateObservations(data: any): void {
    this.sked.tasks?.map((t: any) => {
      if (t._id === data.id) {
        t.observations = data.observations;
      }
    });
  }

  toggleAddActivityModal(): void {
    this.viewingAddActivityModal = !this.viewingAddActivityModal;
  }

  addTask(task: any): void {
    task.status = 'created';
    task.weight = 1;
    task.weightedDuration = task.effort;
    const taskToAdd = {
      updated: [] as any[],
      new: [] as any[],
      assignedEmployees: this.sked.assignedEmployees,
    };
    taskToAdd.new.push(task);
    this.skedService.updateSked(taskToAdd, this.sked._id).subscribe(s => {
      this.getSked();
    });
  }

  // Function to find difference in current time and end time.
  minutesBetween(now: string, end: string) {
    return Math.abs(this.toMinutes(end) - this.toMinutes(now));
  }

  toMinutes(time: any) {
    time = /^(\d{1,2}):(\d{2})$/.exec(time);
    return time[1] * 60 + +time[2];
  }

  async changeTaskStatus(task: any, status: string) {
    // If the task is currently created, and we are changing to 'in progress'
    if (task.status === 'created') {
      task.claimedBy = this.currentUser;
      task.startedAt = new Date();
      task.startedBy = this.currentUser;
      this.viewingTaskBeginPhDetail = status === 'abandoned' ? false : true;
    } else {
      task.completedAt = new Date();
      task.completedBy = this.currentUser;
      this.removeSubtaskStorage(task._id);
      this.viewingTaskBeginPhDetail = false;
    }
    task.status = status;
    if (status === 'complete') {
      await this.checkForObservation(task);
      return;
    }
    this.updateTaskStatus(task);
  }

  async checkForObservation(task: any) {
    const taskToCheck = this.sked.tasks.filter((t: any) => t._id === task._id);
    if (task.observations && task.observations.length === 0) {
      delete task.observations;
      this.updateTaskStatus(task);
      return;
    }
    if (
      taskToCheck &&
      taskToCheck[0] &&
      taskToCheck[0].observations &&
      taskToCheck[0].observations.length > 0 &&
      taskToCheck[0].observations.replace(/\s/g, '').length
    ) {
      task.observations = taskToCheck[0].observations.trim();
      this.updateTaskStatus(task);
      return;
    }
    this.updateTaskStatus(task);
  }

  constructStatusMessage(task: any): string {
    switch (task.status) {
      case 'auto-abandoned':
        return 'Auto-Abandoned by Ophanim';
      case 'abandoned':
        return `Abandoned by ${task.claimedBy}`;
      case 'in progress':
        return task.startedBy && task.startedBy !== this.currentUser ? `Begun by ${task.startedBy}` : '';
      case 'complete':
        return `Completed by ${task.completedBy}`;
      case 'created':
        return task.claimedBy && task.claimedBy !== this.currentUser ? `Claimed by ${task.claimedBy}` : '';
    }
    if (task.claimedBy === this.currentUser) {
      switch (task.status) {
        case 'auto-abandoned':
          return 'Auto-Abandoned by Ophanim';
        case 'abandoned':
          return `Abandoned by ${task.claimedBy}`;
        case 'complete':
          return `Completed by ${task.claimedBy}`;
      }
    }
    return '';
  }

  getDefaultRows(): void {
    this.sharedService.getDefaultRows().subscribe(rows => (this.pageSize = rows));
  }

  checkSkedStatus(): void {
    (this.sked?.tasks || []).map((t: any) => {
      if (t.status === 'in progress' && !t.paused && this.currentUser === t.claimedBy) {
        this.activeTask = t;
        this.activeTask.skedId = this.sked._id;
        this.viewingTaskBeginPhDetail = true;
      }
    });
  }

  /*******************************************************************************
                            Local Storage Persistence
*******************************************************************************/
  checkLocalStorage(): void {
    this.possibleColumns.forEach(e => {
      this.skedFilters.input[e] = '';
    });
    const skedFilters = JSON.parse(localStorage.getItem('skedFilters'));

    this.skedFilters.input = skedFilters && skedFilters.input ? skedFilters.input : this.skedFilters.input;
    this.displayedColumns = skedFilters && skedFilters.columns ? skedFilters.columns : this.displayedColumns;
    this.displayedRoles = skedFilters && skedFilters.roles ? skedFilters.roles : this.displayedRoles;
    this.pageSize = skedFilters && skedFilters.pageSize ? skedFilters.pageSize : this.pageSize;
    this.skedFilters.columns = this.displayedColumns;
    this.skedFilters.roles = this.displayedRoles;
    this.skedFilters.pageSize = this.pageSize;

    //find values to trigger filter
    if (skedFilters && skedFilters.input) {
      for (const e in skedFilters.input) {
        if (skedFilters.input[e].length > 0) {
          this.displayFilters[e] = skedFilters.input[e];
        }
      }
    }
  }

  selectColumnChange(): void {
    this.skedFilters.columns = this.displayedColumns;
    localStorage.setItem('skedFilters', JSON.stringify(this.skedFilters));
  }

  selectRoleChange(): void {
    this.skedFilters.roles = this.displayedRoles;
    localStorage.setItem('skedFilters', JSON.stringify(this.skedFilters));
  }

  pageSizeChange(size: string): void {
    this.skedFilters.pageSize = parseInt(size);
    localStorage.setItem('skedFilters', JSON.stringify(this.skedFilters));
  }

  clearStorage(): void {
    localStorage.removeItem('skedFilters');
    this.checkLocalStorage();
    this.displayFilters = {};
    this.applyFilters();
  }

  removeSubtaskStorage(id: string): void {
    const localStorageSubtask = JSON.parse(localStorage.getItem('subtasks'));
    if (localStorageSubtask) {
      delete localStorageSubtask[id];
      // check if object is empty
      if (Object.entries(localStorageSubtask).length === 0 && localStorageSubtask.constructor === Object) {
        localStorage.removeItem('subtasks');
      } else {
        localStorage.setItem('subtasks', JSON.stringify(localStorageSubtask));
      }
    }
  }

  // Checks in local storage for any saved subtask updates older than 24 hours and deletes them
  checkSubtaskLocalStorage(): void {
    const currentDate = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const subtaskStorage = JSON.parse(localStorage.getItem('subtasks'));
    if (subtaskStorage) {
      for (const i of Object.keys(subtaskStorage)) {
        const storedDate = new Date(subtaskStorage[i][0].createdDate).getTime();
        if (currentDate - storedDate > oneDay) {
          delete subtaskStorage[i];
          // check if object is empty
          if (Object.entries(subtaskStorage).length === 0 && subtaskStorage.constructor === Object) {
            localStorage.removeItem('subtasks');
          } else {
            localStorage.setItem('subtasks', JSON.stringify(subtaskStorage));
          }
        }
      }
    }
  }
}
