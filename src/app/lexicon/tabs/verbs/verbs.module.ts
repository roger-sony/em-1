import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {OphInputModule} from './../../../shared/design/oph-input/oph-input.module';
import {OphIconModule} from './../../../shared/design/oph-icon/oph-icon.module';
import {LoadingModule} from './../../../shared/design/loading/loading.module';
import {Route, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VerbsComponent} from './verbs.component';
import {VerbFormComponent} from './form/verb-form.component';
import {VerbListComponent} from './verb-list/verb-list.component';

const routes: Route[] = [
  {
    path: '',
    component: VerbsComponent,
  },
];

@NgModule({
  declarations: [VerbsComponent, VerbFormComponent, VerbListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoadingModule,
    OphIconModule,
    OphInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
  ],
  exports: [RouterModule],
})
export class VerbsModule {}
