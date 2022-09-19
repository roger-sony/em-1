import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OphChecklistComponent} from './oph-checklist.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {OphInputModule} from '../oph-input/oph-input.module';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [OphChecklistComponent],
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, OphInputModule, DragDropModule],
  exports: [OphChecklistComponent],
})
export class OphChecklistModule {}
