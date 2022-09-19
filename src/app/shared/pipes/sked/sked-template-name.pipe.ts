import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {SkedTemplate} from '../../../core/model/sked-template';

@Pipe({
  name: 'skedTemplateName',
})
export class SkedTemplateNamePipe implements PipeTransform {
  public transform(skedTemplate: SkedTemplate): string {
    return (
      moment(skedTemplate?.displayName?.slice(0, 2), 'dd').format('dddd') +
      ' ' +
      moment(skedTemplate?.startTime, 'HH:mm').format('ha')
    );
  }
}
