import {NgModule} from '@angular/core';
import {BackButtonModule} from '../../shared/design/back-button/back-button.module';
import {DeleteDialogModule} from '../../shared/dialog/delete/delete-dialog.module';
import {PlansSharedModule} from '../shared/plans-shared.module';
import {PlanDetailPageComponent} from './plan-detail-page.component';
import {PlanDetailDesktopComponent} from './desktop/plan-detail-desktop.component';
import {PlanDetailMobileComponent} from './mobile/plan-detail-mobile.component';
import {PlansPanelComponent} from './desktop/panel/plans-panel.component';
import {PlansPanelContentComponent} from './desktop/panel/content/plans-panel-content.component';
import {PlansPanelHeaderComponent} from './desktop/panel/content/header/plans-panel-header.component';
import {CreatePlanSmallButtonComponent} from './desktop/panel/content/header/create-plan-small-button/create-plan-small-button.component';
import {PlansPanelCollapseButtonComponent} from './desktop/panel/content/header/collapse-button/plans-panel-collapse-button.component';
import {PlansPanelCollapsedComponent} from './desktop/panel/collapsed/plans-panel-collapsed.component';
import {PlanDetailHeaderComponent} from './desktop/header/plan-detail-header.component';
import {SetCadenceButtonComponent} from './desktop/header/set-cadence-button/set-cadence-button.component';
import {AddTriggerButtonComponent} from './desktop/header/add-trigger-button/add-trigger-button.component';
import {PlanDetailMenuComponent} from './desktop/header/plan-detail-menu/plan-detail-menu.component';
import {PlanNounsToolbarComponent} from './desktop/toolbar/plan-nouns-toolbar.component';
import {PlanNounsSearchComponent} from './desktop/toolbar/search/plan-nouns-search.component';
import {PlanAddNounMenuComponent} from './desktop/toolbar/add-noun-menu/plan-add-noun-menu.component';
import {PlanTriggersListComponent} from './desktop/triggers-list/plan-triggers-list.component';
import {PlansNounListEmptyComponent} from './desktop/nouns-list/plans-noun-list-empty/plans-noun-list-empty.component';
import {PlanNounCardComponent} from './desktop/nouns-list/card/plan-noun-card.component';
import {PlanNounCardMenuComponent} from './desktop/nouns-list/card/menu/plan-noun-card-menu.component';
import {PlanNounCardEmptyComponent} from './desktop/nouns-list/card/empty/plan-noun-card-empty.component';
import {PlanNounCardContentComponent} from './desktop/nouns-list/card/content/plan-noun-card-content.component';
import {PlanConditionViewComponent} from './desktop/nouns-list/card/content/view/plan-condition-view.component';
import {PlanNounAddConditionButtonComponent} from './desktop/nouns-list/card/content/add-condition-button/plan-noun-add-condition-button.component';
import {PlanNounsListComponent} from './desktop/nouns-list/plan-nouns-list.component';
import {PlanTriggersListCollapsedComponent} from './desktop/triggers-list/collapsed/plan-triggers-list-collapsed.component';
import {PlanTriggersMenuComponent} from './desktop/triggers-list/menu/plan-triggers-menu.component';
import {PlanNounConditionMenuComponent} from './desktop/nouns-list/card/content/view/menu/plan-noun-condition-menu.component';
import {PlanConditionEditComponent} from './desktop/nouns-list/card/content/edit/plan-condition-edit.component';
import {PlanDetailFloatingMenuComponent} from './mobile/floating-menu/plan-detail-floating-menu.component';
import {PlanConditionsDeleteDialogComponent} from './desktop/nouns-list/card/menu/delete-dialog/plan-conditions-delete-dialog.component';
import {PlanDetailMobileHeaderComponent} from './mobile/header/plan-detail-mobile-header.component';
import {PlanDetailMobileCadenceComponent} from './mobile/cadence/plan-detail-mobile-cadence.component';
import {PlanDetailMobileTriggersComponent} from './mobile/triggers/plan-detail-mobile-triggers.component';
import {MobileTriggersMenuComponent} from './mobile/triggers/menu/mobile-triggers-menu.component';
import {PlanDetailMobileConditionsComponent} from './mobile/conditions/plan-detail-mobile-conditions.component';
import {AddMenuModule} from '../../shared/desktop/add-menu/add-menu.module';
import {AddToChapterModule} from '../../shared/chapters/add-to-chapter/add-to-chapter.module';
import {ChapterChipsModule} from '../../shared/chapters/chapter-chips/chapter-chips.module';
import {PlanConditionsNounDialogComponent} from './desktop/nouns-list/card/menu/noun-dialog/plan-conditions-noun-dialog.component';
import {DialogLayoutModule} from '../../shared/dialog/layout/dialog-layout.module';
import {PlanCreateConditionButtonComponent} from './desktop/toolbar/create-condition-button/plan-create-condition-button.component';
import {PlanConditionsListComponent} from './desktop/conditions-list/plan-conditions-list.component';
import {PlanDetailCollapsibleListComponent} from './shared/collapsible-list/plan-detail-collapsible-list.component';
import {PlanDetailCollapsibleListItemComponent} from './shared/collapsible-list/collapsible-list-item/plan-detail-collapsible-list-item.component';
import {PlanDetailConditionDisplayComponent} from './shared/condition-display/plan-detail-condition-display.component';
import {PlanDetailCollapsibleListItemMenuComponent} from './shared/collapsible-list/collapsible-list-item/menu/plan-detail-collapsible-list-item-menu.component';
import {PlanDetailConditionDeleteDialogComponent} from './shared/collapsible-list/collapsible-list-item/menu/condition-delete-dialog/plan-detail-condition-delete-dialog.component';

@NgModule({
  imports: [
    BackButtonModule,
    PlansSharedModule,
    DeleteDialogModule,
    AddMenuModule,
    AddToChapterModule,
    ChapterChipsModule,
    DialogLayoutModule,
  ],
  declarations: [
    PlanDetailPageComponent,
    PlanDetailDesktopComponent,
    PlanDetailMobileComponent,
    PlansPanelComponent,
    PlansPanelContentComponent,
    PlansPanelHeaderComponent,
    CreatePlanSmallButtonComponent,
    PlansPanelCollapseButtonComponent,
    PlansPanelCollapsedComponent,
    PlanDetailHeaderComponent,
    SetCadenceButtonComponent,
    AddTriggerButtonComponent,
    PlanDetailMenuComponent,
    PlanNounsToolbarComponent,
    PlanNounsSearchComponent,
    PlanAddNounMenuComponent,
    PlanTriggersListComponent,
    PlansNounListEmptyComponent,
    PlanNounCardComponent,
    PlanNounCardMenuComponent,
    PlanNounCardEmptyComponent,
    PlanNounCardContentComponent,
    PlanConditionViewComponent,
    PlanNounAddConditionButtonComponent,
    PlanNounsListComponent,
    PlanTriggersListCollapsedComponent,
    PlanTriggersMenuComponent,
    PlanNounConditionMenuComponent,
    PlanConditionEditComponent,
    PlanDetailFloatingMenuComponent,
    PlanConditionsDeleteDialogComponent,
    PlanDetailMobileHeaderComponent,
    PlanDetailMobileCadenceComponent,
    PlanDetailMobileTriggersComponent,
    MobileTriggersMenuComponent,
    PlanDetailMobileConditionsComponent,
    PlanConditionsNounDialogComponent,
    PlanCreateConditionButtonComponent,
    PlanConditionsListComponent,
    PlanDetailCollapsibleListComponent,
    PlanDetailCollapsibleListItemComponent,
    PlanDetailConditionDisplayComponent,
    PlanDetailCollapsibleListItemMenuComponent,
    PlanDetailConditionDeleteDialogComponent,
  ],
})
export class PlanDetailModule {}
