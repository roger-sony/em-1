import {SearchParams} from '../../../core/model/search/search-params';
import {FlexSkedTemplate} from '../../../core/model/flex-sked-template';

export function filterSkedTemplatesBySearchParams(
  templates: FlexSkedTemplate[],
  searchParams: SearchParams
): FlexSkedTemplate[] {
  const {sortDirection, empty} = searchParams || {};
  const filteredTemplates = (templates || []).filter(template => !empty || !template.skeds.length);

  const sortField = searchParams?.sortField || 'displayName';

  // tslint:disable-next-line:no-any
  return filteredTemplates.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (Number.isInteger(a[sortField]) && Number.isInteger(b[sortField])) {
      return (a[sortField] - b[sortField]) * (sortDirection === 'desc' ? -1 : 1);
    } else {
      return String(a[sortField] || '').localeCompare(String(b[sortField] || '')) * (sortDirection === 'desc' ? -1 : 1);
    }
  });
}
