import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {TriggerForm, TriggerFormPage} from 'src/app/core/model/form/trigger-form';
import {CreateDecisionTableWithTriggersAction} from 'src/app/core/store/decision-tables/decision-tables.action';
import {selectCadenceForm, selectPlanForm, selectTriggerFormByPage} from 'src/app/core/store/forms/forms.selector';
import {MessageService} from 'src/app/services/message.service';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {PlanForm} from '../../../core/model/form/plan-form';
import {MobileService} from '../../../core/page/mobile.service';
import {ClearAllFormsAction, UpdatePlanFormAction} from '../../../core/store/forms/forms.action';
import {PlanDialogService} from '../../../dialog/plan-dialog.service';
import {TitleService} from '../../../core/page/title.service';

@Component({
  selector: 'new-plan-home',
  templateUrl: './new-plan-home.component.html',
  styleUrls: ['./new-plan-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanHomeComponent implements OnInit, OnDestroy {
  public planForm$: Observable<PlanForm>;
  public cadenceForm$: Observable<CadenceForm>;
  public triggerForm$: Observable<TriggerForm>;

  public valid$ = new BehaviorSubject(true);

  private subscriptions = new Subscription();

  constructor(
    private messageService: MessageService,
    private mobileService: MobileService,
    private planDialogService: PlanDialogService,
    private router: Router,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  public ngOnInit(): void {
    this.titleService.setPageTitle('New Plan');

    this.planForm$ = this.store$.pipe(select(selectPlanForm));
    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));
    this.triggerForm$ = this.store$.pipe(select(selectTriggerFormByPage(TriggerFormPage.CreatePlan)));

    this.subscriptions.add(this.subscribeToDesktopSwitch());
  }

  private subscribeToDesktopSwitch(): Subscription {
    return this.mobileService.subscribeToDesktopSwitch(() =>
      this.router.navigate(['/plans']).then(() => this.planDialogService.openNewPlanDialogName())
    );
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public createDecisionTable() {
    combineLatest([this.planForm$, this.cadenceForm$, this.triggerForm$])
      .pipe(take(1))
      .subscribe(([planForm, cadenceForm, triggerForm]) => {
        this.store$.dispatch(
          new CreateDecisionTableWithTriggersAction({
            planForm,
            cadenceForm,
            triggerForm,
            onSuccess: decisionTable => this.onCreateDecisionTableSuccess(decisionTable),
            onFailure: () => this.onCreateDecisionTableFailure(),
          })
        );
      });
  }

  private onCreateDecisionTableSuccess(decisionTable: DecisionTable) {
    this.messageService.add('Success! Your decision table has been saved.');
    this.store$.dispatch(new ClearAllFormsAction());
    this.router.navigate(['/plans']);
  }

  private onCreateDecisionTableFailure() {
    this.messageService.add(`Error: Something went wrong. Please try again.`);
  }

  public onNameValueChange(name: string) {
    this.store$.dispatch(new UpdatePlanFormAction({planForm: {name}}));
  }

  public onNameValidityChange(valid: boolean) {
    this.valid$.next(valid);
  }
}
