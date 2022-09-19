import {selectAllSentences} from '../../../core/store/sentences/sentences.selectors';
import {GetSentencesAction} from '../../../core/store/sentences/sentences.action';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';
import {Sentence} from '../../../core/model/sentence';
import {UpdateSentencesAction} from '../../../core/store/paragraphs/paragraphs.action';
import {selectParagraphById, selectStoredSentences} from '../../../core/store/paragraphs/paragraphs.selector';
import {convertTaskToTaskForm} from '../../../shared/utils/task/convert-task-to-task-form';
import {UpdateTaskFormAction} from '../../../core/store/forms/forms.action';
import {Paragraph} from '../../../core/model/paragraph';
import {Role} from '../../../core/model/role';
import {User} from '../../../core/model/user';
import {selectRouterParam} from '../../../core/store/router/router.selector';
import {selectAllRoles} from '../../../core/store/roles/roles.selector';
import {selectAllUsers} from '../../../core/store/users/users.selector';

@Component({
  selector: 'new-subtask-dialog',
  templateUrl: './new-subtask-dialog.component.html',
  styleUrls: ['./new-subtask-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewSubtaskDialogComponent implements OnInit {
  //TODO: Variable name
  public storedSentences$: Observable<Sentence[]>;
  public sentences$: Observable<Sentence[]>;
  public paragraph$: Observable<Paragraph>;
  public paragraphId$: Observable<string>;
  public roles$: Observable<Role[]>;
  public users$: Observable<User[]>;

  public sentenceForm$ = new BehaviorSubject<Sentence>(null);
  //TODO: Variable name
  // public sentenceForm$ = new BehaviorSubject<Subtask>(null);
  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(private dialog: MatDialogRef<NewSubtaskDialogComponent>, private router: Router, private store$: Store) {}

  ngOnInit(): void {
    this.store$.dispatch(new GetSentencesAction({}));

    this.sentences$ = this.store$.pipe(select(selectAllSentences));
    this.storedSentences$ = this.store$.pipe(select(selectStoredSentences));
    this.roles$ = this.store$.pipe(select(selectAllRoles));
    this.users$ = this.store$.pipe(select(selectAllUsers));
    this.paragraphId$ = this.store$.pipe(select(selectRouterParam('taskId')));
    this.paragraph$ = this.paragraphId$.pipe(
      switchMap(paragraphId => this.store$.pipe(select(selectParagraphById(paragraphId)))),
      filter(paragraph => !!paragraph)
    );
  }

  //TODO: Variable name
  public onValueChange(value: Sentence) {
    this.sentenceForm$.next(value);
  }

  public onValidityChange(value: boolean) {
    this.valid$.next(value);
  }

  public onSaveSentence() {
    combineLatest([this.sentenceForm$, this.storedSentences$])
      .pipe(take(1))
      .subscribe(([sentenceForm, storedSentences]) => {
        const sentences = storedSentences ? [...storedSentences] : [];
        //TODO: Variable name
        sentences.push(sentenceForm);
        this.store$.dispatch(new UpdateSentencesAction({sentences}));

        combineLatest([this.paragraph$, this.users$, this.roles$]).subscribe(([paragraph, users, roles]) => {
          const taskForm = convertTaskToTaskForm({...paragraph, sentences}, users, roles);
          this.store$.dispatch(new UpdateTaskFormAction({taskForm}));
        });

        this.router.navigate([], {queryParams: {edited: true}});
        this.dialog.close();
      });
  }

  //TODO: Variable name
  // private changeFactFilterName(subtask: Subtask): Subtask {
  //   const factFilters = subtask.factFilters.map(fact => {
  //     fact['value'] = fact['filterValue'];
  //     delete fact['filterValue'];
  //     return fact;
  //   });
  //   return {...subtask, factFilters};
  // }
}
