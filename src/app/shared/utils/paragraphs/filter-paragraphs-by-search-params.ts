import {Params} from '@angular/router';
import {SearchParams} from '../../../core/model/search/search-params';
import {Paragraph} from '../../../core/model/paragraph';

export function filterParagraphsByPagination(
  paragraphs: Paragraph[],
  searchParams: SearchParams,
  queryParams: Params
): Paragraph[] {
  const paginationFrom = queryParams?.paginationFrom || 0;
  const paginationTo = queryParams?.paginationTo || 20;
  return paragraphs.slice(paginationFrom, paginationTo);
}

export function filterParagraphsBySearchParams(paragraphs: Paragraph[], searchParams: SearchParams): Paragraph[] {
  const {text, sortDirection, empty} = searchParams || {};
  const filteredParagraphs = (paragraphs || [])
    .filter(paragraph => !text || paragraph.name?.toLowerCase().includes(text.toLowerCase()))
    .filter(() => !empty);

  const sortField = searchParams?.sortField || 'name';

  // tslint:disable-next-line:no-any
  return filteredParagraphs.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (Number.isInteger(a[sortField]) && Number.isInteger(b[sortField])) {
      return (a[sortField] - b[sortField]) * (sortDirection === 'desc' ? -1 : 1);
    } else {
      return String(a[sortField] || '').localeCompare(String(b[sortField] || '')) * (sortDirection === 'desc' ? -1 : 1);
    }
  });
}
