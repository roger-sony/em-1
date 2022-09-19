import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'inventoryPreviewDisplay',
})
export class InventoryPreviewDisplayPipe implements PipeTransform {
  transform(value: string): unknown {
    if (value === '_AnyNoun') {
      return 'Any Noun';
    }
    return value;
  }
}
