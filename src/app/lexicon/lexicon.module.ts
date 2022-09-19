import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LexiconComponent} from './lexicon.component';
import {Route, RouterModule} from '@angular/router';
import {LexiconNavigationComponent} from './lexicon-navigation/lexicon-navigation.component';
import {MatTabsModule} from '@angular/material/tabs';
import {SharedLayoutModule} from '../shared/layout/shared/shared-layout.module';

const routes: Route[] = [
  {
    path: '',
    component: LexiconComponent,
    children: [
      {
        path: '',
        // pathMatch: 'full',
        redirectTo: 'nouns',
      },
      {
        path: 'nouns',
        loadChildren: () => import('./tabs/nouns/nouns.module').then(m => m.NounsModule),
      },
      {
        path: 'adjectives',
        loadChildren: () => import('./tabs/adjectives/adjectives.module').then(m => m.AdjectivesModule),
      },
      {
        path: 'verbs',
        loadChildren: () => import('./tabs/verbs/verbs.module').then(m => m.VerbsModule),
      },
      {
        path: 'sentences',
        loadChildren: () => import('./tabs/sentences/sentences.module').then(m => m.SentencesModule),
      },
    ],
  },
];

@NgModule({
  declarations: [LexiconComponent, LexiconNavigationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatTabsModule, SharedLayoutModule],
  exports: [RouterModule],
})
export class LexiconModule {}
