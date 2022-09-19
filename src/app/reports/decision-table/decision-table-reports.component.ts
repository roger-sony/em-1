import {Component, OnInit} from '@angular/core';
import {DecisionTableReportsService} from '../../core/api/legacy/decision-table-reports.service';
import {DecisionTableService} from '../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../core/api/legacy/rule-trigger.service';
import {UnitOfMeasureService} from '../../core/api/legacy/unit-of-measure.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {TitleService} from '../../core/page/title.service';
import {RangeConfigDto, UnitOfMeasureDto} from '../../core/api/dto/unit-of-measure.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'decision-table-reports',
  templateUrl: './decision-table-reports.component.html',
  styleUrls: ['./decision-table-reports.component.css'],
})
export class DecisionTableReportsComponent implements OnInit {
  reports: any[];
  reportsDryRun: any[];
  reportsActualRun: any[];
  dTables: any[];
  itemMeasurementSettings: any;
  showNewReportModal: boolean = false;
  showRunOnDemandModal: boolean = false;
  showReportDetailModal: boolean = false;
  activeReport: any = {};

  /*******************************************************************
                      Constructor, Lifecycle Hooks
  *******************************************************************/
  constructor(
    private reportService: DecisionTableReportsService,
    private decisionTableService: DecisionTableService,
    private ruleTriggerService: RuleTriggerService,
    private uomService: UnitOfMeasureService,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Decision Table Reports');

    this.loading.show();
    this.getReports();
    this.getDTables();
    this.getItemMeasurementSettings();
  }

  /*******************************************************************
                            Service Calls
  *******************************************************************/
  getReports(): void {
    this.loading.show();
    this.reportService.getReports().subscribe(r => {
      // TODO: This is a hotfix to fix performance issues with this component.
      // Eventually, we should paginate this data and perhaps use a more
      // performant component for displaying the reports, e.g. material data table
      this.reports = r.slice(0, 80);
      this.reportsDryRun = [];
      this.reportsActualRun = [];
      this.reports.forEach(rep => {
        if (rep.triggerActions) {
          this.reportsActualRun.push(rep);
        } else {
          this.reportsDryRun.push(rep);
        }
      });
    });
    this.loading.hide();
  }

  getDTables(): void {
    this.loading.show();
    this.decisionTableService.getDTables().subscribe(d => {
      this.dTables = d;
      this.loading.hide();
    });
  }

  getItemMeasurementSettings(): void {
    this.loading.show();
    this.uomService.getUOMConfigs().subscribe(c => {
      this.itemMeasurementSettings = c.reduce(
        (map: Record<string, UnitOfMeasureDto>, obj) => ((map[obj.noun_subcategory] = obj), map),
        {}
      );
      this.loading.hide();
    });
  }

  // TODO: This should probably be factored out into a service
  getRangeMeasurementValue(subcategory: string, qty: number) {
    const valueObj = this.itemMeasurementSettings[subcategory].range_config.find(
      (c: RangeConfigDto) => c.value === qty
    );
    if (valueObj && valueObj.display_value) {
      return valueObj.display_value;
    } else {
      return 'Error: Current Value no longer exists for this Noun';
    }
  }

  /*******************************************************************
                            Click Handlers
  *******************************************************************/
  toggleNewReportModal(): void {
    this.showNewReportModal = !this.showNewReportModal;
  }

  toggleRunOnDemandModal(): void {
    this.showRunOnDemandModal = !this.showRunOnDemandModal;
  }

  toggleReportDetailModal(report?: any): void {
    this.showReportDetailModal = !this.showReportDetailModal;
    this.activeReport = report ? report : {};
  }

  handleRunReportClick(triggerActions?: boolean) {
    const saveReport = true;
    triggerActions = triggerActions ? true : false;
    this.ruleTriggerService.runDTableOnDemand(this.activeReport.rule, saveReport, triggerActions).subscribe(r => {
      this.toggleRunOnDemandModal();
      this.getReports();
    });
  }
}
