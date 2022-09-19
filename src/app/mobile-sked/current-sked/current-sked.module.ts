import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {CurrentSkedComponent} from './current-sked.component';
import {ParagraphCardComponent} from './paragraph-card/paragraph-card.component';
import {OphIconModule} from '../../shared/design/oph-icon/oph-icon.module';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SharedLayoutModule} from '../../shared/layout/shared/shared-layout.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ParagraphCardSvgComponent} from './paragraph-card/paragraph-card-svg/paragraph-card-svg.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {CanDeactivateGuard} from '../../services/can-deactivate.guard';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CurrentSkedComponent,
      },
      {
        path: 'paragraph/:paragraphId',
        loadChildren: () => import('./paragraph-details/paragraph-details.module').then(m => m.ParagraphDetailsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [CurrentSkedComponent, ParagraphCardComponent, ParagraphCardSvgComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    OphIconModule,
    MatCardModule,
    MatProgressBarModule,
    SharedLayoutModule,
    MatDividerModule,
    MatButtonModule,
    MatGridListModule,
  ],
  exports: [RouterModule, CurrentSkedComponent],
  providers: [CanDeactivateGuard],
})
export class CurrentSkedModule {}
