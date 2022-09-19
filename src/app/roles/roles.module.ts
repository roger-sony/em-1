import {NgModule} from '@angular/core';
import {RoleDetailComponent} from './detail/role-detail.component';
import {RolesListComponent} from './list/roles-list.component';
import {RolesRoutingModule} from './roles-routing.module';
import {DeleteRoleDialogComponent} from './list/delete-role-dialog/delete-role-dialog.component';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DeleteDialogModule} from '../shared/dialog/delete/delete-dialog.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatTooltipModule,
    DeleteDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  declarations: [DeleteRoleDialogComponent, RoleDetailComponent, RolesListComponent],
})
export class RolesModule {}
