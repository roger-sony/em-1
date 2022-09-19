import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, pipe, Subscription} from 'rxjs';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {Chapter} from 'src/app/core/model/chapter';
import {ChecklistItem} from 'src/app/core/model/checklist-item';
import {DecisionTable} from 'src/app/core/model/decision-table';
import {FactFilter} from 'src/app/core/model/fact-filter';
import {TaskForm} from 'src/app/core/model/form/task-form';
import {Paragraph} from 'src/app/core/model/paragraph';
import {Role} from 'src/app/core/model/role';
import {Sentence} from 'src/app/core/model/sentence';
import {Task} from 'src/app/core/model/task';
import {TaskRuleTrigger} from 'src/app/core/model/task-rule-trigger';
import {User} from 'src/app/core/model/user';
import {ClearTaskFormAction, UpdateTaskFormAction} from 'src/app/core/store/forms/forms.action';
import {selectTaskForm, selectTaskFormEdited} from 'src/app/core/store/forms/forms.selector';
import {selectAllParagraphs, selectParagraphById} from 'src/app/core/store/paragraphs/paragraphs.selector';
import {GetAllRolesAction} from 'src/app/core/store/roles/roles.action';
import {selectAllRoles} from 'src/app/core/store/roles/roles.selector';
import {selectRouterParam, selectRouterQueryParam, selectRouterUrl} from 'src/app/core/store/router/router.selector';
import {UpdateTaskRuleTriggersAction} from 'src/app/core/store/tasks/tasks.action';
import {GetAllUsersAction} from 'src/app/core/store/users/users.action';
import {selectAllUsers} from 'src/app/core/store/users/users.selector';
import {MessageService} from 'src/app/services/message.service';
import {DiscardDialogComponent} from 'src/app/shared/dialog/discard/discard-dialog.component';
import {convertTaskFormToTask} from 'src/app/shared/utils/task/convert-task-form-to-task';
import {convertTaskToTaskForm} from 'src/app/shared/utils/task/convert-task-to-task-form';
import {TitleService} from '../../core/page/title.service';
import {
  ClearSentencesAction,
  CreateParagraphAction,
  GetParagraphsAction,
  UpdateParagraphAction,
  UpdateSentencesAction,
} from '../../core/store/paragraphs/paragraphs.action';
import {selectStoredSentences} from '../../core/store/paragraphs/paragraphs.selector';
import {selectActiveUserPrivileges} from '../../core/store/active-user/active-user.selector';

@Component({
  selector: 'new-task',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  public readonly activeUserPrivileges: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public chapters$: Observable<Chapter[]>;
  public roles$: Observable<Role[]>;
  // public taskFieldValues$: Observable<FieldValues>;
  public users$: Observable<User[]>;
  // public tasks$: Observable<Task[]>;
  // public taskNames$: Observable<string[]>;
  // public task$: Observable<Task>;
  // public taskId$: Observable<string>;
  public taskForm$: Observable<TaskForm>;
  public taskFormEdited$: Observable<boolean>;
  public taskRuleTriggers$: Observable<TaskRuleTrigger[]>;
  public storedTaskRuleTriggers$: Observable<TaskRuleTrigger[]>;
  public storedFacts$: Observable<FactFilter[]>;
  // public storedSubtasks$: Observable<Subtask[]>;
  public filteredTriggers$: Observable<TaskRuleTrigger[]>;
  public plans$: Observable<DecisionTable[]>;
  public plansMap$: Observable<Record<string, DecisionTable>>;
  public canSave$: Observable<boolean>;
  public detailFormEdited$: Observable<boolean>;
  public taskFormValid$: Observable<boolean>;

  public paragraphs$: Observable<Paragraph[]>;
  public paragraphNames$: Observable<string[]>;
  public paragraph$: Observable<Paragraph>;
  public paragraphId$: Observable<string>;
  public storedSentences$: Observable<Sentence[]>;
  public url$: Observable<string>;
  public loading$: Observable<boolean>;

  public ruleTriggers$ = new BehaviorSubject<TaskRuleTrigger[]>([]);
  public deletedRuleTriggers$ = new BehaviorSubject<string[]>([]);
  public checkList$ = new BehaviorSubject<ChecklistItem[]>([]);
  public initialTaskForm$ = new BehaviorSubject<TaskForm>(null);
  public saving$ = new BehaviorSubject<boolean>(false);
  public checkListEdited$ = new BehaviorSubject<boolean>(false);

  private subscription = new Subscription();

  get canEditParagraphs(): boolean {
    return this.activeUserPrivileges?.value?.includes('Can edit Paragraphs');
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router,
    private store$: Store<{}>,
    private titleService: TitleService
  ) {}

  ngOnInit(): void {
    this.titleService.setPageTitle('Paragraphs');

    //TODO: remove
    // this.store$.dispatch(new GetTasksAction({force: true}));
    // this.store$.dispatch(new GetAllTaskFieldValuesAction({}));
    // this.store$.dispatch(new GetAllChaptersAction({}));
    // this.store$.dispatch(new GetAllTaskRuleTriggersAction({}));
    // this.store$.dispatch(new GetAllDecisionTablesAction({}));
    // this.store$.dispatch(new GetAllInventoryItemsAction({}));
    // this.store$.dispatch(new GetUnitOfMeasuresAction({}));

    //Keep
    this.store$.dispatch(new GetParagraphsAction({}));
    this.store$.dispatch(new GetAllRolesAction({}));
    this.store$.dispatch(new GetAllUsersAction({}));

    //TODO: remove
    // this.chapters$ = this.store$.pipe(select(selectAllChapters));
    // this.taskFieldValues$ = this.store$.pipe(select(selectTaskFieldValues));
    // this.taskId$ = this.store$.pipe(select(selectRouterParam('taskId')));
    // this.taskRuleTriggers$ = this.store$.pipe(select(selectAllTaskRuleTriggers));
    // this.storedTaskRuleTriggers$ = this.store$.pipe(select(selectStoredTaskRuleTriggers));
    // this.storedFacts$ = this.store$.pipe(select(selectStoredFacts));
    // this.storedSubtasks$ = this.store$.pipe(select(selectStoredSubtasks));
    // this.plans$ = this.store$.pipe(select(selectAllDecisionTables));
    this.detailFormEdited$ = this.store$.pipe(select(selectRouterQueryParam('edited')));
    // this.tasks$ = this.store$.pipe(select(selectAllTasks));

    //Keep
    this.paragraphs$ = this.store$.pipe(select(selectAllParagraphs));
    this.roles$ = this.store$.pipe(select(selectAllRoles));
    this.users$ = this.store$.pipe(select(selectAllUsers));
    this.taskForm$ = this.store$.pipe(select(selectTaskForm)); //edit
    this.taskFormEdited$ = this.store$.pipe(select(selectTaskFormEdited)); //edit
    this.paragraphId$ = this.store$.pipe(select(selectRouterParam('taskId')));
    this.storedSentences$ = this.store$.pipe(select(selectStoredSentences));
    this.url$ = this.store$.pipe(select(selectRouterUrl));
    this.loading$ = this.observeLoading();

    this.paragraphNames$ = this.observeParagraphs();
    // this.task$ = this.observeTaskId();
    this.paragraph$ = this.observeParagraphId();
    // this.filteredTriggers$ = this.observeTaskRuleTriggers();
    // this.plansMap$ = this.observePlans();
    this.taskFormValid$ = this.observeTaskForm();
    this.canSave$ = this.observeValidity();

    this.subscription.add(this.subscribeToParagraph());
    // this.subscription.add(this.subscribeToRuleTriggers());

    this.subscription.add(
      this.detailFormEdited$.pipe(take(1)).subscribe(edited => {
        if (edited) {
          this.router.navigate([], {queryParams: {edited: null}});
        }
      })
    );

    this.subscription.add(
      this.store$.select(selectActiveUserPrivileges).subscribe(p => this.activeUserPrivileges.next(p))
    );
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  private observeTaskForm(): Observable<boolean> {
    return this.taskForm$.pipe(
      map(taskForm => {
        return (
          !!taskForm && !!taskForm.name && !!taskForm.priority && !!(taskForm.movability || taskForm.movability === 0)
        );
      })
    );
  }

  private observeLoading(): Observable<boolean> {
    return combineLatest([this.paragraphs$, this.url$]).pipe(
      map(([paragraphs, url]) => !!paragraphs?.length || url.startsWith('/paragraphs/new'))
    );
  }

  private observeParagraphs(): Observable<string[]> {
    return this.paragraphs$.pipe(map(paragraphs => paragraphs.map(paragraph => paragraph.name.toLowerCase())));
  }

  private observeValidity(): Observable<boolean> {
    return combineLatest([
      this.taskFormValid$,
      this.taskForm$,
      this.initialTaskForm$,
      this.detailFormEdited$,
      this.checkListEdited$,
      this.paragraphNames$,
    ]).pipe(
      map(([valid, taskForm, initialTaskForm, edited, checkListEdited, paragraphNames]) => {
        if (edited || checkListEdited) {
          return valid;
        }
        // if (paragraphNames.includes(taskForm?.name.toLowerCase())) {
        //   return false;
        // }
        // return valid;
        return valid && !this.taskEqualityCheck(taskForm, initialTaskForm);
      })
    );
  }

  // tslint:disable-next-line:no-any
  private taskEqualityCheck(object1: Record<string, any>, object2: Record<string, any>): boolean {
    if (!object1 || !object2) {
      return;
    }
    const keys1 = Object.keys(object1);

    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areArrays = Array.isArray(val1) && Array.isArray(val2);
      if (areArrays && !this.compareArrays(val1, val2)) {
        return false;
      } else if (!areArrays && val1 !== val2) {
        return false;
      }
    }

    return true;
  }

  private compareArrays(a: string[], b: string[]) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }

  private observeParagraphId(): Observable<Paragraph> {
    return this.paragraphId$.pipe(
      switchMap(paragraphId => this.store$.pipe(select(selectParagraphById(paragraphId)))),
      filter(paragraph => !!paragraph),
      pipe(
        map(p => ({
          ...p,
          derivedEffort: p.sentences?.reduce((res, s) => res + (+s.effort || 0), 0) || 0,
        }))
      )
    );
  }

  private subscribeToParagraph(): Subscription {
    return combineLatest([this.paragraph$, this.users$, this.roles$, this.taskFormEdited$]).subscribe(
      ([paragraph, users, roles, taskFormEdited]) => {
        if (!taskFormEdited) {
          const newTaskForm = convertTaskToTaskForm(paragraph, users, roles);
          this.initialTaskForm$.next(newTaskForm);
          this.onTaskFormValueChange(newTaskForm);
        } else {
          this.initialTaskForm$.next(convertTaskToTaskForm(paragraph, users, roles));
        }
        this.store$.dispatch(new UpdateSentencesAction({sentences: paragraph.sentences || []}));
      }
    );
  }

  // private subscribeToRuleTriggers(): Subscription {
  //   return this.filteredTriggers$.subscribe(taskRuleTriggers => {
  //     if (taskRuleTriggers) {
  //       this.store$.dispatch(new UpdateTaskRuleTriggersAction({taskRuleTriggers}));
  //     }
  //   });
  // }

  // public observeTaskRuleTriggers(): Observable<TaskRuleTrigger[]> {
  //   return combineLatest([this.taskRuleTriggers$, this.taskId$]).pipe(
  //     map(([triggers, id]) => triggers.filter((trigger: TaskRuleTrigger) => trigger.taskId === id))
  //   );
  // }

  // private observePlans(): Observable<Record<string, DecisionTable>> {
  //   return this.plans$.pipe(
  //     map(plans =>
  //       plans.reduce(
  //         (plansMap: Record<string, DecisionTable>, plan: DecisionTable) => ((plansMap[plan.id] = plan), plansMap),
  //         {}
  //       )
  //     )
  //   );
  // }

  public onTaskFormValueChange(taskForm: TaskForm) {
    this.store$.dispatch(new UpdateTaskFormAction({taskForm}));
  }

  public onCheckListChange(value: ChecklistItem[]) {
    this.checkList$.next(value);
    this.router.navigate([], {queryParams: {edited: true}});
  }

  public onCheckListEdited(value: boolean) {
    this.checkListEdited$.next(value);
  }

  public onBackClick() {
    this.canSave$.pipe(take(1)).subscribe(canSave => {
      if (canSave || this.router.url.includes('new')) {
        const dialog = this.dialog.open(DiscardDialogComponent, {
          backdropClass: 'oph-backdrop',
          panelClass: 'oph-dialog',
        });
        dialog.afterClosed().subscribe(confirmed => {
          if (confirmed) {
            this.router.navigate(['paragraphs'], {queryParams: {edited: null}});
          }
        });
      } else {
        this.router.navigate(['paragraphs'], {queryParams: {edited: null}});
      }
    });
  }

  public onDelete(index: number) {
    combineLatest([this.deletedRuleTriggers$, this.storedTaskRuleTriggers$])
      .pipe(take(1))
      .subscribe(([deletedTriggers, storedTriggers]) => {
        const taskRuleTriggers = storedTriggers.slice();
        if (taskRuleTriggers[index].id) {
          const deletedIds = [...deletedTriggers, taskRuleTriggers[index].id];
          this.deletedRuleTriggers$.next(deletedIds);
        }
        taskRuleTriggers.splice(index, 1);
        this.store$.dispatch(new UpdateTaskRuleTriggersAction({taskRuleTriggers}));
      });
  }

  public onSaveClick() {
    this.paragraphId$.pipe(take(1)).subscribe(id => {
      this.saving$.next(true);
      if (id === 'new') {
        return this.createNewParagraph();
      }
      return this.editParagraph();
    });
  }

  private createNewParagraph() {
    combineLatest([this.taskForm$, this.users$, this.roles$, this.storedSentences$, this.checkList$])
      .pipe(take(1))
      .subscribe(([taskForm, users, roles, sentences, checkList]) => {
        const paragraphDto = convertTaskFormToTask(taskForm, users, roles, checkList, {} as Paragraph);
        const paragraphDtoComplete = {...paragraphDto, sentences};
        this.store$.dispatch(
          new CreateParagraphAction({
            paragraph: paragraphDtoComplete,
            onSuccess: createdParagraph => this.onCreateParagraphSuccess(createdParagraph),
            onFailure: () => this.onCreateParagraphFailure(),
          })
        );
      });
  }

  private editParagraph() {
    combineLatest([this.taskForm$, this.users$, this.roles$, this.paragraph$, this.storedSentences$, this.checkList$])
      .pipe(take(1))
      .subscribe(([taskForm, users, roles, paragraph, sentences, checkList]) => {
        const paragraphDto = convertTaskFormToTask(taskForm, users, roles, checkList, {...paragraph, sentences});
        const paragraphDtoComplete = {...paragraphDto, sentences, cadence: paragraph.cadence};
        this.store$.dispatch(
          new UpdateParagraphAction({
            paragraphId: paragraph.id,
            paragraphChange: paragraphDtoComplete,
            onSuccess: () => this.onEditParagraphSuccess(paragraph.id),
            onFailure: () => this.onEditParagraphFailure(),
          })
        );
      });
  }

  public onNameChange(value: string) {
    this.taskForm$.pipe(take(1)).subscribe(currentForm => {
      const taskForm = {...currentForm, name: value};
      this.store$.dispatch(new UpdateTaskFormAction({taskForm}));
    });
  }

  private onCreateParagraphSuccess(task: Task) {
    this.messageService.add('Success! Task has been created.');
    this.router.navigate([`paragraphs`], {queryParams: {edited: null}});
    this.store$.dispatch(new GetParagraphsAction({}));
    this.store$.dispatch(new ClearTaskFormAction());
    this.saving$.next(false);
  }

  private onCreateParagraphFailure() {
    this.messageService.add('Error: Task creation has failed.');
    this.saving$.next(false);
  }

  private onEditParagraphSuccess(taskId: string) {
    this.messageService.add('Success! Task has been edited.');
    // this.router.navigate([`./tasks/${taskId}`]);
    this.router.navigate(['paragraphs'], {queryParams: {edited: null}});
    this.store$.dispatch(new ClearTaskFormAction());
    this.store$.dispatch(new GetParagraphsAction({}));
    this.saving$.next(false);
  }

  private onEditParagraphFailure() {
    this.messageService.add('Error: Task creation has failed.');
    this.saving$.next(false);
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store$.dispatch(new ClearSentencesAction());
    this.store$.dispatch(new ClearTaskFormAction());
  }
}
