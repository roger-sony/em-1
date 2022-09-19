import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MobileListPickerComponent} from './mobile-list-picker.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MobileListPickerComponent],
  exports: [MobileListPickerComponent],
})
export class MobileListPickerModule {}
