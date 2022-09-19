import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dictionary} from '@ngrx/entity';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {
  AddDecisionTableReportAction,
  GetDecisionTablePreviewAction,
  GetSingleDecisionTableAction,
  RunDecisionTableRuleAction,
} from 'src/app/core/store/decision-tables/decision-tables.action';
import {selectDecisionTablePreview} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {selectRouterQueryParam} from 'src/app/core/store/router/router.selector';
import {selectTasksMap} from 'src/app/core/store/tasks/tasks.selector';
import {selectUnitOfMeasuresNounSubcategoryMap} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {DecisionTablePreview} from '../../core/model/decision-table-preview';
import {MobileService} from '../../core/page/mobile.service';
import {PlanDialogService} from '../../dialog/plan-dialog.service';
import {MessageService} from '../../services/message.service';
import {TitleService} from '../../core/page/title.service';

@Component({
  selector: 'plans-preview-mobile',
  templateUrl: './plans-preview-mobile.component.html',
  styleUrls: ['./plans-preview-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlansPreviewMobileComponent implements OnInit, OnDestroy {
  private planId: string;
  public preview$: Observable<DecisionTablePreview>;
  public tasks$: Observable<Dictionary<Task>>;
  public uom$: Observable<Dictionary<UnitOfMeasure>>;
  public returnTo$: Observable<string>;

  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private mobileService: MobileService,
    private planDialogService: PlanDialogService,
    private router: Router,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.planId = this.activatedRoute.snapshot.paramMap.get('planId');
    this.store$.dispatch(new GetSingleDecisionTableAction({id: this.planId}));
    this.store$.dispatch(new GetDecisionTablePreviewAction({id: this.planId}));
    this.preview$ = this.store$.pipe(select(selectDecisionTablePreview(this.planId)));
    this.returnTo$ = this.store$.pipe(select(selectRouterQueryParam('returnTo')));
    this.uom$ = this.store$.pipe(select(selectUnitOfMeasuresNounSubcategoryMap));
    this.tasks$ = this.store$.pipe(select(selectTasksMap));

    this.subscriptions.add(this.subscribeToDesktopSwitch());
    this.subscriptions.add(this.titleService.subscribeToPlanPageTitle('Preview'));
  }

  private subscribeToDesktopSwitch(): Subscription {
    return this.mobileService.subscribeToDesktopSwitch(() => {
      this.returnTo$.pipe(take(1)).subscribe(returnTo => {
        const url = returnTo || `plans/${this.planId}`;
        this.router
          .navigate([url], {
            queryParams: {returnTo: null},
            queryParamsHandling: 'merge',
          })
          .then(() => this.planDialogService.openPlanPreviewDialog(this.planId));
      });
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public runPlanClick() {
    this.store$.dispatch(
      new RunDecisionTableRuleAction({
        decisionTableId: this.planId,
        saveReport: true,
        triggerActions: true,
        onSuccess: () => this.onRunPlanSuccess(),
        onFailure: () => this.onRunPlanFailure(),
      })
    );
  }

  private onRunPlanSuccess() {
    this.messageService.add('Success! Your plan has been run.');
  }

  private onRunPlanFailure() {
    this.messageService.add('Error: There was a problem running your plan.');
  }

  public saveReportClick(preview: DecisionTablePreview) {
    this.store$.dispatch(
      new AddDecisionTableReportAction({
        preview: preview,
        onSuccess: () => this.onSaveReportSuccess(),
        onFailure: () => this.onSaveReportFailure(),
      })
    );
  }

  private onSaveReportSuccess() {
    this.messageService.add('Success! Your report has been added.');
  }

  private onSaveReportFailure() {
    this.messageService.add('Error: There was a problem adding your report.');
  }

  public onBackClick() {
    this.returnTo$.pipe(take(1)).subscribe(url => this.router.navigate([url]));
  }
}
