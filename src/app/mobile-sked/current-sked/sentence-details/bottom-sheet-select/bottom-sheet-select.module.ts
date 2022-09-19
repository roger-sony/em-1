import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BottomSheetSelectComponent} from './bottom-sheet-select.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {OphIconModule} from '../../../../shared/design/oph-icon/oph-icon.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [BottomSheetSelectComponent],
  imports: [CommonModule, MatFormFieldModule, MatListModule, OphIconModule, MatCheckboxModule, FormsModule],
})
export class BottomSheetSelectModule {}
