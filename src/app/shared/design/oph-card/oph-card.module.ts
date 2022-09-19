import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphCardComponent} from './oph-card.component';
import {OphCardIconComponent} from './icon/oph-card-icon.component';
import {OphCardMenuButtonComponent} from './menu-button/oph-card-menu-button.component';
import {OphCardChipComponent} from './chip/oph-card-chip.component';
import {PipesModule} from '../../pipes/pipes.module';

@NgModule({
  imports: [CommonModule, OphIconModule, MatTooltipModule, PipesModule],
  declarations: [OphCardComponent, OphCardIconComponent, OphCardMenuButtonComponent, OphCardChipComponent],
  exports: [OphCardComponent, OphCardMenuButtonComponent, OphCardChipComponent, OphCardIconComponent],
})
export class OphCardModule {}
