import {Component, ChangeDetectionStrategy, Input, ViewChild} from '@angular/core';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';
import {MatDialog} from '@angular/material/dialog';
import {MessageService} from 'src/app/services/message.service';
import {Router} from '@angular/router';
import {Store, select} from '@ngrx/store';
import {
  RemoveDecisionTableFromChapterAction,
  DeleteDecisionTableAction,
} from 'src/app/core/store/decision-tables/decision-tables.action';
import {GetSingleChapterAction, GetChapterPlansAction} from 'src/app/core/store/chapters/chapters.action';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {take} from 'rxjs/operators';
import {PlanDeleteDialogComponent} from '../../../delete-dialog/plan-delete-dialog.component';

@Component({
  selector: 'plan-card-menu',
  templateUrl: './plan-card-menu.component.html',
  styleUrls: ['./plan-card-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardMenuComponent {
  @Input()
  public chapterId: string;

  @Input()
  public plan: DecisionTable;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  constructor(
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public onToggleClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.open();
  }

  public onRemoveFromChapterClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.store$.dispatch(
      new RemoveDecisionTableFromChapterAction({
        chapterId: this.chapterId,
        decisionTableId: this.plan.id,
        onSuccess: () => this.onRemoveFromChapterSuccess(),
      })
    );
  }

  public onRemoveFromChapterSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapterId}));
    this.store$.dispatch(new GetChapterPlansAction({chapterId: this.chapterId}));
  }

  public onEditClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.router.navigate(['/plans', this.plan.id], {queryParams: {returnTo: this.router.url}});
  }

  public onDeleteClick(event: MouseEvent) {
    event.stopPropagation();
    this.menu.close();
    this.showDeleteConfirmDialog();
  }

  public showDeleteConfirmDialog() {
    const dialog = this.dialog.open(PlanDeleteDialogComponent, {
      backdropClass: 'oph-backdrop',
      data: this.plan,
      panelClass: 'oph-dialog',
    });
    dialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.deletePlan();
      }
    });
  }

  private deletePlan() {
    this.store$.dispatch(
      new DeleteDecisionTableAction({
        id: this.plan.id,
        onSuccess: () => this.onDeletePlanSuccess(),
        onFailure: () => this.onDeletePlanFailure(),
      })
    );
  }

  private onDeletePlanSuccess() {
    this.store$.dispatch(new GetSingleChapterAction({chapterId: this.chapterId}));
    this.store$.dispatch(new GetChapterPlansAction({chapterId: this.chapterId}));
    this.store$.pipe(select(selectRouterParam('planId')), take(1)).subscribe(planId => {
      if (planId) {
        this.router.navigate(['/plans']);
      }
      this.messageService.add('Success! Your plan has been deleted.');
    });
  }

  private onDeletePlanFailure() {
    this.messageService.add('Error: There was a problem deleting your plan.');
  }
}
