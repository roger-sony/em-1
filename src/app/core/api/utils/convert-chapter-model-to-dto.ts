import {Chapter} from '../../model/chapter';
import {ChapterDto} from '../dto/chapter.dto';

export function convertChapterModelToDto(model: Partial<Chapter>): ChapterDto {
  return {
    _id: model.id,
    name: model.name,
    description: model.description,
    plot: model.plot,
    startDate: model.startDate?.toISOString(),
    endDate: model.endDate?.toISOString(),
    status: model.status,
    lastUpdated: model.lastUpdated,
    progress: model.progress,
    color: model.color,
    taskCount: model.taskCount,
    inventoryCount: model.inventoryCount,
    conditionCount: model.conditionCount,
    dtableCount: model.dtableCount,
    triggerCount: model.triggerCount,
    activity: [],
    taskActivity: [],
  };
}
