import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddButtonComponent} from './add-button.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AddButtonComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [AddButtonComponent],
})
export class AddButtonModule {}
