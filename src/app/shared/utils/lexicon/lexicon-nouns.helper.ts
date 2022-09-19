import {SearchParams} from '../../../core/model/search/search-params';
import {Params} from '@angular/router';
import {NounDto} from '../../../core/api/dto/noun.dto';

export function filterLexiconNounsBySearchParamsPagination(
  nouns: NounDto[],
  searchParams: SearchParams,
  queryParams: Params
): NounDto[] {
  const paginationFrom = queryParams?.paginationFrom || 0;
  const paginationTo = queryParams?.paginationTo || 20;
  return filterLexiconNounsBySearchParams(nouns, searchParams).slice(paginationFrom, paginationTo);
}

export function filterLexiconNounsBySearchParams(nouns: NounDto[], searchParams: SearchParams): NounDto[] {
  const {text, sortDirection, empty} = searchParams || {};
  const filteredNouns = (nouns || [])
    .filter(noun => !text || noun.name?.toLowerCase().includes(text.toLowerCase()))
    .filter(() => !empty);

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

export function filterLexiconNounsTableBySearchParams(nouns: NounDto[], queryParams: Params): NounDto[] {
  const {} = queryParams || {};
  return nouns || [];
  // .filter(noun => !source || noun.source?.toLowerCase().includes(source.toLowerCase()))
  // .filter(noun => !subcategory || noun.subcategory?.toLowerCase().includes(subcategory.toLowerCase()))
  // .filter(noun => !unit_of_measure || noun.unitOfMeasure?.toLowerCase().includes(unit_of_measure.toLowerCase()))
  // .filter(noun => !color || noun.color?.toLowerCase().includes(color.toLowerCase()))
  // .filter(noun => !maker || noun.maker?.toLowerCase().includes(maker.toLowerCase()))
  // .filter(noun => !model || noun.model?.toLowerCase().includes(model.toLowerCase()))
  // .filter(noun => !perishable || `${noun.perishable}`.includes(perishable))
  // .filter(noun => !sku || noun.sku?.toLowerCase().includes(sku.toLowerCase()))
  // .filter(noun => !type || noun.type?.toLowerCase().includes(type.toLowerCase()))
  // .filter(noun => !last_updated || noun.lastUpdated === last_updated)
  // .filter(noun => !display_name || noun.displayName?.toLowerCase().includes(display_name.toLowerCase()))
  // .filter(noun => !master_item || noun.masterItem?.toLowerCase().includes(master_item.toLowerCase()))
  // .filter(noun => !category || noun.category?.toLowerCase().includes(category.toLowerCase()))
  // .filter(noun => !qty || noun.quantity?.toString().toLowerCase().includes(qty.toString().toLowerCase()))
  // .filter(noun => !location || noun.location?.toLowerCase().includes(location.toLowerCase()))
  // .filter(noun => includeInactive || !includeInactive && noun.active === true)
  // .filter(noun => !includeTypes && includeTypes !== null || includeTypes.split(',').some((t: string) => t === noun.type));
}
