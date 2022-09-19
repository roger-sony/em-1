import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {OphIconModule} from '../../shared/design/oph-icon/oph-icon.module';
import {SharedLayoutModule} from '../../shared/layout/shared/shared-layout.module';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    OphIconModule,
    SharedLayoutModule,
  ],
  exports: [RouterModule],
})
export class HomeModule {}
