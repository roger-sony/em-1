import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {forkJoin} from 'rxjs';
import {DecisionTableReportsService} from '../../../core/api/legacy/decision-table-reports.service';
import {DecisionTableService} from '../../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../../core/api/legacy/rule-trigger.service';
import {TaskService} from '../../../core/api/legacy/task.service';
import {SpinnerService} from '../../../core/page/spinner.service';
import {DecisionTablePreviewModalService} from '../../../services/decision-table-preview-modal.service';
import {SharedService} from '../../../services/shared.service';
import {TitleService} from '../../../core/page/title.service';
import {DecisionTableDto} from '../../../core/api/dto/decision-table.dto';
import {TaskDto} from '../../../core/api/dto/task.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'rule-triggers-list',
  templateUrl: './rule-triggers-list.component.html',
  styleUrls: ['./rule-triggers-list.component.css'],
})
export class RuleTriggersListComponent implements OnInit {
  objectKeys: any = Object.keys;
  rules: any;
  ruleTriggers: any[] = [];
  tasks: any;
  preview: any;

  /******************************************************************************
   Table Configuration
   ******************************************************************************/
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayedColumns: string[] = ['edit', 'type', 'rule', 'displayName', 'on demand', 'preview', 'delete'];
  dataSource: any;
  ruleTriggerFilters: any = {input: {}};
  pageSize: number;

  /******************************************************************************
   Constructor + Lifecycle Hooks
   ******************************************************************************/
  constructor(
    private dTableService: DecisionTableService,
    private rtService: RuleTriggerService,
    private taskService: TaskService,
    private sharedService: SharedService,
    private reportService: DecisionTableReportsService,
    private previewService: DecisionTablePreviewModalService,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Rule Triggers');

    this.loading.show();
    this.getTasks();
    this.getDTables();
    this.getDefaultPageSize();
    this.initializeRuleTriggerTable();
    // this subscribes to service that sends dTable data to preview modal
    this.previewService.currentMessage.subscribe(message => (this.preview = message));
  }

  initializeRuleTriggerTable(): void {
    this.dataSource = new MatTableDataSource(this.ruleTriggers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'rule':
          return this.rules[item.rule].display_name;
        default:
          return item[property];
      }
    };
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter: string[] = [];
      const filters: any[] = JSON.parse(filtersJson);
      filters.forEach(filter => {
        let val;
        switch (filter.id) {
          case 'rule':
            val = this.rules[data[filter.id]].display_name;
            break;
          default:
            val = data[filter.id] === (null || undefined) ? '' : data[filter.id].toString();
        }
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean); // AND condition
      // return matchFilter.some(Boolean); // OR condition
    };
    this.checkLocalStorage();
  }

  updateFilters(columnId: string, value: string) {
    this.ruleTriggerFilters.input[columnId] = value;
    localStorage.setItem('ruleTriggerFilters', JSON.stringify(this.ruleTriggerFilters));
    this.applyFilters(); // TODO: May need debounce
  }

  applyFilters() {
    const tableFilters: any[] = [];
    const filterKeys: string[] = this.objectKeys(this.ruleTriggerFilters.input);
    filterKeys.forEach(filter => {
      tableFilters.push({
        id: filter,
        value: this.ruleTriggerFilters.input[filter],
      });
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  /******************************************************************************
   Service Calls
   ******************************************************************************/
  getRuleTriggers(): void {
    const ruleTriggers = [
      this.rtService.getScheduledRules(),
      this.rtService.getTaskRuleTriggers(),
      this.rtService.getNounRuleTriggers(),
    ];

    console.log('--Fetching rule triggers....');
    forkJoin(ruleTriggers).subscribe(triggers => {
      const scheduleTriggers = triggers[0].map((t: any) => {
        // Check if date string vs. crontab
        t.type = t.schedule.slice(-1) === 'Z' ? 'Schedule (One-Time)' : 'Schedule (Recurring)';
        return t;
      });
      const taskTriggers = triggers[1].map((t: any) => {
        t.type = 'Task';
        // If task has been deleted, show an error for now.
        if (this.tasks[t.taskId]) {
          t.displayName = `${this.tasks[t.taskId].shortTask} is ${t.taskEvent}`;
        } else {
          t.displayName = `ERROR: This task has been deleted.`;
        }
        return t;
      });
      const nounTriggers = triggers[2].map((t: any) => {
        t.type = 'Noun';
        t.displayName = `${t.nounSubcategory} is updated`;
        return t;
      });
      this.ruleTriggers = [].concat(scheduleTriggers, taskTriggers, nounTriggers);
      this.initializeRuleTriggerTable();
    });
  }

  getDTables(): void {
    this.loading.show();
    this.dTableService.getDTables().subscribe(d => {
      // Create hash table to lookup rules by _id
      this.rules = d.reduce((map: Record<string, DecisionTableDto>, obj) => ((map[obj._id] = obj), map), {});
      this.loading.hide();
    });
  }

  getTasks(): void {
    this.loading.show();
    this.taskService.getTasks().subscribe(t => {
      // Create hash table to lookup tasks by _id
      this.tasks = t.reduce((map: Record<string, TaskDto>, obj) => ((map[obj._id] = obj), map), {});
      this.getRuleTriggers();
      this.loading.hide();
    });
  }

  runRuleOnDemand(ruleTrigger: any, runFromPreview?: boolean): void {
    const rule = ruleTrigger.rule;
    const saveReport = runFromPreview ? false : ruleTrigger.saveReport;
    const triggerActions = runFromPreview ? true : ruleTrigger.triggerActions;
    this.rtService.runDTableOnDemand(rule, saveReport, triggerActions).subscribe();
  }

  getRulePreview(ruleTrigger: any): void {
    this.previewService.changeMessage(ruleTrigger.rule);
  }

  saveReport(): void {
    const formattedTableRules = this.preview.table_rules.map((r: any) => {
      // The server is returning this weird format for the qty but
      // it has to be parsed to a normal float before saving
      if (r.ruleResults.qty.$numberDecimal) {
        r.ruleResults.qty = parseFloat(r.ruleResults.qty.$numberDecimal);
      }
      return r;
    });
    Promise.all(formattedTableRules).then(result => {
      this.preview.table_rules = result;
      console.log(result);
      this.reportService.addReport(this.preview).subscribe();
    });
  }

  deleteRuleTrigger(rt: any): void {
    if (confirm(`Are you sure you want to delete this rule trigger?`)) {
      this.loading.show();
      this.ruleTriggers = this.ruleTriggers.filter(trigger => trigger !== rt);
      this.dataSource = this.ruleTriggers;
      switch (rt.type) {
        case 'Schedule (Recurring)':
          this.rtService.deleteScheduledRule(rt._id).subscribe();
          break;
        case 'Schedule (One-Time)':
          this.rtService.deleteScheduledRule(rt._id).subscribe();
          break;
        case 'Task':
          this.rtService.deleteTaskRuleTrigger(rt._id).subscribe();
          break;
        case 'Noun':
          this.rtService.deleteNounRuleTrigger(rt._id).subscribe();
          break;
        default:
          console.error('Error while deleting trigger.');
          return;
      }
      this.loading.hide();
    }
  }

  getDefaultPageSize(): void {
    this.sharedService.getDefaultRows().subscribe(rows => (this.pageSize = rows));
  }

  /*******************************************************************************
   Local Storage Persistence
   *******************************************************************************/
  checkLocalStorage(): void {
    const ruleTriggerFilters = JSON.parse(localStorage.getItem('ruleTriggerFilters'));
    this.ruleTriggerFilters.input =
      ruleTriggerFilters && ruleTriggerFilters.input ? ruleTriggerFilters.input : this.ruleTriggerFilters.input;
    this.pageSize = ruleTriggerFilters && ruleTriggerFilters.pageSize ? ruleTriggerFilters.pageSize : this.pageSize;
    this.ruleTriggerFilters.pageSize = this.pageSize;
    this.applyFilters();
  }

  pageSizeChange(size: string): void {
    this.ruleTriggerFilters.pageSize = parseInt(size);
    localStorage.setItem('ruleTriggerFilters', JSON.stringify(this.ruleTriggerFilters));
  }

  clearStorage(): void {
    localStorage.removeItem('ruleTriggerFilters');
    this.checkLocalStorage();
    this.ruleTriggerFilters = {input: {}};
    this.applyFilters();
  }
}
