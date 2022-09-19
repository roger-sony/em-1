import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CadenceEndPipe} from './cadence-end.pipe';
import {CadenceMonthlyTypePipe} from './cadence-monthly-type.pipe';
import {CadenceRepetitionPipe} from './cadence-repetition.pipe';
import {CadenceStartPipe} from './cadence-start.pipe';
import {CadenceWeeklyDaysPipe} from './cadence-weekly-days.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CadenceEndPipe,
    CadenceRepetitionPipe,
    CadenceMonthlyTypePipe,
    CadenceWeeklyDaysPipe,
    CadenceStartPipe,
  ],
  exports: [CadenceEndPipe, CadenceRepetitionPipe, CadenceMonthlyTypePipe, CadenceWeeklyDaysPipe, CadenceStartPipe],
})
export class PlanPipesModule {}
