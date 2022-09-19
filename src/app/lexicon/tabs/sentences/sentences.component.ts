import {ActivatedRoute} from '@angular/router';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Sentence} from 'src/app/core/model/sentence';
import {GetVerbsAction} from 'src/app/core/store/verbs/verbs.action';
import {NounDto} from './../../../core/api/dto/noun.dto';
import {Verb} from './../../../core/model/verb';
import {GetNounsAction} from './../../../core/store/nouns/nouns.action';
import {selectAllNouns} from './../../../core/store/nouns/nouns.selector';
import {
  GetSentencesAction,
  CreateSentenceAction,
  DeleteSentenceAction,
} from './../../../core/store/sentences/sentences.action';
import {selectAllSentences} from './../../../core/store/sentences/sentences.selectors';
import {selectAllVerbs} from './../../../core/store/verbs/verbs.selector';
import {TitleService} from '../../../core/page/title.service';

@Component({
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentencesComponent implements OnInit {
  public verbs$: Observable<Verb[]>;
  public sentences$: Observable<Sentence[]>;
  public nouns$: Observable<NounDto[]>;

  constructor(private route: ActivatedRoute, private store$: Store, private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Sentences');

    this.store$.dispatch(new GetVerbsAction({}));
    const params = this.route.snapshot.queryParams;
    this.store$.dispatch(
      new GetNounsAction({
        queries: {
          name: params.name || null,
          sortField: params.sortField || null,
          sortDirection: params.sortDirection || null,
          hideDisabled: params.hideDisabled || null,
        },
        force: true,
      })
    );
    this.store$.dispatch(new GetSentencesAction({}));

    this.verbs$ = this.store$.pipe(select(selectAllVerbs));
    this.nouns$ = this.store$.pipe(select(selectAllNouns));
    this.sentences$ = this.store$.pipe(select(selectAllSentences));
  }

  public onValueChange(sentence: Sentence) {
    this.store$.dispatch(new CreateSentenceAction({sentence}));
  }

  public onSentenceDelete(sentenceId: string) {
    this.store$.dispatch(new DeleteSentenceAction({sentenceId}));
  }
}
