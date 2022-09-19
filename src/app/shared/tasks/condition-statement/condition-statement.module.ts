import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConditionStatementComponent} from './condition-statement.component';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  declarations: [ConditionStatementComponent],
  imports: [CommonModule, PipesModule],
  exports: [ConditionStatementComponent],
})
export class ConditionStatementModule {}
