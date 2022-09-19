import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {Chapter} from '../../model/chapter';
import {Task} from '../../model/task';
import {DecisionTable} from '../../model/decision-table';
import {InventoryItem} from '../../model/inventory-item';

export interface ChaptersState extends EntityState<Chapter> {
  loaded: boolean;
  tasksMap: Record<string, Task[]>;
  nounsMap: Record<string, InventoryItem[]>;
  plansMap: Record<string, DecisionTable[]>;
}

export const chaptersAdapter = createEntityAdapter<Chapter>({
  sortComparer: (a, b) => (a?.name || '').localeCompare(b?.name || ''),
});

export const initialChaptersState: ChaptersState = chaptersAdapter.getInitialState({
  loaded: false,
  tasksMap: {},
  nounsMap: {},
  plansMap: {},
});
