import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {ParagraphDetailsComponent} from './paragraph-details.component';
import {OphIconModule} from '../../../shared/design/oph-icon/oph-icon.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDividerModule} from '@angular/material/divider';
import {ParagraphDetailsSvgComponent} from './paragraph-details-svg/paragraph-details-svg.component';
import {MatTooltipModule} from '@angular/material/tooltip';

const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ParagraphDetailsComponent,
      },
      {
        path: 'sentence/:sentenceIndex',
        loadChildren: () => import('../sentence-details/sentence-details.module').then(m => m.SentenceDetailsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [ParagraphDetailsComponent, ParagraphDetailsSvgComponent],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,
    OphIconModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    MatTooltipModule,
  ],
  exports: [RouterModule],
})
export class ParagraphDetailsModule {}
