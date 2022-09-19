import {LoadingModule} from './../../../shared/design/loading/loading.module';
import {OphMenuModule} from './../../../shared/design/oph-menu/oph-menu.module';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {OphIconModule} from './../../../shared/design/oph-icon/oph-icon.module';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {Route, RouterModule} from '@angular/router';
import {PipesModule} from 'src/app/shared/pipes/pipes.module';
import {AddButtonModule} from './../../../shared/design/add-button/add-button.module';
import {OphSelectModule} from './../../../shared/design/oph-select/oph-select.module';
import {DesktopSearchPanelModule} from './../../../shared/desktop/search-panel/desktop-search-panel.module';
import {DialogLayoutModule} from './../../../shared/dialog/layout/dialog-layout.module';
import {AdjectivesComponent} from './adjectives.component';
import {NewAdjectiveInputComponent} from './shared/form/input/new-adjective-input.component';
import {NewAdjectiveFormComponent} from './shared/form/new-adjective-form.component';
import {NewAdjectiveDialogComponent} from './new/new-adjective-dialog.component';
import {AdjectivesToolbarComponent} from './toolbar/adjectives-toolbar.component';
import {NewAdjectiveSelectComponent} from './shared/form/select/new-adjective-select.component';
import {NewAdjectiveSelectOptionComponent} from './shared/form/select/option/new-adjective-select-option.component';
import {AdjectiveChipListComponent} from './shared/form/chip-list/adjective-chip-list.component';
import {AdjectiveChipListChipComponent} from './shared/form/chip-list/chip/adjective-chip-list-chip.component';
import {AdjectiveDateTypeOptionsComponent} from './shared/form/date-type-options/adjective-date-type-options.component';
import {AdjectiveTableComponent} from './table/adjective-table.component';
import {AdjectiveTableValueCellComponent} from './table/value-cell/adjective-table-value-cell.component';
import {AdjectiveMenuComponent} from './shared/menu/adjective-menu.component';
import {EditAdjectiveDialogComponent} from './edit/edit-adjective-dialog.component';
import {AdjectivesEmptyComponent} from './empty/adjectives-empty.component';

const routes: Route[] = [
  {
    path: '',
    component: AdjectivesComponent,
  },
];

@NgModule({
  declarations: [
    AdjectivesComponent,
    AdjectivesToolbarComponent,
    NewAdjectiveDialogComponent,
    NewAdjectiveFormComponent,
    NewAdjectiveInputComponent,
    NewAdjectiveSelectComponent,
    NewAdjectiveSelectOptionComponent,
    AdjectiveChipListComponent,
    AdjectiveChipListChipComponent,
    AdjectiveDateTypeOptionsComponent,
    AdjectiveTableComponent,
    AdjectiveTableValueCellComponent,
    AdjectiveMenuComponent,
    EditAdjectiveDialogComponent,
    AdjectivesEmptyComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    RouterModule.forChild(routes),
    DesktopSearchPanelModule,
    MatSlideToggleModule,
    AddButtonModule,
    DialogLayoutModule,
    MatButtonModule,
    ReactiveFormsModule,
    OphSelectModule,
    OphIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    OphMenuModule,
    LoadingModule,
  ],
  exports: [RouterModule],
})
export class AdjectivesModule {}
