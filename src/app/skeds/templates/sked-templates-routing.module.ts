import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkedTemplateDetailComponent} from './detail/sked-template-detail.component';
import {SkedTemplatesListComponent} from './list/sked-templates-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      bottomNavShown: true,
      mobileSearchShown: true,
      mobileSearchDisabled: true,
    },
    children: [
      {
        path: '',
        component: SkedTemplatesListComponent,
      },
      {
        path: 'new',
        component: SkedTemplateDetailComponent,
      },
      {
        path: ':templateId',
        component: SkedTemplateDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkedTemplatesRoutingModule {}
