import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NounsListComponent} from './nouns-list.component';
import {NounCardComponent} from './card/noun-card.component';
import {OphCardModule} from '../../design/oph-card/oph-card.module';
import {NounCardMenuComponent} from './card/noun-card-menu/noun-card-menu.component';
import {NounCardContentComponent} from './card/noun-card-content/noun-card-content.component';
import {OphMenuModule} from '../../design/oph-menu/oph-menu.module';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {NounDeleteDialogModule} from '../delete-dialog/noun-delete-dialog.module';

@NgModule({
  declarations: [NounsListComponent, NounCardComponent, NounCardMenuComponent, NounCardContentComponent],
  imports: [CommonModule, OphCardModule, OphCardModule, OphMenuModule, OphIconModule, NounDeleteDialogModule],
  exports: [NounsListComponent, NounCardComponent],
})
export class NounsListModule {}
