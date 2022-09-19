import {DeleteVerbAction} from './../../../core/store/verbs/verbs.action';
import {MessageService} from './../../../services/message.service';
import {Observable} from 'rxjs';
import {selectAllVerbs, selectVerbsLoaded} from './../../../core/store/verbs/verbs.selector';
import {Store, select} from '@ngrx/store';
import {Verb} from './../../../core/model/verb';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {CreateVerbAction, GetVerbsAction} from 'src/app/core/store/verbs/verbs.action';
import {TitleService} from '../../../core/page/title.service';

@Component({
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerbsComponent implements OnInit {
  public verbs$: Observable<Verb[]>;
  public loaded$: Observable<boolean>;

  constructor(private messageService: MessageService, private store$: Store, private titleService: TitleService) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Verbs');
    this.store$.dispatch(new GetVerbsAction({}));

    this.verbs$ = this.store$.pipe(select(selectAllVerbs));
    this.loaded$ = this.store$.pipe(select(selectVerbsLoaded));
  }

  public onAdd(verb: Verb) {
    this.store$.dispatch(
      new CreateVerbAction({
        verb,
        onSuccess: v => this.onAddSuccess(v),
        onFailure: () => this.onAddFailure(),
      })
    );
  }

  public onAddSuccess(verb: Verb) {
    this.messageService.add('Success! The verb has been added.');
  }

  public onAddFailure() {
    this.messageService.add('Error: There was an error adding the verb.');
  }

  public onDelete(verbId: string) {
    this.store$.dispatch(
      new DeleteVerbAction({verbId, onSuccess: () => this.onDeleteSuccess(), onFailure: () => this.onDeleteFailure()})
    );
  }

  public onDeleteSuccess() {
    this.messageService.add('Success! The verb has been deleted.');
  }

  public onDeleteFailure() {
    this.messageService.add('Error: There was an error deleting the verb.');
  }
}
