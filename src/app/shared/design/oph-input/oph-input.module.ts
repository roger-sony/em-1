import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {OphInputDirective} from './oph-input.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [OphInputDirective],
  exports: [OphInputDirective],
})
export class OphInputModule {}
