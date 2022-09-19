import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Dictionary} from '@ngrx/entity';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {Task} from 'src/app/core/model/task';
import {UnitOfMeasure} from 'src/app/core/model/unit-of-measure';
import {
  AddDecisionTableReportAction,
  GetDecisionTablePreviewAction,
  RunDecisionTableRuleAction,
} from 'src/app/core/store/decision-tables/decision-tables.action';
import {selectDecisionTablePreview} from 'src/app/core/store/decision-tables/decision-tables.selector';
import {selectTasksMap} from 'src/app/core/store/tasks/tasks.selector';
import {selectUnitOfMeasuresNounSubcategoryMap} from 'src/app/core/store/unit-of-measures/unit-of-measures.selector';
import {DecisionTablePreview} from '../../../core/model/decision-table-preview';
import {MobileService} from '../../../core/page/mobile.service';
import {MessageService} from '../../../services/message.service';
import {PlanPreviewTableComponent} from '../../../shared/plans/preview-table/plan-preview-table.component';

@Component({
  selector: 'plan-preview-dialog',
  templateUrl: './plan-preview-dialog.component.html',
  styleUrls: ['./plan-preview-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanPreviewDialogComponent implements OnInit, OnDestroy {
  @ViewChild(PlanPreviewTableComponent)
  public planPreviewTable: PlanPreviewTableComponent;

  public planId: string;
  public preview$: Observable<DecisionTablePreview>;
  public tasks$: Observable<Dictionary<Task>>;
  public uom$: Observable<Dictionary<UnitOfMeasure>>;
  public downloadXLS: boolean;

  private subscriptions = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<PlanPreviewDialogComponent>,
    private messageService: MessageService,
    private mobileService: MobileService,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<{}>
  ) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('80%', 'auto');
    this.planId = this.route.snapshot.paramMap.get('previewPlanId');
    this.store$.dispatch(new GetDecisionTablePreviewAction({id: this.planId}));
    this.preview$ = this.store$.pipe(select(selectDecisionTablePreview(this.planId)));
    this.uom$ = this.store$.pipe(select(selectUnitOfMeasuresNounSubcategoryMap));
    this.tasks$ = this.store$.pipe(select(selectTasksMap));

    this.subscriptions.add(this.subscribeToMobileSwitch());
  }

  private subscribeToMobileSwitch(): Subscription {
    return this.mobileService.subscribeToMobileSwitch(() => {
      const [returnTo] = this.router.url.split('(dialog:');
      this.router.navigate(['', {outlets: {dialog: null}}], {relativeTo: this.route}).then(() =>
        this.router.navigate(['/plans', this.planId, 'preview'], {
          queryParams: {returnTo},
          queryParamsHandling: 'merge',
        })
      );
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

  public downloadXLSClick() {
    this.downloadXLS = true;
  }

  public downloadPDFClick() {
    // this.preview$.pipe(take(1)).subscribe(preview => {
    //   // const element = this.planPreviewTable.element.nativeElement;
    // });
  }
}
