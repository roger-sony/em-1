import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DialogModalComponent} from './dialog-modal.component';
import {DialogRoutingModule} from './dialog-routing.module';
import {DialogLoadingComponent} from './dialog-loading.component';

@NgModule({
  imports: [CommonModule, DialogRoutingModule],
  declarations: [DialogModalComponent, DialogLoadingComponent],
})
export class DialogModule {}
