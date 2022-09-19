import {SearchParams} from '../../../core/model/search/search-params';
import {InventoryItem} from '../../../core/model/inventory-item';

export function filterNounsBySearchParams(nouns: InventoryItem[], searchParams: SearchParams): InventoryItem[] {
  const {text, chapterIds, sortDirection, empty} = searchParams || {};
  const filteredNouns = (nouns || [])
    .filter(noun => !text || noun.subcategory?.toLowerCase().includes(text.toLowerCase()))
    .filter(noun => !chapterIds?.length || chapterIds.every(chapterId => noun.chapterIds?.includes(chapterId)))
    .filter(noun => !empty);

  const sortField = searchParams?.sortField || 'subcategory';

  // tslint:disable-next-line:no-any
  return filteredNouns.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (Number.isInteger(a[sortField]) && Number.isInteger(b[sortField])) {
      return (a[sortField] - b[sortField]) * (sortDirection === 'desc' ? -1 : 1);
    } else {
      return String(a[sortField] || '').localeCompare(String(b[sortField] || '')) * (sortDirection === 'desc' ? -1 : 1);
    }
  });
}
