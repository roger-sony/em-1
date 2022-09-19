import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'plotGroupActive',
})
export class PlotGroupActivePipe implements PipeTransform {
  public transform(url: string): boolean {
    return url && url.startsWith('/paragraphs');
  }
}
