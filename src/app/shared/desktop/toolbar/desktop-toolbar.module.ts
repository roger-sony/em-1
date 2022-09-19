import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DesktopToolbarComponent} from './desktop-toolbar.component';
import {ToolbarSearchComponent} from './toolbar-search/toolbar-search.component';
import {ToolbarSelectComponent} from './toolbar-select/toolbar-select.component';
import {ToolbarCreateButtonComponent} from './toolbar-create-button/toolbar-create-button.component';
import {DesignModule} from '../../design/design.module';

@NgModule({
  imports: [CommonModule, DesignModule],
  declarations: [DesktopToolbarComponent, ToolbarSearchComponent, ToolbarSelectComponent, ToolbarCreateButtonComponent],
  exports: [DesktopToolbarComponent],
})
export class DesktopToolbarModule {}
