import {Pipe, PipeTransform} from '@angular/core';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';

@Pipe({
  name: 'rangeMeasurementValue',
})
export class RangeMeasurementValuePipe implements PipeTransform {
  // tslint:disable-next-line:no-any
  transform(subcategory: string, qty: string | any, uom: Record<string, UnitOfMeasure>): string {
    if (qty.$numberDecimal) {
      qty = qty.$numberDecimal;
    }
    const value = uom[subcategory].rangeConfig.find(c => c.value === qty);
    if (value && value.displayValue) {
      return value.displayValue;
    } else {
      return 'Error: Measured Value no longer exists for this Noun';
    }
  }
}
