import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Sentence} from 'src/app/core/model/sentence';
import {selectRouterParam} from 'src/app/core/store/router/router.selector';
import {selectStoredSubtasks} from 'src/app/core/store/tasks/tasks.selector';

@Component({
  selector: 'edit-subtask-dialog',
  templateUrl: './edit-subtask-dialog.component.html',
  styleUrls: ['./edit-subtask-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSubtaskDialogComponent implements OnInit {
  public subtaskIndex$: Observable<string>;
  public subtask$: Observable<Sentence>;
  public storedSubtasks$: Observable<Sentence[]>;

  public subtaskForm$ = new BehaviorSubject<Sentence>(null);
  public valid$ = new BehaviorSubject<boolean>(false);

  constructor(
    private dialog: MatDialogRef<EditSubtaskDialogComponent>,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.subtaskIndex$ = this.store$.pipe(select(selectRouterParam('subtaskIndex')));
    this.storedSubtasks$ = this.store$.pipe(select(selectStoredSubtasks));
    this.subtask$ = this.observeStoredSubtasks();
  }

  private observeStoredSubtasks(): Observable<Sentence> {
    return combineLatest([this.storedSubtasks$, this.subtaskIndex$]).pipe(
      map(([subtasks, index]) => {
        if (subtasks && index) {
          return subtasks[Number(index)];
        }
      })
    );
  }

  public onValueChange(value: Sentence) {
    this.subtaskForm$.next(value);
  }

  public onValidityChange(value: boolean) {
    this.valid$.next(value);
  }

  public onSaveSubtask() {
    combineLatest([this.subtaskForm$, this.storedSubtasks$, this.subtaskIndex$])
      .pipe(take(1))
      .subscribe(([subtaskForm, storedSubtasks, i]) => {
        const index = Number(i);
        const subtasks = [...storedSubtasks];
        subtasks.splice(index, 1, this.changeFactFilterName(subtaskForm));
        // this.store$.dispatch(new UpdateSubtasksAction({subtasks}));
        this.router.navigate([], {queryParams: {edited: true}});
        this.dialog.close();
      });
  }

  private changeFactFilterName(subtask: Sentence): Sentence {
    // const factFilters = subtask.factFilters.map(fact => {
    //   fact['value'] = fact['filterValue'];
    //   delete fact['filterValue'];
    //   return fact;
    // });
    // return {...subtask, factFilters};
    return {} as Sentence;
  }
}
