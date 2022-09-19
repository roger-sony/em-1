import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NounsSearchPanelModule} from '../nouns/search-panel/nouns-search-panel.module';
import {NounsListModule} from './list/nouns-list.module';

@NgModule({
  imports: [CommonModule, NounsSearchPanelModule, NounsListModule],
  exports: [NounsSearchPanelModule, NounsListModule],
})
export class SharedNounsModule {}
