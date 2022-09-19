import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditSkedDialogComponent} from './edit-sked-dialog.component';
import {DialogLayoutModule} from '../../dialog/layout/dialog-layout.module';
import {OphSelectModule} from 'src/app/shared/design/oph-select/oph-select.module';
import {OphFormFieldModule} from 'src/app/shared/design/oph-form-field/oph-form-field.module';
import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';
import {MatButtonModule} from '@angular/material/button';
import {OphTimePickerModule} from '../../design/oph-time-picker/oph-time-picker.module';
import {OphDayPickerModule} from '../../design/oph-day-picker/oph-day-picker.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [EditSkedDialogComponent],
  imports: [
    CommonModule,
    DialogLayoutModule,
    OphFormFieldModule,
    OphIconModule,
    OphSelectModule,
    MatButtonModule,
    OphTimePickerModule,
    OphDayPickerModule,
    ReactiveFormsModule,
  ],
})
export class EditSkedDialogModule {}
