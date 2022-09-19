import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DesignModule} from '../../design/design.module';
import {MaterialModule} from '../../material/material.module';
import {PipesModule} from '../../pipes/pipes.module';
import {PlanPreviewTableComponent} from './plan-preview-table.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, DesignModule, PipesModule],
  declarations: [PlanPreviewTableComponent],
  exports: [PlanPreviewTableComponent],
})
export class PlanPreviewTableModule {}
