import {Moment} from 'moment';
import {ChapterTask} from './chapter-task';
import {InventoryItem} from './inventory-item';

export interface Chapter {
  id: string;
  name: string;
  plot: string;
  description: string;
  startDate: Moment;
  endDate: Moment;
  status: string;
  lastUpdated: Date;
  progress: number;
  color: string;
  taskCount: number;
  inventoryCount: number;
  dtableCount: number;
  triggerCount: number;
  conditionCount: number;
  nounActivity: InventoryItem[];
  taskActivity: ChapterTask[];
  // TODO add other fields
}
