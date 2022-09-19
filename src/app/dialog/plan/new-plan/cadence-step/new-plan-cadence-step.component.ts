import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {CadenceForm, CadenceFormPage} from '../../../../core/model/form/cadence-form';
import {MobileService} from '../../../../core/page/mobile.service';
import {ClearCadenceFormAction, UpdateCadenceFormAction} from '../../../../core/store/forms/forms.action';
import {selectCadenceFormByPage} from '../../../../core/store/forms/forms.selector';
import {CadenceRepetition} from '../../shared/cadence-form/cadence-repetition';

@Component({
  selector: 'new-plan-cadence-step',
  templateUrl: './new-plan-cadence-step.component.html',
  styleUrls: ['./new-plan-cadence-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanCadenceStepComponent implements OnInit, OnDestroy {
  public readonly defaultValue: CadenceForm = {
    startDateTime: null,
    repetition: CadenceRepetition.DoNotRepeat,
  };

  public cadenceForm$: Observable<CadenceForm>;

  public nextDisabled$ = new BehaviorSubject(false);

  private subscriptions = new Subscription();

  constructor(private mobileService: MobileService, private router: Router, private store$: Store<{}>) {}

  public ngOnInit(): void {
    this.cadenceForm$ = this.store$.pipe(
      select(selectCadenceFormByPage(CadenceFormPage.CreatePlan)),
      map(cadenceForm => cadenceForm || this.defaultValue)
    );
    this.subscriptions.add(this.subscribeToMobileSwitch());
  }

  public onReloadButtonClick() {
    this.store$.dispatch(new ClearCadenceFormAction());
  }

  private subscribeToMobileSwitch(): Subscription {
    return this.mobileService.subscribeToMobileSwitch(
      () => this.router.navigate([{outlets: {dialog: null}}]).then(() => this.router.navigate(['/plans/new/cadence'])) // TODO returnTo
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onFormValueChange(cadenceForm: CadenceForm) {
    this.store$.dispatch(new UpdateCadenceFormAction({cadenceForm, page: CadenceFormPage.CreatePlan}));
  }

  public onFormValidityChange(valid: boolean) {
    this.nextDisabled$.next(!valid);
  }
}
