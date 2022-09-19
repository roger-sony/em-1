import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {SkedService} from '../../core/api/legacy/sked.service';
import {TaskService} from '../../core/api/legacy/task.service';
import {RecipeService} from '../../core/api/legacy/recipe.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {TitleService} from '../../core/page/title.service';

/* tslint:disable:no-any */
@Component({
  selector: 'app-sked-template-detail',
  templateUrl: './sked-template-detail.component.html',
  styleUrls: ['./sked-template-detail.component.css'],
})
export class SkedTemplateDetailComponent implements OnInit {
  objectKeys: any = Object.keys;
  sked: any;
  tasks: any[];
  recipes: any = {};
  // For task detail modal
  activeTask: any;
  viewingTaskDetail: boolean = false;
  // For sked balance card
  hideSkedBalanceCard: boolean = false;

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private route: ActivatedRoute,
    private skedService: SkedService,
    private taskService: TaskService,
    private recipeService: RecipeService,
    private location: Location,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle(this.route.snapshot.paramMap.get('displayName'), 'Sked Templates');

    this.loading.show();
    this.getTasks();
    this.getRecipes();
  }

  /*******************************************************************************
                                Service Calls
*******************************************************************************/
  goBack(): void {
    this.location.back();
  }

  getSked(): void {
    const d: string = this.route.snapshot.paramMap.get('displayName');
    this.skedService.getSkedTemplateWithSortedTasks(d).subscribe(s => {
      this.sked = s[0];
      // Refresh weightedDuration in case task has been updated.
      this.sked.tasks.forEach((t: any, i: number) => {
        this.calculateWeightedDuration(i);
      });
      this.loading.hide();
    });
  }

  saveSked(): void {
    this.skedService.updateSkedTemplate(this.sked).subscribe(s => {
      this.loading.show();
      this.goBack();
    });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(t => {
      this.tasks = t;
      this.getSked();
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
  viewTaskDetail(task: any): void {
    this.activeTask = this.tasks.find(t => t._id === task._id);
    this.viewingTaskDetail = true;
  }

  closeTaskDetail(): void {
    this.activeTask = null;
    this.viewingTaskDetail = false;
  }

  toggleSkedBalanceCard(): void {
    this.hideSkedBalanceCard = !this.hideSkedBalanceCard;
  }

  /*******************************************************************************
                                Form Methods
*******************************************************************************/
  submitForm(): void {
    this.sked.balanced = this.remainingEmployeeTime - this.totalSkedEffort >= 0;
    this.saveSked();
  }

  addTask(): void {
    this.sked.tasks.push({weight: 1, status: 'created'});
  }

  deleteTask(index: number): void {
    this.sked.tasks.splice(index, 1);
  }

  /*******************************************************************************
                                Utilities
*******************************************************************************/
  get totalSkedEffort(): number {
    return this.sked.tasks.reduce((accumulator: number, current: any) => {
      return accumulator + (current.weightedDuration || 0);
    }, 0);
  }

  get remainingEmployeeTime(): number {
    return (this.sked.assignedEmployees || 0) * 120;
  }
  get employeesToAdd(): number {
    return Math.ceil(this.totalSkedEffort / 120 - (this.sked.assignedEmployees || 0));
  }

  calculateWeightedDuration(taskIndex: number): void {
    const id = this.sked.tasks[taskIndex]._id;
    const task = this.tasks.find(t => t._id === id);
    const weight = this.sked.tasks[taskIndex].weight;
    this.sked.tasks[taskIndex].weightedDuration = weight * task.effort;
  }
}
