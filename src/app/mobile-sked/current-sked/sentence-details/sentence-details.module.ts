import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {SentenceDetailsComponent} from './sentence-details.component';
import {OphIconModule} from '../../../shared/design/oph-icon/oph-icon.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {CanDeactivateGuard} from '../../../services/can-deactivate.guard';
import {BottomSheetSelectModule} from './bottom-sheet-select/bottom-sheet-select.module';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SentenceDetailsSvgComponent} from './sentence-details-svg/sentence-details-svg.component';

const routes: Route[] = [
  {
    path: '',
    component: SentenceDetailsComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  declarations: [SentenceDetailsComponent, SentenceDetailsSvgComponent],
  imports: [
    BottomSheetSelectModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    OphIconModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [RouterModule],
})
export class SentenceDetailsModule {}
