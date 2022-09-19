import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NounDisplayComponent} from './noun-display.component';

@NgModule({
  declarations: [NounDisplayComponent],
  imports: [CommonModule],
  exports: [NounDisplayComponent],
})
export class NounDisplayModule {}
