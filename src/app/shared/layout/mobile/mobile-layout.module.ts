import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {SharedLayoutModule} from '../shared/shared-layout.module';
import {MobileCreateButtonComponent} from './bottom-nav/create-button/mobile-create-button.component';
import {MobileNavDialogComponent} from './bottom-nav/dialog/mobile-nav-dialog.component';
import {MobileBottomNavComponent} from './bottom-nav/mobile-bottom-nav.component';
import {MobileMoreMenuComponent} from './bottom-nav/more-menu/mobile-more-menu.component';
import {MobileNavButtonComponent} from './bottom-nav/nav-button/mobile-nav-button.component';
import {CreateButtonUrlPipe} from './bottom-nav/pipes/create-button-url.pipe';
import {MoreButtonActivePipe} from './bottom-nav/pipes/more-button-active.pipe';
import {MobileLayoutComponent} from './mobile-layout.component';
import {MobileSearchClearButtonComponent} from './search-bar/clear-button/mobile-search-clear-button.component';
import {MobileSearchInputComponent} from './search-bar/input/mobile-search-input.component';
import {MobileSearchBarComponent} from './search-bar/mobile-search-bar.component';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  imports: [SharedLayoutModule, CommonModule, MatButtonModule, MatSidenavModule],
  declarations: [
    MobileLayoutComponent,
    MobileSearchBarComponent,
    MobileSearchInputComponent,
    MobileBottomNavComponent,
    MobileNavButtonComponent,
    MobileCreateButtonComponent,
    MobileMoreMenuComponent,
    MoreButtonActivePipe,
    MobileNavDialogComponent,
    MobileSearchClearButtonComponent,
    CreateButtonUrlPipe,
  ],
  exports: [MobileLayoutComponent, MobileSearchBarComponent, MobileBottomNavComponent],
})
export class MobileLayoutModule {}
