import {Pipe, PipeTransform} from '@angular/core';
import {convertHexColorToRgba} from '../../utils/color/convert-hex-color-to-rgba';

@Pipe({
  name: 'hexToRgba',
})
export class HexToRgbaPipe implements PipeTransform {
  public transform(hex: string, opacity: number): unknown {
    return convertHexColorToRgba(hex, opacity);
  }
}
