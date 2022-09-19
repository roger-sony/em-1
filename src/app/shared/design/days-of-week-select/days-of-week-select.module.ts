import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PipesModule} from '../../pipes/pipes.module';
import {DaysOfWeekSelectComponent} from './days-of-week-select.component';

@NgModule({
  imports: [CommonModule, PipesModule],
  declarations: [DaysOfWeekSelectComponent],
  exports: [DaysOfWeekSelectComponent],
})
export class DaysOfWeekSelectModule {}
