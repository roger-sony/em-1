import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';
import {NavbarComponent} from './navbar.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
