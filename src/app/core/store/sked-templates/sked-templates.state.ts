import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {SkedTemplate} from '../../model/sked-template';

export interface SkedTemplatesState extends EntityState<SkedTemplate> {}

export const skedTemplatesAdapter = createEntityAdapter<SkedTemplate>();

export const initialSkedTemplatesState: SkedTemplatesState = skedTemplatesAdapter.getInitialState();
