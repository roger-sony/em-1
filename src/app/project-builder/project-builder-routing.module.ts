import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {ProjectBuilderComponent} from './project-builder.component';

const routes: Route[] = [
  {
    path: '',
    component: ProjectBuilderComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectBuilderRoutingModule {}
