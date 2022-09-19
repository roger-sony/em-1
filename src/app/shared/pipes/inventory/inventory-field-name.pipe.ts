import {Pipe, PipeTransform} from '@angular/core';
import {transformToTitleCase} from '../../utils/text/transform-to-title-case';

@Pipe({
  name: 'inventoryFieldName',
})
export class InventoryFieldNamePipe implements PipeTransform {
  public transform(field: string): string {
    if (!field) {
      return '';
    }

    if (field === '_last_updated') {
      field = field.substring(1);
    }

    return transformToTitleCase(
      field.replace(/_/g, ' ').replace('item', 'noun').replace('inventory', 'nouns').replace('qty', 'Current Value')
    );
  }
}
