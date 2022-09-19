import {NgModule} from '@angular/core';
import {UserDetailComponent} from './detail/user-detail.component';
import {UsersListComponent} from './list/users-list.component';
import {DeleteUserDialogComponent} from './list/delete-user-dialog/delete-user-dialog.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {UsersRoutingModule} from './users-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DeleteDialogModule} from '../shared/dialog/delete/delete-dialog.module';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    UsersRoutingModule,
    MatTableModule,
    MatTooltipModule,
    DeleteDialogModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
  ],
  declarations: [DeleteUserDialogComponent, UserDetailComponent, UsersListComponent],
})
export class UsersModule {}
