import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {debounceTime, take} from 'rxjs/operators';
import {MobileService} from '../../../../core/page/mobile.service';
import {UpdatePlanFormAction} from '../../../../core/store/forms/forms.action';
import {selectPlanForm} from '../../../../core/store/forms/forms.selector';

@Component({
  selector: 'new-plan-name-step',
  templateUrl: './new-plan-name-step.component.html',
  styleUrls: ['./new-plan-name-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPlanNameStepComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('nameInput')
  public nameInput: ElementRef<HTMLInputElement>;

  public form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  private subscriptions = new Subscription();

  constructor(private mobileService: MobileService, private router: Router, private store$: Store<{}>) {}

  public ngOnInit() {
    this.store$
      .pipe(select(selectPlanForm), take(1))
      .subscribe(planForm => this.nameControl.setValue(planForm?.name || ''));
    this.subscriptions.add(this.subscribeToNameValueChanges());
    this.subscriptions.add(this.subscribeToMobileSwitch());
  }

  private subscribeToNameValueChanges(): Subscription {
    return this.nameControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(name => this.store$.dispatch(new UpdatePlanFormAction({planForm: {name}})));
  }

  private subscribeToMobileSwitch(): Subscription {
    return this.mobileService.subscribeToMobileSwitch(
      () => this.router.navigate([{outlets: {dialog: null}}]).then(() => this.router.navigate(['/plans/new'])) // TODO returnTo
    );
  }

  public ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public get nameControl(): AbstractControl {
    return this.form.get('name');
  }
}
