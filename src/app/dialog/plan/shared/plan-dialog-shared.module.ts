import {NgModule} from '@angular/core';
import {CadenceFormModule} from './cadence-form/cadence-form.module';

@NgModule({
  imports: [CadenceFormModule],
  exports: [CadenceFormModule],
})
export class PlanDialogSharedModule {}
