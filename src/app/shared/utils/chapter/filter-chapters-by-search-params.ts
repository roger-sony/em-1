import {SearchParams} from '../../../core/model/search/search-params';
import {Chapter} from '../../../core/model/chapter';

export function filterChaptersBySearchParams(chapters: Chapter[], searchParams: SearchParams): Chapter[] {
  const {text, sortDirection, empty} = searchParams || {};
  const filteredChapters = (chapters || [])
    .filter(chapter => !text || chapter.name?.toLowerCase().includes(text.toLowerCase()))
    .filter(
      chapter =>
        !empty ||
        (!chapter.inventoryCount &&
          !chapter.conditionCount &&
          !chapter.triggerCount &&
          !chapter.taskCount &&
          !chapter.dtableCount)
    );

  const sortField = searchParams?.sortField || 'name';

  // tslint:disable-next-line:no-any
  return filteredChapters.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (Number.isInteger(a[sortField]) && Number.isInteger(b[sortField])) {
      return (a[sortField] - b[sortField]) * (sortDirection === 'desc' ? -1 : 1);
    } else {
      return String(a[sortField] || '').localeCompare(String(b[sortField] || '')) * (sortDirection === 'desc' ? -1 : 1);
    }
  });
}
