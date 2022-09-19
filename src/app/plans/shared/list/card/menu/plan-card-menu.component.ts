import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {debounceTime, take} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {
  CreateDecisionTableAction,
  DeleteDecisionTableAction,
  RunDecisionTableRuleAction,
} from 'src/app/core/store/decision-tables/decision-tables.action';
import {PlanDialogService} from 'src/app/dialog/plan-dialog.service';
import {DecisionTable} from '../../../../../core/model/decision-table';
import {MobileService} from '../../../../../core/page/mobile.service';
import {selectRouterParam} from '../../../../../core/store/router/router.selector';
import {MessageService} from '../../../../../services/message.service';
import {OphMenuComponent} from '../../../../../shared/design/oph-menu/oph-menu.component';
import {PlanDeleteDialogComponent} from 'src/app/shared/plans/delete-dialog/plan-delete-dialog.component';

@Component({
  selector: 'plan-card-menu',
  templateUrl: './plan-card-menu.component.html',
  styleUrls: ['./plan-card-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCardMenuComponent implements OnInit {
  @Input()
  plan: DecisionTable;

  @Input()
  tasks: Task[];

  @Input()
  unitOfMeasures: UnitOfMeasure[];

  @Input()
  card: boolean;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild('menuButton')
  public menuButtonElement: ElementRef<HTMLButtonElement>;

  public mobile$: Observable<boolean>;
  public isOpened: boolean = false;

  constructor(
    private dialog: MatDialog,
    private mobileService: MobileService,
    private router: Router,
    private planDialogService: PlanDialogService,
    private messageService: MessageService,
    private store$: Store<{}>
  ) {}

  public ngOnInit() {
    this.mobile$ = this.mobileService.observeMobile();
  }

  public onMenuClick(e: Event) {
    e.stopPropagation();
    this.menu.open();
  }

  public onViewOptionsClick() {
    this.router.navigate(['/plans', this.plan.id]);
    this.menu.close();
  }

  public onRunPlanClick() {
    this.store$.dispatch(
      new RunDecisionTableRuleAction({
        decisionTableId: this.plan.id,
        saveReport: true,
        triggerActions: true,
        onSuccess: () => this.onRunPlanSuccess(),
        onFailure: () => this.onRunPlanFailure(),
      })
    );
    this.menu.close();
  }

  private onRunPlanSuccess() {
    this.messageService.add('Success! Your plan has been run.');
  }

  private onRunPlanFailure() {
    this.messageService.add('Error: There was a problem running your plan.');
  }

  public onPreviewClick() {
    this.mobile$.pipe(debounceTime(100), take(1)).subscribe(mobile => {
      if (!mobile) {
        this.planDialogService.openPlanPreviewDialog(this.plan.id);
        return;
      }
      this.router.navigate(['plans', this.plan.id, 'preview'], {
        queryParams: {returnTo: this.router.url},
      });
    });
    this.menu.close();
  }

  public onDuplicateClick() {
    const duplicatePlan = {
      ...this.plan,
      displayName: `${this.plan.displayName} (COPY)`,
    };
    delete duplicatePlan.id;
    this.store$.dispatch(
      new CreateDecisionTableAction({
        decisionTable: duplicatePlan,
        onSuccess: decisionTable => this.onDuplicatePlanSuccess(decisionTable),
        onFailure: () => this.onDuplicatePlanFailure(),
      })
    );
    this.menu.close();
  }

  private onDuplicatePlanSuccess(decisionTable: DecisionTable) {
    this.messageService.add('Success! Your plan has been duplicated');
  }

  private onDuplicatePlanFailure() {
    this.messageService.add('Error: There was a problem duplicating your plan.');
  }

  public onDeleteClick() {
    this.menu.close();
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
