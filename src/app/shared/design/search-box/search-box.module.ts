import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {SearchBoxComponent} from './search-box.component';

@NgModule({
  imports: [CommonModule, OphIconModule],
  declarations: [SearchBoxComponent],
  exports: [SearchBoxComponent],
})
export class SearchBoxModule {}
