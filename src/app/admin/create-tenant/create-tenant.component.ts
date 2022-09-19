import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {CreateTenantAction} from 'src/app/core/store/admin/admin.action';
import {MessageService} from '../../services/message.service';
import {TitleService} from '../../core/page/title.service';

@Component({
  selector: 'create-tenant',
  templateUrl: './create-tenant.component.html',
  styleUrls: ['./create-tenant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTenantComponent implements OnInit, OnDestroy {
  tenantForm = this.formBuilder.group({
    tenantName: ['', Validators.required],
    address: [''],
    email: ['', Validators.required],
  });

  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Create Tenant');
    this.subscription = this.subscribeToFormValueChanges();
  }

  private subscribeToFormValueChanges(): Subscription {
    return this.tenantForm.valueChanges.subscribe(value => {
      if (!value.tenantName?.replace(/\s/g, '').length || !value.email?.replace(/\s/g, '').length) {
        this.tenantForm.setErrors({invalid: true});
      }
    });
  }

  onSubmit() {
    const tenantFormDto = {...this.tenantForm.value};
    tenantFormDto.tenantName = tenantFormDto.tenantName.trim();
    tenantFormDto.address = tenantFormDto.address.trim();
    tenantFormDto.email = tenantFormDto.email.trim();
    this.store$.dispatch(
      new CreateTenantAction({
        data: tenantFormDto,
        onSuccess: () => this.onSaveSuccess(),
        onFailure: () => this.onSaveFailure(),
      })
    );
    this.tenantForm.reset(this.tenantForm);
  }

  private onSaveSuccess() {
    this.messageService.add('Success! A new tenant has been created.');
  }

  private onSaveFailure() {
    this.messageService.add('Error: Failed to save the cadence. Please try again.');
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
