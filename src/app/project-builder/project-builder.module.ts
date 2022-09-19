import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectBuilderComponent} from './project-builder.component';
import {SideTabsModule} from './layouts/side-tabs/side-tabs.module';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ProjectBuilderRoutingModule} from './project-builder-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {CreateTaskComponent} from './create-task/create-task.component';
import {MatSelectModule} from '@angular/material/select';
import {EditTaskComponent} from './edit-task/edit-task.component';
import {OphIconModule} from '../shared/design/oph-icon/oph-icon.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {RenameProjectComponent} from './rename-project/rename-project.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RenameSubtaskComponent} from './edit-task/rename-task/rename-subtask.component';

@NgModule({
  declarations: [
    CreateTaskComponent,
    ProjectBuilderComponent,
    EditTaskComponent,
    RenameProjectComponent,
    RenameSubtaskComponent,
  ],
  imports: [
    CommonModule,
    SideTabsModule,
    MatIconModule,
    DragDropModule,
    ProjectBuilderRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    OphIconModule,
    MatChipsModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
  ],
})
export class ProjectBuilderModule {}
