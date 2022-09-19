import {ChangeDetectionStrategy, Component, OnInit, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, startWith, switchMap, take} from 'rxjs/operators';
import {CadenceForm} from '../../../core/model/form/cadence-form';
import {RuleSchedule} from '../../../core/model/rule-schedule';
import {ClearCadenceFormAction, UpdateCadenceFormAction} from '../../../core/store/forms/forms.action';
import {selectCadenceForm} from '../../../core/store/forms/forms.selector';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {
  CreateRuleScheduleAction,
  DeleteRuleScheduleAction,
} from '../../../core/store/rule-schedules/rule-schedules.action';
import {selectRuleScheduleById} from '../../../core/store/rule-schedules/rule-schedules.selector';
import {CadenceFormControl} from '../../../dialog/plan/shared/cadence-form/cadence-form-control';
import {MessageService} from '../../../services/message.service';
import {roundTimePickerMinutes} from '../../../shared/mobile/time-picker/util/round-time-picker-minutes';
import {convertCadenceFormToRuleSchedule} from '../../../shared/utils/plans/convert-cadence-form-to-rule-schedule';

@Component({
  selector: 'plan-cadence-home',
  templateUrl: './plan-cadence-home.component.html',
  styleUrls: ['./plan-cadence-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanCadenceHomeComponent implements OnInit, OnDestroy {
  public readonly form = new FormGroup({
    [CadenceFormControl.Date]: new FormControl(moment().add(1, 'day'), Validators.required),
    [CadenceFormControl.Time]: new FormControl(roundTimePickerMinutes(moment()), Validators.required),
    [CadenceFormControl.SaveReport]: new FormControl(false),
    [CadenceFormControl.TriggerConsequences]: new FormControl(false),
  });

  public readonly controls = CadenceFormControl;

  public planId$: Observable<string>;
  private cadenceId$: Observable<string>;

  public cadenceForm$: Observable<CadenceForm>;
  public ruleSchedule$: Observable<RuleSchedule>;

  public saveDisabled$: Observable<boolean>;

  private loading$ = new BehaviorSubject(false);

  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private store$: Store<{}>
  ) {}

  public ngOnInit(): void {
    this.planId$ = this.store$.pipe(select(selectRouterParam('planId')));
    this.cadenceId$ = this.store$.pipe(select(selectRouterParam('cadenceId')));

    this.ruleSchedule$ = this.observeRuleSchedule();

    this.cadenceForm$ = this.store$.pipe(select(selectCadenceForm));

    this.saveDisabled$ = this.observeSaveDisabled();
  }

  private observeSaveDisabled(): Observable<boolean> {
    return combineLatest([
      this.form.valueChanges.pipe(
        map(() => this.form.invalid),
        startWith(this.form.invalid)
      ),
      this.loading$,
    ]).pipe(map(([invalid, loading]) => invalid || loading));
  }

  private observeRuleSchedule(): Observable<RuleSchedule> {
    return this.cadenceId$.pipe(switchMap(id => this.store$.pipe(select(selectRuleScheduleById(id)))));
  }

  public onBack() {
    this.navigateToPreviousPage();
  }

  private navigateToPreviousPage() {
    this.planId$.pipe(take(1)).subscribe(planId => {
      if (planId) {
        this.router.navigate(['/plans', planId]);
      } else {
        this.router.navigate(['/plans/new']);
      }
    });
  }

  public onSave() {
    combineLatest([this.cadenceForm$, this.ruleSchedule$])
      .pipe(take(1))
      .subscribe(([cadenceForm, ruleSchedule]) => {
        if (this.router.url.startsWith('/plans/new/cadence')) {
          this.updateCadenceForm();
          this.router.navigate(['/plans/new']);
        } else if (ruleSchedule) {
          this.updateRuleSchedule(cadenceForm);
        } else {
          this.createRuleSchedule(cadenceForm);
        }
      });
  }

  private updateRuleSchedule(cadenceForm: CadenceForm) {
    this.deleteRuleSchedule(cadenceForm.cadenceId, () => this.createRuleSchedule(cadenceForm));
  }

  private deleteRuleSchedule(id: string, onSuccess: () => void) {
    this.store$.dispatch(
      new DeleteRuleScheduleAction({
        id,
        onSuccess,
        onFailure: () => this.onSaveFailure(),
      })
    );
  }

  private createRuleSchedule(cadenceForm: CadenceForm) {
    const ruleSchedule = convertCadenceFormToRuleSchedule(cadenceForm);
    if (!ruleSchedule) {
      this.onSaveFailure();
      return;
    }

    this.store$.dispatch(
      new CreateRuleScheduleAction({
        ruleSchedule: {
          ...ruleSchedule,
          ruleId: cadenceForm.planId,
        },
        onSuccess: () => this.onSaveSuccess(),
        onFailure: () => this.onSaveFailure(),
      })
    );
  }

  private onSaveSuccess() {
    this.messageService.add('Success! The cadence has been saved!');
    this.navigateToPreviousPage();
    this.store$.dispatch(new ClearCadenceFormAction());
    this.loading$.next(false);
  }

  private onSaveFailure() {
    this.messageService.add('Error: Failed to save the cadence. Please try again.');
    this.loading$.next(false);
  }

  public onRepetitionClick() {
    this.updateCadenceForm();
    this.router.navigate(['./repetition'], {relativeTo: this.activatedRoute});
  }

  public onEndClick() {
    this.updateCadenceForm();
    this.router.navigate(['./end'], {relativeTo: this.activatedRoute});
  }

  private updateCadenceForm() {
    this.cadenceForm$.pipe(take(1)).subscribe(cadenceForm => {
      const startDateTime = moment(this.dateControl.value);
      const time = this.timeControl.value;
      if (time) {
        startDateTime.hour(time.hour()).minute(time.minute());
      }

      const saveReport = this.saveReportControl.value;
      const triggerActions = this.triggerConsequencesControl.value;

      this.store$.dispatch(
        new UpdateCadenceFormAction({cadenceForm: {...cadenceForm, startDateTime, saveReport, triggerActions}})
      );
    });
  }

  public get dateControl(): AbstractControl {
    return this.form.get(CadenceFormControl.Date);
  }

  public get timeControl(): AbstractControl {
    return this.form.get(CadenceFormControl.Time);
  }

  public get saveReportControl(): AbstractControl {
    return this.form.get(CadenceFormControl.SaveReport);
  }

  public get triggerConsequencesControl(): AbstractControl {
    return this.form.get(CadenceFormControl.TriggerConsequences);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
