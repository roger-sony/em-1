import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {OphIconModule} from '../../shared/design/oph-icon/oph-icon.module';
import {MobileModule} from '../../shared/mobile/mobile.module';
import {PipesModule} from '../../shared/pipes/pipes.module';
import {PlanCadenceCustomMonthlyComponent} from './custom/monthly/plan-cadence-custom-monthly.component';
import {PlanCadenceCustomComponent} from './custom/plan-cadence-custom.component';
import {PlanCadenceCustomWeeklyComponent} from './custom/weekly/plan-cadence-custom-weekly.component';
import {PlanCadenceEndComponent} from './end/plan-cadence-end.component';
import {PlanCadenceHomeComponent} from './home/plan-cadence-home.component';
import {PlanCadenceRoutingModule} from './plan-cadence-routing.module';
import {PlanCadenceComponent} from './plan-cadence.component';
import {PlanCadenceRepetitionComponent} from './repetition/plan-cadence-repetition.component';
import {PlanCadenceStartComponent} from './home/start/plan-cadence-start.component';

@NgModule({
  imports: [
    CommonModule,
    PlanCadenceRoutingModule,
    MobileModule,
    OphIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    PipesModule,
    MatRippleModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  declarations: [
    PlanCadenceComponent,
    PlanCadenceCustomComponent,
    PlanCadenceCustomMonthlyComponent,
    PlanCadenceCustomWeeklyComponent,
    PlanCadenceEndComponent,
    PlanCadenceHomeComponent,
    PlanCadenceRepetitionComponent,
    PlanCadenceStartComponent,
  ],
})
export class PlanCadenceModule {}
