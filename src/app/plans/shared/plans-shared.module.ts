import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {RuleFormModule} from './rule-form/rule-form.module';
import {CreatePlanButtonComponent} from './create-button/create-plan-button.component';
import {PlansSearchInputComponent} from './search-input/plans-search-input.component';
import {PlansEmptyComponent} from './list/empty/plans-empty.component';
import {PlanCardMenuComponent} from './list/card/menu/plan-card-menu.component';
import {PlanCardContentComponent} from './list/card/content/plan-card-content.component';
import {PlanCardNounsComponent} from './list/card/content/plan-card-nouns/plan-card-nouns.component';
import {PlanCardTriggersComponent} from './list/card/content/plan-card-triggers/plan-card-triggers.component';
import {PlanCardCadenceComponent} from './list/card/content/plan-card-cadence/plan-card-cadence.component';
import {PlanCardComponent} from './list/card/plan-card.component';
import {PlanCardConditionsComponent} from './list/card/content/plan-card-conditions/plan-card-conditions.component';
import {PlanCardItemComponent} from './list/card/menu/item/plan-card-item.component';
import {PlanCardLoadingComponent} from './list/card/loading/plan-card-loading.component';
import {NounSearchComponent} from './noun-search/noun-search.component';
import {PlanDeleteDialogModule} from 'src/app/shared/plans/delete-dialog/plan-delete-dialog.module';
import {ChapterChipsModule} from '../../shared/chapters/chapter-chips/chapter-chips.module';
import {PlanNameInputComponent} from './name-input/plan-name-input.component';
import {ConditionFormModule} from './condition-form/condition-form.module';

@NgModule({
  imports: [SharedModule, RuleFormModule, PlanDeleteDialogModule, ChapterChipsModule, ConditionFormModule],
  declarations: [
    CreatePlanButtonComponent,
    PlansSearchInputComponent,
    PlansEmptyComponent,
    PlanCardMenuComponent,
    PlanCardContentComponent,
    PlanCardNounsComponent,
    PlanCardTriggersComponent,
    PlanCardCadenceComponent,
    PlanCardComponent,
    PlanCardConditionsComponent,
    PlanCardItemComponent,
    PlanCardLoadingComponent,
    NounSearchComponent,
    PlanNameInputComponent,
  ],
  exports: [
    SharedModule,
    RuleFormModule,
    CreatePlanButtonComponent,
    PlansSearchInputComponent,
    PlansEmptyComponent,
    PlanCardMenuComponent,
    PlanCardContentComponent,
    PlanCardNounsComponent,
    PlanCardTriggersComponent,
    PlanCardCadenceComponent,
    PlanCardComponent,
    PlanCardConditionsComponent,
    PlanCardLoadingComponent,
    PlanCardItemComponent,
    NounSearchComponent,
    PlanNameInputComponent,
    ConditionFormModule,
  ],
})
export class PlansSharedModule {}
