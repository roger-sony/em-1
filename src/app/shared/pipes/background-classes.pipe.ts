import {Pipe, PipeTransform} from '@angular/core';
import {Color, ColorOpacity} from '../design/color';
import {convertColorToBackgroundClasses} from '../utils/color/convert-color-to-background-classes';

@Pipe({
  name: 'backgroundClasses',
})
export class BackgroundClassesPipe implements PipeTransform {
  public transform(color: Color, colorOpacity = ColorOpacity.Default): Record<string, boolean> {
    return convertColorToBackgroundClasses(color, colorOpacity);
  }
}
