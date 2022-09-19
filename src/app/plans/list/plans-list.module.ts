import {NgModule} from '@angular/core';
import {PlansSharedModule} from '../shared/plans-shared.module';
import {PlansListDesktopComponent} from './desktop/plans-list-desktop.component';
import {PlansListMobileComponent} from './mobile/plans-list-mobile.component';
import {PlansMobileSearchOtherComponent} from './mobile/search-other/plans-mobile-search-other.component';
import {PlansMobileSearchComponent} from './mobile/search/plans-mobile-search.component';
import {PlansListPageComponent} from './plans-list-page.component';
import {PlansListMobileTabsComponent} from './mobile/tabs/plans-list-mobile-tabs.component';
import {PlansSearchResultComponent} from './mobile/search-other/result/plans-search-result.component';
import {PlansListHeaderComponent} from './desktop/header/plans-list-header.component';
import {PlansControlPanelComponent} from './desktop/header/control-panel/plans-control-panel.component';

@NgModule({
  imports: [PlansSharedModule],
  declarations: [
    PlansListPageComponent,
    PlansListMobileComponent,
    PlansMobileSearchComponent,
    PlansMobileSearchOtherComponent,
    PlansListDesktopComponent,
    PlansListMobileTabsComponent,
    PlansSearchResultComponent,
    PlansListHeaderComponent,
    PlansControlPanelComponent,
  ],
})
export class PlansListModule {}
