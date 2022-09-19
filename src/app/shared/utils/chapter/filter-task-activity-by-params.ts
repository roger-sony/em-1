import {ChapterTask} from 'src/app/core/model/chapter-task';

export function filterTaskActivityByParams(
  tasks: ChapterTask[],
  dateString: string,
  filterString: string
): ChapterTask[] {
  // const dateArray = dateString?.split('%') || [];
  const filterArray = filterString?.split(',') || [];
  return (
    (tasks || [])
      //TODO: add back in when there are dates
      // .filter(
      //     task =>
      //     !dateArray.length ||
      //     (moment(task.nextScheduled).startOf('day').isSameOrAfter(moment(dateArray[0]).startOf('day')) &&
      //         moment(task.nextScheduled).startOf('day').isSameOrBefore(moment(dateArray[1]).startOf('day')))
      // )
      .filter(task => !filterArray.length || filterArray.includes(task.status))
  );
}
