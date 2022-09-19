import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {OphInputModule} from '../../design/oph-input/oph-input.module';
import {OphMenuModule} from '../../design/oph-menu/oph-menu.module';
import {AddMenuComponent} from './add-menu.component';
import {AddMenuSeparatorComponent} from './separator/add-menu-separator.component';
import {AddMenuDropdownComponent} from './dropdown/add-menu-dropdown.component';

@NgModule({
  imports: [CommonModule, OphIconModule, MatButtonModule, OphMenuModule, OphInputModule],
  declarations: [AddMenuComponent, AddMenuSeparatorComponent, AddMenuDropdownComponent],
  exports: [AddMenuComponent, AddMenuSeparatorComponent, AddMenuDropdownComponent],
})
export class AddMenuModule {}
