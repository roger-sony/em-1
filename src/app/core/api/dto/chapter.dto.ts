import {ChapterTask} from '../../model/chapter-task';
import {InventoryItemDto} from './inventory-item.dto';

export interface ChapterDto {
  _id: string;
  name: string;
  plot: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
  lastUpdated: Date;
  progress: number;
  color: string;
  taskCount: number;
  inventoryCount: number;
  dtableCount: number;
  triggerCount: number;
  conditionCount: number;
  activity: InventoryItemDto[];
  taskActivity: ChapterTask[];
}
