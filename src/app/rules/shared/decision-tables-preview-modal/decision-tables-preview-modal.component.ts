import {Component, OnInit} from '@angular/core';
import {DecisionTablePreviewModalService} from '../../../services/decision-table-preview-modal.service';
import {RuleTriggerService} from '../../../core/api/legacy/rule-trigger.service';
import {UnitOfMeasureService} from '../../../core/api/legacy/unit-of-measure.service';
import {TaskService} from '../../../core/api/legacy/task.service';
import {DecisionTableReportsService} from '../../../core/api/legacy/decision-table-reports.service';
import {UnitOfMeasureDto} from '../../../core/api/dto/unit-of-measure.dto';
import {DecisionTablePreviewDto} from '../../../core/api/dto/decision-table-preview.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'decision-tables-preview-modal',
  templateUrl: './decision-tables-preview-modal.component.html',
  styleUrls: ['./decision-tables-preview-modal.component.css'],
})
export class DecisionTablesPreviewModalComponent implements OnInit {
  id: any;
  preview: DecisionTablePreviewDto;
  itemMeasurementSettings: Record<string, UnitOfMeasureDto>;
  tasks: any;

  constructor(
    private previewService: DecisionTablePreviewModalService,
    private rtService: RuleTriggerService,
    private taskService: TaskService,
    private reportService: DecisionTableReportsService,
    private uomService: UnitOfMeasureService
  ) {}

  ngOnInit() {
    this.getItemMeasurementSettings();
    this.getTasks();
    this.previewService.currentMessage.subscribe(message => (this.id = message));
    this.getRulePreview(this.id);
  }

  /******************************************************************************
                              Service Calls
******************************************************************************/

  getRulePreview(id: string): void {
    this.rtService.getRulePreview(id).subscribe(r => {
      this.preview = r;
    });
  }

  getItemMeasurementSettings(): void {
    this.uomService.getUOMConfigs().subscribe(c => {
      this.itemMeasurementSettings = c.reduce(
        (map: Record<string, UnitOfMeasureDto>, obj: UnitOfMeasureDto) => ((map[obj.noun_subcategory] = obj), map),
        {}
      );
    });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(t => {
      // Create hash table to lookup tasks by _id
      this.tasks = t.reduce((map: Record<string, any>, obj: any) => ((map[obj._id] = obj), map), {});
    });
  }

  getRangeMeasurementValue(subcategory: string, qty: any) {
    if (qty.$numberDecimal) {
      qty = qty.$numberDecimal;
    }
    const valueObj = this.itemMeasurementSettings[subcategory].range_config.find(c => c.value === qty);
    if (valueObj && valueObj.display_value) {
      return valueObj.display_value;
    } else {
      return 'Error: Measured Value no longer exists for this Noun';
    }
  }

  /******************************************************************************
                              Click Handlers
******************************************************************************/

  togglePreviewModal(): void {
    this.preview = null;
    this.previewService.changeMessage(null);
  }

  runRuleOnDemand(dTable: any): void {
    // when dTable is run from dTable screen, save report
    this.rtService.runDTableOnDemand(dTable.dtableID, true, false).subscribe();
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
      this.reportService.addReport(this.preview).subscribe();
      this.togglePreviewModal();
    });
  }
}
