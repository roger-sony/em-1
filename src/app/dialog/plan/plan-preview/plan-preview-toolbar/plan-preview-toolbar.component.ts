import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'plan-preview-toolbar',
  templateUrl: './plan-preview-toolbar.component.html',
  styleUrls: ['./plan-preview-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPreviewToolbarComponent implements OnInit {
  @Output()
  public downloadPDF = new EventEmitter();

  @Output()
  public downloadXLS = new EventEmitter();

  @Output()
  public runPlan = new EventEmitter();

  @Output()
  public saveReport = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public downloadPDFCLick() {
    this.downloadPDF.emit();
  }

  public downloadXLSCLick() {
    this.downloadXLS.emit();
  }

  public runPlanClick() {
    this.runPlan.emit();
  }

  public saveReportClick() {
    this.saveReport.emit();
  }
}
