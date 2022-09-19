import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GetChapterTasksAction, GetSingleChapterAction} from '../../../../core/store/chapters/chapters.action';
import {AddTaskToChapterAction} from '../../../../core/store/tasks/tasks.action';
import {selectAllTasks} from '../../../../core/store/tasks/tasks.selector';
import {AddMenuOption} from '../../../../shared/desktop/add-menu/add-menu-option';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'chapter-tasks-control-panel',
  templateUrl: './chapter-tasks-control-panel.component.html',
  styleUrls: ['./chapter-tasks-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterTasksControlPanelComponent implements OnInit, OnChanges {
  @Input()
  public chapterId: string;

  public options$: Observable<AddMenuOption[]>;

  private chapterId$ = new BehaviorSubject('');

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.options$ = this.observeAddMenuOptions();
  }

  private observeAddMenuOptions(): Observable<AddMenuOption[]> {
    return combineLatest([this.store$.pipe(select(selectAllTasks)), this.chapterId$]).pipe(
      map(([tasks, chapterId]) =>
        tasks
          .filter(task => !task.chapterIds.includes(chapterId))
          .map(task => ({
            value: task.id,
            displayValue: task.shortTask,
          }))
      )
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.chapterId && this.chapterId) {
      this.chapterId$.next(this.chapterId);
    }
  }

  public onAdd(option: AddMenuOption) {
    this.store$.dispatch(
      new AddTaskToChapterAction({
        chapterId: this.chapterId,
        taskId: option.value,
        onSuccess: () => this.onAddToChapterSuccess(),
      })
    );
  }

  public onAddToChapterSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapterId}));
    this.store$.dispatch(new GetChapterTasksAction({chapterId: this.chapterId}));
  }

  public onCreate() {
    // TODO use dialog once the new design of task pages is available
    const returnTo = this.router.url;
    this.router
      .navigate(['', {outlets: {dialog: null}}], {relativeTo: this.activatedRoute})
      .then(() => this.router.navigate(['/tasks/new'], {queryParams: {chapterId: this.chapterId, returnTo}}));
  }
}
