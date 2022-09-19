import {OphIconModule} from 'src/app/shared/design/oph-icon/oph-icon.module';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {OphInputModule} from './../../../shared/design/oph-input/oph-input.module';
import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SentencesComponent} from './sentences.component';
import {SentenceFormComponent} from './form/sentence-form.component';
import {SentenceListComponent} from './list/sentence-list.component';

const routes: Route[] = [
  {
    path: '',
    component: SentencesComponent,
  },
];

@NgModule({
  declarations: [SentencesComponent, SentenceFormComponent, SentenceListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OphInputModule,
    OphIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
  ],
  exports: [RouterModule],
})
export class SentencesModule {}
