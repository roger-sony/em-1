import {NgModule} from '@angular/core';
import {PrivilegesRoutingModule} from './privileges-routing.module';
import {CommonModule} from '@angular/common';
import {PrivilegesListComponent} from './list/privileges-list.component';
import {DeletePrivilegeDialogComponent} from './list/delete-privilege-dialog/delete-privilege-dialog.component';
import {PrivilegeDetailsDialogComponent} from './list/privilege-details-dialog/privilege-details-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DialogLayoutModule} from '../shared/dialog/layout/dialog-layout.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {DeleteDialogModule} from '../shared/dialog/delete/delete-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    PrivilegesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    DialogLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DeleteDialogModule,
  ],
  declarations: [DeletePrivilegeDialogComponent, PrivilegeDetailsDialogComponent, PrivilegesListComponent],
})
export class PrivilegesModule {}
