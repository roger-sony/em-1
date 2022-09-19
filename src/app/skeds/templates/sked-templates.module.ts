import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkedTemplatesListComponent} from './list/sked-templates-list.component';
import {SkedTemplateControlPanelComponent} from './list/control-panel/sked-template-control-panel.component';
import {SharedSkedsModule} from 'src/app/shared/skeds/shared-skeds.module';
import {CreateTemplateButtonComponent} from './list/control-panel/create-template-button/create-template-button.component';
import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';
import {MatButtonModule} from '@angular/material/button';
import {SkedTemplateItemComponent} from './list/template-item/sked-template-item.component';
import {OphCardModule} from 'src/app/shared/design/oph-card/oph-card.module';
import {OphMenuModule} from 'src/app/shared/design/oph-menu/oph-menu.module';
import {SkedTemplateItemMenuComponent} from './list/template-item/sked-template-item-menu/sked-template-item-menu.component';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {SkedTemplateInUseComponent} from './list/template-item/in-use/sked-template-in-use.component';
import {SkedNewTemplateToolbarComponent} from './detail/new-template-toolbar/sked-new-template-toolbar.component';
import {SkedTemplatesEmptyComponent} from './list/empty/sked-templates-empty.component';
import {SkedTemplatesSharedModule} from './shared/sked-templates-shared.module';
import {SkedEditTemplateToolbarComponent} from './detail/edit-template-toolbar/sked-edit-template-toolbar.component';
import {BackButtonModule} from 'src/app/shared/design/back-button/back-button.module';
import {SkedTemplateDetailComponent} from './detail/sked-template-detail.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {DesktopSearchPanelModule} from '../../shared/desktop/search-panel/desktop-search-panel.module';
import {FormsModule} from '@angular/forms';
import {SkedTemplatesRoutingModule} from './sked-templates-routing.module';
import {SharedLayoutModule} from 'src/app/shared/layout/shared/shared-layout.module';

FullCalendarModule.registerPlugins([interactionPlugin, timeGridWeek]);

@NgModule({
  declarations: [
    SkedTemplatesListComponent,
    SkedTemplateControlPanelComponent,
    CreateTemplateButtonComponent,
    SkedTemplateItemComponent,
    SkedTemplateItemMenuComponent,
    SkedTemplateInUseComponent,
    SkedNewTemplateToolbarComponent,
    SkedTemplatesEmptyComponent,
    SkedEditTemplateToolbarComponent,
    SkedTemplateDetailComponent,
  ],
  imports: [
    CommonModule,
    SharedSkedsModule,
    SkedTemplatesRoutingModule,
    OphIconModule,
    MatButtonModule,
    OphCardModule,
    OphMenuModule,
    PipesModule,
    SkedTemplatesSharedModule,
    OphIconModule,
    BackButtonModule,
    FullCalendarModule,
    MatTooltipModule,
    MatDividerModule,
    MatSlideToggleModule,
    DesktopSearchPanelModule,
    FormsModule,
    SharedLayoutModule,
  ],
})
export class SkedTemplatesModule {}
