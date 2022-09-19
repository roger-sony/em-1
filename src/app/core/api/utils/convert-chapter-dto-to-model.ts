import {Chapter} from '../../model/chapter';
import {ChapterDto} from '../dto/chapter.dto';
import * as moment from 'moment';
import {convertInventoryItemDtoToModel} from './convert-inventory-item-dto-to-model';

export function convertChapterDtoToModel(dto: ChapterDto): Chapter {
  return {
    color: dto.color,
    conditionCount: dto.conditionCount,
    id: dto._id,
    description: dto.description,
    dtableCount: dto.dtableCount,
    endDate: dto.endDate ? moment(dto.endDate) : null,
    inventoryCount: dto.inventoryCount,
    lastUpdated: dto.lastUpdated ? new Date(dto.lastUpdated) : null,
    name: dto.name,
    progress: dto.progress || 0,
    startDate: dto.startDate ? moment(dto.startDate) : null,
    status: dto.status || 'draft',
    plot: dto.plot,
    taskCount: dto.taskCount,
    triggerCount: dto.triggerCount,
    nounActivity: dto.activity.map(item => convertInventoryItemDtoToModel(item)) || [],
    taskActivity: dto.taskActivity || [],
  };
}
