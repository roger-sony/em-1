import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'columnName',
})
export class ColumnNamePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'shortTask':
        return 'Task Name';

      case 'category':
        return 'Category';

      case 'effort':
        return 'Duration';

      case 'location':
        return 'Location';

      case 'priority':
        return 'Priority';

      case 'movability':
        return 'Movability';

      case 'abandon':
        return 'Abandon';

      default:
        return 'Unknown';
    }
  }
}
