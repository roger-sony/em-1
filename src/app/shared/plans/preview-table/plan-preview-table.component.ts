import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Sort} from '@angular/material/sort';
import {Store} from '@ngrx/store';
import * as moment from 'moment';
import {DecisionTablePreview, DecisionTablePreviewRule} from 'src/app/core/model/decision-table-preview';
import {PlanPreviewCondition, PlanPreviewTableData} from 'src/app/core/model/plan-preview-table-data';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {DownloadExcelFileAction} from 'src/app/core/store/decision-tables/decision-tables.action';

@Component({
  selector: 'plan-preview-table',
  templateUrl: './plan-preview-table.component.html',
  styleUrls: ['./plan-preview-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPreviewTableComponent implements OnChanges {
  @Input()
  public preview: DecisionTablePreview;

  @Input()
  public tasks: Record<string, Task>;

  @Input()
  public uom: Record<string, UnitOfMeasure>;

  @Input()
  private downloadXLS: boolean;

  @Input()
  public mobile: boolean;

  private tableData: PlanPreviewTableData[];
  public sortedData: PlanPreviewTableData[];

  constructor(public element: ElementRef<HTMLElement>, private store$: Store<{}>) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.preview || changes.tasks || changes.uom) {
      this.createTableData();
      this.sortedData = this.tableData?.slice();
    }
    if (changes.downloadXLS && this.downloadXLS) {
      this.downloadXLSClick();
    }
  }

  public sortData(sort: Sort) {
    const data = this.tableData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'noun':
          return this.compare(a.noun, b.noun, isAsc);
        case 'attributes':
          return this.compare(a.attributes[0], b.attributes[0], isAsc);
        case 'conditions':
          return this.compare(a.conditions[0].value, b.conditions[0].value, isAsc);
        case 'value':
          return this.compare(a.measuredValue, b.measuredValue, isAsc);
        case 'task':
          return this.compare(a.taskTriggered, b.taskTriggered, isAsc);
        case 'update':
          return this.compare(a.lastUpdate, b.lastUpdate, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public createTableData() {
    this.tableData = this.preview?.rules.map(rule => {
      return {
        noun: rule.configName || '(no rules)',
        attributes:
          rule.factFilters?.map(fact => (fact.name === 'qty' ? 'Current Value' : fact.name.replace(/_/g, ' '))) || [],
        conditions: this.createCondition(rule),
        measuredValue: this.createMeasuredValue(rule),
        taskTriggered:
          this.tasks && this.tasks[rule.consequence]?.shortTask ? this.tasks[rule.consequence]?.shortTask : 'n/a',
        lastUpdate: this.dateFormat(rule.ruleResult.lastUpdated) || '(no info)',
        conditionMet: rule.conditionMet,
      };
    });
  }

  private createMeasuredValue(rule: DecisionTablePreviewRule): string | number {
    if (!this.uom[rule.configName] || this.uom[rule.configName]?.type === 'number') {
      return Math.round(parseFloat(rule.ruleResult.quantity.$numberDecimal) * 100) / 100 || 0;
    } else {
      return this.getRangeMeasurementValue(rule.configName, rule.ruleResult.quantity);
    }
  }

  private createCondition(rule: DecisionTablePreviewRule): PlanPreviewCondition[] {
    const conditions = rule.factFilters.map(fact => {
      if (fact.name !== 'qty') {
        return {value: fact.value};
      } else if (!this.uom[rule.configName] || this.uom[rule.configName].type === 'number') {
        return {
          operation: this.operationFormat(fact.operation),
          value: fact.value,
          uom: rule.ruleResult.unitOfMeasures[0],
        };
      } else {
        return {value: this.getRangeMeasurementValue(rule.configName, fact.value)};
      }
    });
    return conditions;
  }

  // tslint:disable-next-line:no-any
  private getRangeMeasurementValue(name: string, qty: string | any) {
    if (qty.$numberDecimal) {
      qty = qty.$numberDecimal;
    }
    const value = this.uom[name].rangeConfig.find(c => c.value.toString() === qty);
    if (value && value.displayValue) {
      return value.displayValue;
    } else {
      return 'Error: Measured Value no longer exists for this Noun';
    }
  }

  private downloadXLSClick() {
    this.store$.dispatch(new DownloadExcelFileAction({tableData: this.sortedData, name: this.preview.displayName}));
  }

  private operationFormat(operation: string): string {
    switch (operation) {
      case '$gt':
        return '>';
      case '$lt':
        return '<';
      case '$eq':
        return '=';
      default:
        return '';
    }
  }

  public dateFormat(date: Date) {
    const isToday = this.isToday(date);
    if (isToday) {
      return moment(date).format('LT');
    }
    const isYear = this.isYear(date);
    if (isYear) {
      return moment(date).format('MMM D');
    }
    return moment(date).format('ll');
  }

  private isToday = (someDate: Date) => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };

  private isYear = (someDate: Date) => {
    const today = new Date();
    return someDate.getFullYear() === today.getFullYear();
  };
}
