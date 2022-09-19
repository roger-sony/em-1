import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {DialogContentComponent} from './content/dialog-content.component';
import {DialogCancelButtonComponent} from './footer/cancel-button/dialog-cancel-button.component';
import {DialogFooterComponent} from './footer/dialog-footer.component';
import {DialogHeaderComponent} from './header/dialog-header.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatButtonModule, OphIconModule, MatTooltipModule],
  declarations: [DialogHeaderComponent, DialogFooterComponent, DialogContentComponent, DialogCancelButtonComponent],
  exports: [DialogHeaderComponent, DialogFooterComponent, DialogContentComponent, DialogCancelButtonComponent],
})
export class DialogLayoutModule {}
