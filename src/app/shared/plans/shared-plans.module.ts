import {NgModule} from '@angular/core';
import {PlanPreviewTableModule} from './preview-table/plan-preview-table.module';
import {TriggerFormModule} from './trigger-form/trigger-form.module';
import {PlansSearchPanelModule} from './search-panel/plans-search-panel.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule, PlanPreviewTableModule, TriggerFormModule, PlansSearchPanelModule],
  exports: [PlanPreviewTableModule, TriggerFormModule, PlansSearchPanelModule],
})
export class SharedPlansModule {}
