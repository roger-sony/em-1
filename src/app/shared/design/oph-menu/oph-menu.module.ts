import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphMenuItemComponent} from './item/oph-menu-item.component';
import {OphMenuComponent} from './oph-menu.component';
import {OphMenuSeparatorComponent} from './separator/oph-menu-separator.component';
import {OphMenuItemNewComponent} from './oph-menu-item-new/oph-menu-item-new.component';

@NgModule({
  imports: [CommonModule, OphIconModule],
  declarations: [OphMenuComponent, OphMenuItemComponent, OphMenuSeparatorComponent, OphMenuItemNewComponent],
  exports: [OphMenuComponent, OphMenuItemComponent, OphMenuSeparatorComponent, OphMenuItemNewComponent],
})
export class OphMenuModule {}
