import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {DecisionTablesPreviewModalComponent} from './decision-tables-preview-modal/decision-tables-preview-modal.component';

@NgModule({
  imports: [SharedModule],
  declarations: [DecisionTablesPreviewModalComponent],
  exports: [DecisionTablesPreviewModalComponent],
})
export class RulesSharedModule {}
