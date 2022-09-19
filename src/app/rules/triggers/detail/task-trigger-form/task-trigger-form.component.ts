import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DecisionTableService} from '../../../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../../../core/api/legacy/rule-trigger.service';
import {SpinnerService} from '../../../../core/page/spinner.service';
import {TaskService} from 'src/app/core/api/legacy/task.service';

/* tslint:disable:no-any */
@Component({
  selector: 'task-trigger-form',
  templateUrl: './task-trigger-form.component.html',
  styleUrls: ['./task-trigger-form.component.css'],
})
export class TaskTriggerFormComponent implements OnInit {
  @Input() ruleTrigger: any = {ruleId: '', taskEvent: '', triggerActions: true, saveReport: false};
  dTables: any[];
  tasks: any[];
  // TODO: Move this to an app-level constant
  taskEvents: any[] = ['created', 'in progress', 'complete', 'abandoned'];

  /*****************************************************************************
                                  Service Calls
  *****************************************************************************/
  canEdit: boolean = false;
  editRuleId: string;

  /*****************************************************************************
                          Constructor, Lifecycle Hooks
  *****************************************************************************/
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private decisionTableService: DecisionTableService,
    private ruleTriggerService: RuleTriggerService,
    private taskService: TaskService,
    private loading: SpinnerService
  ) {}

  goBack(): void {
    this.router.navigate(['/rule-triggers']);
  }

  ngOnInit(): void {
    this.loading.show();
    this.getItem();
    this.getDTables();
    this.getTasks();
  }

  getItem(): void {
    this.loading.show();
    this.editRuleId = this.route.snapshot.paramMap.get('id');
    if (this.editRuleId === 'new') {
      // if user clicked add, not edit
      this.loading.hide();
      return;
    }
    this.canEdit = true;
    this.ruleTriggerService.getTaskRuleTrigger(this.editRuleId).subscribe(i => {
      this.ruleTrigger = i[0];
      this.loading.hide();
    });
  }

  getDTables(): void {
    this.loading.show();
    this.decisionTableService.getDTables().subscribe(d => {
      this.dTables = d;
      this.loading.hide();
    });
  }

  getTasks(): void {
    this.loading.show();
    this.taskService.getTasks().subscribe(t => {
      this.tasks = t;
      this.loading.hide();
    });
  }

  saveRuleTrigger(): void {
    this.ruleTriggerService.addTaskRuleTrigger(this.ruleTrigger).subscribe(res => {
      this.loading.show();
      this.goBack();
    });
  }

  removeEditedTrigger(): void {
    this.ruleTriggerService.deleteEditedTaskRuleTrigger(this.editRuleId).subscribe(res => {
      this.loading.show();
    });
  }

  /*****************************************************************************
                                  Form Methods
  *****************************************************************************/
  submitForm(): void {
    if (this.ruleTrigger.ruleId && this.ruleTrigger.taskEvent) {
      delete this.ruleTrigger._id;
      this.saveRuleTrigger();

      if (this.canEdit) {
        this.removeEditedTrigger();
      }
    }
  }
}
