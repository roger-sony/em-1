import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {AutocompleteComponent} from './autocomplete.component';
import {AutocompleteNounFiltersComponent} from './noun-filters/autocomplete-noun-filters.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [AutocompleteComponent, AutocompleteNounFiltersComponent],
  exports: [AutocompleteComponent, AutocompleteNounFiltersComponent],
})
export class AutocompleteModule {}
