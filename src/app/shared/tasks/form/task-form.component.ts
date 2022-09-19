import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {select, Store} from '@ngrx/store';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {map, startWith, switchMap, throttleTime} from 'rxjs/operators';
import {Paragraph} from 'src/app/core/model/paragraph';
import {Task} from 'src/app/core/model/task';
import {selectFieldValues} from 'src/app/core/store/inventory/inventory.selector';
import {selectAllParagraphs} from 'src/app/core/store/paragraphs/paragraphs.selector';
import {TaskDialogService} from 'src/app/dialog/task/task-dialog.service';
import {FieldValues} from '../../../core/model/field-values';
import {TaskForm} from '../../../core/model/form/task-form';
import {Role} from '../../../core/model/role';
import {SkedTemplate} from '../../../core/model/sked-template';
import {User} from '../../../core/model/user';
import {TaskFormControl} from './task-form-control';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() public paragraph: Paragraph;
  @Input() public fieldValues: FieldValues;
  @Input() public roles: Role[];
  @Input() public skedTemplates: SkedTemplate[];
  @Input() public users: User[];
  @Input() public userId: string;
  @Input() public value: TaskForm;
  @Input() public taskId: string;
  @Input() public page: boolean;
  @Input() public canEdit: boolean;

  @Output() public valueChange = new EventEmitter<TaskForm>();
  @Output() public validityChange = new EventEmitter<boolean>();

  @ViewChild('nameInput') public nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('usersInput') public usersInput: ElementRef<HTMLInputElement>;
  @ViewChild('usersInput') public rolesInput: ElementRef<HTMLInputElement>;
  @ViewChild('chaptersInput') public chaptersInput: ElementRef<HTMLInputElement>;

  public readonly form = new FormGroup({
    [TaskFormControl.Name]: new FormControl('', Validators.required),
    // [TaskFormControl.Abandon]: new FormControl(false),
    [TaskFormControl.Skeds]: new FormControl([]),
    [TaskFormControl.Effort]: new FormControl(null),
    [TaskFormControl.Priority]: new FormControl(null, Validators.required),
    [TaskFormControl.Movability]: new FormControl(null, Validators.required),
    [TaskFormControl.Instructions]: new FormControl(''),
    [TaskFormControl.Roles]: new FormControl([]),
    [TaskFormControl.Users]: new FormControl([]),
    [TaskFormControl.Category]: new FormControl(''),
    [TaskFormControl.Location]: new FormControl(''),
    [TaskFormControl.Chapters]: new FormControl([]),
    [TaskFormControl.UpPoints]: new FormControl(null),
  });

  public readonly formControl = TaskFormControl;

  public readonly basicPriorities = new Array(10).fill(1).map((item, index) => item + index);
  public readonly movabilities = new Array(13).fill(0).map((item, index) => index);

  public categories$: Observable<string[]>;
  public locations$: Observable<string[]>;
  public tasks$: Observable<Paragraph[]>;
  public taskNames$: Observable<string[]>;
  public defaultTaskId$: Observable<string>;
  public filteredUsers$: Observable<User[]>;
  public searchFilteredUsers$: Observable<User[]>;
  public filteredRoles$: Observable<Role[]>;
  public searchFilteredRoles$: Observable<Role[]>;
  public inventoryFieldValues$: Observable<FieldValues>;
  public selectedUsers$: Observable<string[]>;
  public selectedRoles$: Observable<string[]>;
  public taskNameInvalid$: Observable<boolean>;

  public paragraph$ = new BehaviorSubject<Paragraph>({} as Paragraph);
  public nextDisabled$ = new BehaviorSubject(false);
  public users$ = new BehaviorSubject<User[]>([]);
  public roles$ = new BehaviorSubject<Role[]>([]);
  private fieldValues$ = new BehaviorSubject<FieldValues>({});
  public nameInput$ = new BehaviorSubject<string>('');
  public userInput$ = new BehaviorSubject<string>('');
  public roleInput$ = new BehaviorSubject<string>('');

  public selectable: boolean = true;
  public removable: boolean = true;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public durationFocus: boolean = false;
  public upPointsFocus: boolean = false;

  private subscriptions = new Subscription();

  constructor(
    private iconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private store$: Store<{}>,
    private taskDialogService: TaskDialogService
  ) {
    this.iconRegistry.addSvgIcon(
      'clock-light',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/clock-light.svg')
    );
    if (!this.canEdit) {
      this.form.disable();
    }
  }

  public ngOnInit(): void {
    this.tasks$ = this.store$.pipe(select(selectAllParagraphs));
    this.taskNames$ = this.observeTasks();
    this.inventoryFieldValues$ = this.store$.pipe(select(selectFieldValues));
    this.categories$ = this.observeFilteredValues('category', this.categoryControl);
    this.locations$ = this.observeFilteredValues('location', this.locationControl);
    this.filteredUsers$ = this.observeUserFormChange(this.usersControl);
    this.searchFilteredUsers$ = this.observeFilteredUsers();
    this.filteredRoles$ = this.observeRoleFormChange(this.rolesControl);
    this.searchFilteredRoles$ = this.observeFilteredRoles();
    this.selectedUsers$ = this.usersControl.valueChanges.pipe(startWith(this.usersControl.value));
    this.selectedRoles$ = this.rolesControl.valueChanges.pipe(startWith(this.rolesControl.value));
    this.taskNameInvalid$ = this.observeTaskName();

    this.subscriptions.add(this.subscribeToFormChanges());
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.fieldValues && this.fieldValues) {
      this.fieldValues$.next(this.fieldValues);
    }
    if (changes.users && this.users.length) {
      this.users$.next(this.users);
    }
    if (changes.roles && this.roles.length) {
      this.roles$.next(this.roles);
    }
    if (changes.value && this.value) {
      this.fillInTaskForm(this.value);
    }
    if (changes.paragraph && this.paragraph) {
      this.paragraph$.next(this.paragraph);
    }
  }

  public ngAfterViewInit() {
    // this.nameInput.nativeElement.focus();
  }

  private observeTasks(): Observable<string[]> {
    return this.tasks$.pipe(map(tasks => tasks.map(task => task.name.toLowerCase())));
  }

  private observeFilteredValues(fieldName: string, control: AbstractControl): Observable<string[]> {
    return control.valueChanges.pipe(
      startWith(control.value || ''),
      switchMap(searchedValue =>
        this.fieldValues$.pipe(
          map(fieldValues => fieldValues?.[fieldName] || []),
          map(values =>
            values.filter(value => !searchedValue || value?.toLowerCase().includes(searchedValue.toLowerCase()))
          )
        )
      )
    );
  }

  private observeUserFormChange(control: AbstractControl): Observable<User[]> {
    return control.valueChanges.pipe(
      startWith(control.value || []),
      switchMap(selectedUsers =>
        this.users$.pipe(map(users => users.filter((user: User) => !selectedUsers.includes(user.userName))))
      )
    );
  }

  private observeFilteredUsers(): Observable<User[]> {
    return combineLatest([this.userInput$, this.filteredUsers$]).pipe(
      map(([value, filteredUsers]) => {
        if (value) {
          return filteredUsers.filter((user: User) => user.userName.toLowerCase().includes(value));
        }
        return filteredUsers;
      })
    );
  }

  private observeRoleFormChange(control: AbstractControl): Observable<Role[]> {
    return control.valueChanges.pipe(
      startWith(control.value || []),
      switchMap(selectedRoles =>
        this.roles$.pipe(map(roles => roles.filter((role: Role) => !selectedRoles.includes(role.displayName))))
      )
    );
  }

  private observeFilteredRoles(): Observable<Role[]> {
    return combineLatest([this.roleInput$, this.filteredRoles$]).pipe(
      map(([value, filteredRoles]) => {
        if (value) {
          return filteredRoles.filter((role: Role) => role.displayName.toLowerCase().includes(value));
        }
        return filteredRoles;
      })
    );
  }

  private observeTaskName(): Observable<boolean> {
    return combineLatest([this.nameInput$, this.taskNames$, this.paragraph$]).pipe(
      map(([value, taskNames, paragraph]) => {
        const invalid =
          paragraph.name?.toLowerCase().trim() === value?.toLowerCase().trim()
            ? false
            : taskNames.includes(value.toLowerCase().trim());
        if (invalid) {
          this.validityChange.emit(false);
        }
        return invalid;
      })
    );
  }

  private subscribeToFormChanges(): Subscription {
    return this.form.valueChanges.pipe(throttleTime(100)).subscribe(() => {
      this.valueChange.emit(this.createTaskFormValue());
      this.validityChange.emit(this.form.valid);
    });
  }

  private createTaskFormValue(): TaskForm {
    return {
      name: this.nameControl.value,
      // abandon: this.abandonControl.value,
      skedTemplateIds: this.skedsControl.value,
      effort: this.effortControl.value,
      priority: this.priorityControl.value,
      movability: this.movabilityControl.value,
      instructions: this.instructionsControl.value || '',
      roles: this.rolesControl.value,
      users: this.usersControl.value,
      category: this.categoryControl.value,
      location: this.locationControl.value,
      chapterIds: this.chaptersControl.value,
      upPoints: this.upPointsControl.value,
    };
  }

  private fillInTaskForm(taskForm: TaskForm) {
    this.form.setValue({
      [TaskFormControl.Name]: taskForm.name || '',
      // [TaskFormControl.Abandon]: taskForm.abandon || false,
      [TaskFormControl.Skeds]: taskForm.skedTemplateIds || [],
      [TaskFormControl.Effort]: taskForm.effort || null,
      [TaskFormControl.Priority]: taskForm.priority || null,
      [TaskFormControl.Movability]: taskForm.movability === 0 ? 0 : taskForm.movability || null,
      [TaskFormControl.Instructions]: taskForm.instructions || '',
      [TaskFormControl.Roles]: taskForm.roles || [],
      [TaskFormControl.Users]: taskForm.users || [],
      [TaskFormControl.Category]: taskForm.category || '',
      [TaskFormControl.Location]: taskForm.location || '',
      [TaskFormControl.Chapters]: taskForm.chapterIds || [],
      [TaskFormControl.UpPoints]: taskForm.upPoints || null,
    });
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public get nameControl(): AbstractControl {
    return this.form.get(TaskFormControl.Name);
  }

  public get abandonControl(): AbstractControl {
    return this.form.get(TaskFormControl.Abandon);
  }

  public get skedsControl(): AbstractControl {
    return this.form.get(TaskFormControl.Skeds);
  }

  public get effortControl(): AbstractControl {
    return this.form.get(TaskFormControl.Effort);
  }

  public get priorityControl(): AbstractControl {
    return this.form.get(TaskFormControl.Priority);
  }

  public get movabilityControl(): AbstractControl {
    return this.form.get(TaskFormControl.Movability);
  }

  public get instructionsControl(): AbstractControl {
    return this.form.get(TaskFormControl.Instructions);
  }

  public get rolesControl(): AbstractControl {
    return this.form.get(TaskFormControl.Roles);
  }

  public get usersControl(): AbstractControl {
    return this.form.get(TaskFormControl.Users);
  }

  public get categoryControl(): AbstractControl {
    return this.form.get(TaskFormControl.Category);
  }

  public get locationControl(): AbstractControl {
    return this.form.get(TaskFormControl.Location);
  }

  public get chaptersControl(): AbstractControl {
    return this.form.get(TaskFormControl.Chapters);
  }

  public get upPointsControl(): AbstractControl {
    return this.form.get(TaskFormControl.UpPoints);
  }

  public get subtasksControl(): AbstractControl {
    return this.form.get(TaskFormControl.Subtasks);
  }

  public trackByValue(index: number, value: string): string {
    return value;
  }

  public onCadenceFormValidityChange(valid: boolean) {
    this.nextDisabled$.next(!valid);
  }

  public removeUserFromSelectedUsers(incomingUser: string): void {
    const users = this.usersControl.value.filter((user: string) => user !== incomingUser);
    this.usersControl.setValue(users);
  }

  public removeRoleFromSelectedRoles(incomingRole: string): void {
    const roles = this.rolesControl.value.filter((role: string) => role !== incomingRole);
    this.rolesControl.setValue(roles);
  }

  public removeChapterFromSelectedChapters(incomingChapter: string): void {
    const chapters = this.chaptersControl.value.filter((chapter: string) => chapter !== incomingChapter);
    this.chaptersControl.setValue(chapters);
  }

  public selectUserOnMatChipList(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) {
      return;
    }
    const value = event.option.value;
    const usersCopy = [...this.usersControl.value];
    usersCopy.push(value);
    this.usersControl.setValue(usersCopy);
    this.usersInput.nativeElement.value = '';
  }

  public selectRoleOnMatChipList(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) {
      return;
    }
    const value = event.option.value;
    const rolesCopy = [...this.rolesControl.value];
    rolesCopy.push(value);
    this.rolesControl.setValue(rolesCopy);
    this.rolesInput.nativeElement.value = '';
  }

  public selectChapterOnMatChipList(event: MatAutocompleteSelectedEvent): void {
    if (!event.option) {
      return;
    }
    const value = event.option.value;
    const chaptersCopy = [...this.chaptersControl.value];
    chaptersCopy.push(value);
    this.chaptersControl.setValue(chaptersCopy);
    this.chaptersInput.nativeElement.value = '';
  }

  public onNameInput(value: string) {
    this.nameInput$.next(value.trim());
  }

  public onUserInput(event: string) {
    this.userInput$.next(event);
  }

  public onRoleInput(event: string) {
    this.roleInput$.next(event);
  }

  public onTaskClick(task: Task) {
    return this.taskDialogService.openEditTaskDialog(task.id);
  }
}
