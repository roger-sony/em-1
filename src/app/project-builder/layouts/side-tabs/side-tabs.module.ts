import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SideTabsComponent} from './side-tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import {OphFormFieldModule} from '../../../shared/design/oph-form-field/oph-form-field.module';
import {OphIconModule} from '../../../shared/design/oph-icon/oph-icon.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {OphInputModule} from '../../../shared/design/oph-input/oph-input.module';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [SideTabsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    OphFormFieldModule,
    OphIconModule,
    MatDividerModule,
    MatIconModule,
    DragDropModule,
    OphInputModule,
    MatListModule,
  ],
  exports: [SideTabsComponent],
})
export class SideTabsModule {}
