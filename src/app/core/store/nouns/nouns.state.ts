import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {NounDto} from '../../api/dto/noun.dto';

export interface NounsState extends EntityState<NounDto> {
  loaded: boolean;
  nouns: NounDto[];
  displayedColumns: string[];
  possibleColumns: string[];
}

export const nounsAdapter = createEntityAdapter<NounDto>();

export const initialNounsState: NounsState = nounsAdapter.getInitialState({
  loaded: false,
  nouns: null,
  displayedColumns: [
    'display_name',
    'source',
    'last_updated',
    'location',
    'qty',
    'unit_of_measure',
    'adjust_inventory',
    'active',
    'details',
  ],
  possibleColumns: [],
});
