import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {FlexSkedTemplate} from '../../model/flex-sked-template';

export interface SkedsState extends EntityState<FlexSkedTemplate> {
  loaded: boolean;
}

export const skedsAdapter = createEntityAdapter<FlexSkedTemplate>({
  sortComparer: (a, b) => (a?.displayName || '').localeCompare(b?.displayName || ''),
});

export const initialSkedsState: SkedsState = skedsAdapter.getInitialState({
  loaded: false,
});
