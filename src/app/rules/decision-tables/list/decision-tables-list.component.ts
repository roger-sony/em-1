import {Component, OnInit} from '@angular/core';
import {DecisionTableService} from '../../../core/api/legacy/decision-table.service';
import {RuleTriggerService} from '../../../core/api/legacy/rule-trigger.service';
import {SpinnerService} from '../../../core/page/spinner.service';
import {DecisionTablePreviewModalService} from '../../../services/decision-table-preview-modal.service';
import {TitleService} from '../../../core/page/title.service';

/* tslint:disable:no-any */
@Component({
  selector: 'decision-tables',
  templateUrl: './decision-tables-list.component.html',
  styleUrls: ['./decision-tables-list.component.css'],
})
export class DecisionTablesListComponent implements OnInit {
  decisionTables: any[];

  preview: any;

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private dTableService: DecisionTableService,
    private rtService: RuleTriggerService,
    private previewService: DecisionTablePreviewModalService,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Decision Tables');

    this.loading.show();
    this.getDecisionTables();
    // this subscribes to service that sends dTable data to preview modal
    this.previewService.currentMessage.subscribe(message => (this.preview = message));
  }

  /*******************************************************************************
                                Service Calls
*******************************************************************************/
  getDecisionTables(): void {
    this.dTableService.getDTables().subscribe(dt => {
      this.decisionTables = dt;
      this.loading.hide();
    });
  }

  runRuleOnDemand(dTable: any): void {
    // when dTable is run from dTable screen, save report
    this.rtService.runDTableOnDemand(dTable._id, true, true).subscribe();
  }

  getRulePreview(dTable: any) {
    this.previewService.changeMessage(dTable._id);
  }
}
