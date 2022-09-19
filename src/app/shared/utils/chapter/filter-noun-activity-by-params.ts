import {InventoryItem} from 'src/app/core/model/inventory-item';
import * as moment from 'moment';

export function filterNounActivityByParams(nouns: InventoryItem[], dateString: string): InventoryItem[] {
  if (!dateString) {
    return nouns;
  }

  const dateArray = dateString.split('%');
  return (nouns || []).filter(
    noun =>
      moment(noun.lastUpdated).startOf('day').isSameOrAfter(moment(dateArray[0]).startOf('day')) &&
      moment(noun.lastUpdated).startOf('day').isSameOrBefore(moment(dateArray[1]).startOf('day'))
  );
}
