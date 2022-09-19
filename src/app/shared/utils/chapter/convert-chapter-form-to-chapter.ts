import {ChapterForm} from '../../../core/model/form/chapter-form';
import {Chapter} from '../../../core/model/chapter';

export function convertChapterFormToChapter(chapterForm: ChapterForm): Partial<Chapter> {
  return {
    name: chapterForm.name,
    plot: chapterForm.plot,
    description: chapterForm.description,
    startDate: chapterForm.startDate,
    endDate: chapterForm.endDate,
    progress: chapterForm.progress,
    color: chapterForm.color,
  };
}
