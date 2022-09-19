import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AutocompleteModule} from './autocomplete/autocomplete.module';
import {DesignModule} from './design/design.module';
import {SharedDialogModule} from './dialog/shared-dialog.module';
import {LayoutModule} from './layout/layout.module';
import {MaterialModule} from './material/material.module';
import {MobileModule} from './mobile/mobile.module';
import {NavbarModule} from './navbar/navbar.module';
import {PipesModule} from './pipes/pipes.module';
import {SharedPlansModule} from './plans/shared-plans.module';
import {SharedChaptersModule} from './chapters/shared-chapters.module';
import {SharedSkedsModule} from './skeds/shared-skeds.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    AutocompleteModule,
    DesignModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    MatSnackBarModule,
    NavbarModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    MobileModule,
    SharedPlansModule,
    SharedDialogModule,
    SharedChaptersModule,
    SharedSkedsModule,
  ],
  exports: [
    CommonModule,
    AutocompleteModule,
    DesignModule,
    FormsModule,
    LayoutModule,
    MaterialModule,
    MatSnackBarModule,
    NavbarModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule,
    MobileModule,
    SharedPlansModule,
    SharedDialogModule,
    SharedChaptersModule,
    SharedSkedsModule,
  ],
})
export class SharedModule {}
