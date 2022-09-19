import {Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, Input} from '@angular/core';
import {Observable, BehaviorSubject, combineLatest} from 'rxjs';
import {AddMenuOption} from 'src/app/shared/desktop/add-menu/add-menu-option';
import {Store, select} from '@ngrx/store';
import {selectAllDecisionTables} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {map} from 'rxjs/operators';
import {AddDecisionTableToChapterAction} from 'src/app/core/store/decision-tables/decision-tables.action';
import {GetSingleChapterAction, GetChapterPlansAction} from 'src/app/core/store/chapters/chapters.action';
import {PlanDialogService} from 'src/app/dialog/plan-dialog.service';

@Component({
  selector: 'chapter-plans-control-panel',
  templateUrl: './chapter-plans-control-panel.component.html',
  styleUrls: ['./chapter-plans-control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterPlansControlPanelComponent implements OnInit, OnChanges {
  @Input()
  public chapterId: string;

  public options$: Observable<AddMenuOption[]>;

  private chapterId$ = new BehaviorSubject('');

  constructor(private planDialogService: PlanDialogService, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.options$ = this.observeAddMenuOptions();
  }

  private observeAddMenuOptions(): Observable<AddMenuOption[]> {
    return combineLatest([this.store$.pipe(select(selectAllDecisionTables)), this.chapterId$]).pipe(
      map(([plans, chapterId]) =>
        plans
          .filter(plan => !plan.chapterIds.includes(chapterId))
          .map(plan => ({
            value: plan.id,
            displayValue: plan.displayName,
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
      new AddDecisionTableToChapterAction({
        chapterId: this.chapterId,
        decisionTableId: option.value,
        onSuccess: () => this.onAddToChapterSuccess(),
      })
    );
  }

  public onAddToChapterSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapterId}));
    this.store$.dispatch(new GetChapterPlansAction({chapterId: this.chapterId}));
  }

  public onCreate() {
    this.planDialogService.openNewPlanDialog();
  }
}
