import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MobileListPickerModule} from '../list-picker/mobile-list-picker.module';
import {MobileTimePickerComponent} from './mobile-time-picker.component';
import {TimePickerPeriodComponent} from './period/time-picker-period.component';

@NgModule({
  imports: [CommonModule, MobileListPickerModule],
  declarations: [MobileTimePickerComponent, TimePickerPeriodComponent],
  exports: [MobileTimePickerComponent],
})
export class MobileTimePickerModule {}
