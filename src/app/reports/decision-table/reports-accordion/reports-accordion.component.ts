import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RangeConfigDto} from '../../../core/api/dto/unit-of-measure.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'app-reports-accordion',
  templateUrl: './reports-accordion.component.html',
  styleUrls: ['./reports-accordion.component.scss'],
})
export class ReportsAccordionComponent {
  @Input() reports: any[];
  @Input() itemMeasurementSettings: any;
  @Output() openReportModalClick = new EventEmitter<any>();

  toggleReportDetailModal(report: any) {
    console.log('Report is', report);
    this.openReportModalClick.emit(report);
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
}
