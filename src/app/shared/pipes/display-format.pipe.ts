import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TaskCheckListItemDto} from '../../core/api/dto/task.dto';

/* tslint:disable:no-any */
// TODO: Create a pipe to format dates, strings, & qty values.
@Pipe({
  name: 'displayFormat',
})
export class DisplayFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, fieldName: string, args?: any): any {
    if (value === 0) {
      value = 0;
    } else if (value === false) {
      value = value;
    } else {
      value = value || '';
    }
    fieldName = fieldName || '';
    switch (fieldName) {
      case 'active':
        return '';
      case 'expiry_date':
        // TODO: Figure out +0000 timezone.
        return super.transform(value, 'M/d/yy');
      case 'last_updated':
        return super.transform(value, 'M/d/yy h:mm a');
      case 'dateCreated':
        return super.transform(value, 'M/d/yy h:mm a');
      case 'dateAssigned':
        return super.transform(value, 'M/d/yy h:mm a');
      case 'dateCompleted':
        return super.transform(value, 'M/d/yy h:mm a');
      case 'startedAt':
        return super.transform(value, 'M/d/yy h:mm a');
      case 'completedAt':
        return super.transform(value, 'M/d/yy h:mm a');
      case 'qty':
        return Math.round(parseFloat(value) * 100) / 100 || 0; //round to 2 decimal places
      case '$gt':
        return '>';
      case '$lt':
        return '<';
      case '$eq':
        return '=';
      case 'rangeValue':
        const config = args.find((item: any) => String(item.value) === String(value));
        return config?.display_value || '';
      case 'assignedTo':
        const {rolesMap} = args || {};
        const role = rolesMap && rolesMap[value];
        return role?.displayName;
      case 'assignedToUser':
        const {usersMap} = args || {};
        const user = usersMap && usersMap[value];
        return user?.userName;
      case 'pauses':
        const pauses = (value || []).map(
          ({startPause, endPause}: {startPause: string; endPause: string}) =>
            `${super.transform(startPause, 'M/d/yy h:mm a')} - ${super.transform(endPause, 'M/d/yy h:mm a')}`
        );
        return pauses.join(', ');
      case 'checkList':
        return (value || []).map(({displayValue}: TaskCheckListItemDto) => displayValue).join(', ');
      case 'ref_fact':
        return value?.length ? JSON.stringify(value) : value;
      default:
        return value;
    }
  }
}
