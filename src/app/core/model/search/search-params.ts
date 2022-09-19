export interface SearchParams {
  chapterIds: string[];
  empty: boolean;
  hideDisabled?: boolean;
  sortField: string;
  sortDirection: 'asc' | 'desc' | null;
  text: string;
  name?: string;
  paginationFrom?: string;
  paginationTo?: string;
}
