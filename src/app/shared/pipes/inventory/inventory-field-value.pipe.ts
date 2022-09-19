import {Pipe, PipeTransform} from '@angular/core';
import {UnitOfMeasure} from '../../../core/model/unit-of-measure';
import {formatDurationMinutes} from '../../utils/date/format-duration-minutes';

@Pipe({
  name: 'inventoryFieldValue',
})
export class InventoryFieldValuePipe implements PipeTransform {
  // tslint:disable-next-line:no-any
  public transform(value: any, fieldName?: string, unitOfMeasure?: UnitOfMeasure): string {
    // TODO extract unit of measure type to enum
    if (fieldName === 'qty' && unitOfMeasure?.type === 'range') {
      return (
        unitOfMeasure.rangeConfig.find(item => String(item.value) === String(value))?.displayValue ?? String(value)
      );
    } else if (fieldName === 'expiry_date') {
      return `${value} days from now`;
    } else if (fieldName === '_last_updated') {
      return `${formatDurationMinutes(value)} ago`;
    } else {
      return String(value);
    }
  }
}
