import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OphCardModule} from '../../design/oph-card/oph-card.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {OphMenuModule} from '../../design/oph-menu/oph-menu.module';
import {PlansListComponent} from './plans-list.component';
import {PlanCardComponent} from './card/plan-card.component';
import {PlanCardContentComponent} from './card/plan-card-content/plan-card-content.component';
import {PlanCardMenuComponent} from './card/plan-card-menu/plan-card-menu.component';
import {PlanDeleteDialogModule} from '../delete-dialog/plan-delete-dialog.module';
import {ChapterChipsModule} from '../../chapters/chapter-chips/chapter-chips.module';

@NgModule({
  imports: [CommonModule, OphCardModule, OphMenuModule, OphIconModule, PlanDeleteDialogModule, ChapterChipsModule],
  declarations: [PlansListComponent, PlanCardComponent, PlanCardContentComponent, PlanCardMenuComponent],
  exports: [PlansListComponent],
})
export class PlansListModule {}
