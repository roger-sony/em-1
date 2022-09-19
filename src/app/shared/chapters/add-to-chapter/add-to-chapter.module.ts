import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddToChapterComponent} from './add-to-chapter.component';
import {OphIconModule} from '../../design/oph-icon/oph-icon.module';
import {AddMenuModule} from '../../desktop/add-menu/add-menu.module';

@NgModule({
  declarations: [AddToChapterComponent],
  imports: [CommonModule, OphIconModule, AddMenuModule],
  exports: [AddToChapterComponent],
})
export class AddToChapterModule {}
