import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {NounsComponent} from './nouns.component';
import {NounsToolbarComponent} from './nouns-toolbar/nouns-toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {OphIconModule} from '../../../shared/design/oph-icon/oph-icon.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {PipesModule} from '../../../shared/pipes/pipes.module';
import {NounsTableComponent} from './shared/nouns-table/nouns-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {LoadingModule} from '../../../shared/design/loading/loading.module';
import {DesktopSearchPanelModule} from '../../../shared/desktop/search-panel/desktop-search-panel.module';
import {LexiconNounCardComponent} from './shared/lexicon-noun-card/lexicon-noun-card.component';
import {OphCardModule} from '../../../shared/design/oph-card/oph-card.module';
import {OphMenuModule} from '../../../shared/design/oph-menu/oph-menu.module';
import {NounsGridComponent} from './shared/nouns-grid/nouns-grid.component';
import {DeleteDialogModule} from '../../../shared/dialog/delete/delete-dialog.module';
import {DialogLayoutModule} from '../../../shared/dialog/layout/dialog-layout.module';
import {UpdateValuesComponent} from './shared/lexicon-noun-card/update-values/update-values.component';
import {OphFormFieldModule} from '../../../shared/design/oph-form-field/oph-form-field.module';
import {OphInputModule} from '../../../shared/design/oph-input/oph-input.module';
import {RenameComponent} from './shared/lexicon-noun-card/rename/rename.component';
import {DeleteNounConfirmComponent} from './shared/lexicon-noun-card/delete-noun-confirm/delete-noun-confirm.component';
import {CreateEditNounComponent} from './shared/create-edit-noun/create-edit-noun.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ChangeNounStatusConfirmComponent} from './shared/lexicon-noun-card/change-noun-status-confirm/change-noun-status-confirm.component';
import {OphSelectModule} from '../../../shared/design/oph-select/oph-select.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {OphDatePickerModule} from '../../../shared/design/oph-date-picker/oph-date-picker.module';

const routes: Route[] = [
  {
    path: '',
    component: NounsComponent,
  },
];

@NgModule({
  declarations: [
    NounsComponent,
    NounsTableComponent,
    NounsToolbarComponent,
    LexiconNounCardComponent,
    NounsGridComponent,
    ChangeNounStatusConfirmComponent,
    UpdateValuesComponent,
    RenameComponent,
    DeleteNounConfirmComponent,
    CreateEditNounComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    OphIconModule,
    MatSlideToggleModule,
    FormsModule,
    _MatMenuDirectivesModule,
    MatFormFieldModule,
    MatMenuModule,
    MatCheckboxModule,
    PipesModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    LoadingModule,
    DesktopSearchPanelModule,
    OphCardModule,
    OphMenuModule,
    DeleteDialogModule,
    DialogLayoutModule,
    OphFormFieldModule,
    OphInputModule,
    DragDropModule,
    MatAutocompleteModule,
    OphSelectModule,
    MatDatepickerModule,
    OphDatePickerModule,
  ],
  providers: [TitleCasePipe],
  exports: [RouterModule],
})
export class NounsModule {}
