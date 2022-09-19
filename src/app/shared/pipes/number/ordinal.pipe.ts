import {Pipe, PipeTransform} from '@angular/core';
import {getOrdinalIndicator} from '../../utils/number/get-ordinal-indicator';

@Pipe({
  name: 'ordinal',
})
export class OrdinalPipe implements PipeTransform {
  public transform(value: number): unknown {
    return value + getOrdinalIndicator(value);
  }
}
