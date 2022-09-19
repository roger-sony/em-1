import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {TaskModel} from '../../core/store/project-builder/project-builder-dummy-data';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {RenameSubtaskComponent} from './rename-task/rename-subtask.component';

@Component({
  selector: 'edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent implements OnInit {
  @ViewChild('assigneeInput') assigneeInput: ElementRef<HTMLInputElement>;

  public readonly icons: string[] = [
    'bucket',
    'fish',
    'grid',
    'leaf',
    'mag',
    'palette',
    'pencil',
    'thermometer',
    'walk',
  ];
  public readonly assigneeCtrl = new FormControl('');
  public readonly filteredAssignees: Observable<string[]> = this.getFilteredAssigneeSubscription();
  public readonly separatorKeyCodes: number[] = [ENTER, COMMA];
  public readonly flexCounts: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  public readonly allAssignees: string[] = [
    'Jack Russel',
    'Shiba Inu',
    'Labrador Retriever',
    'Golden Retriever',
    'Siberian Husky',
    'French Bulldog',
    'Airedale Terrier',
    'Yorkshire Terrier',
    'American Eskimo Dog',
    'Great Dane',
    'Bichon Frise',
    'Bull Terrier',
  ];
  public readonly form: FormGroup = new FormGroup({
    assignTo: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    duration: new FormControl(0, [Validators.required, Validators.min(1)]),
    endsType: new FormControl(null),
    endsOnDate: new FormControl(null, Validators.required),
    endsAfterDate: new FormControl(null, Validators.required),
    icon: new FormControl(this.icons[0]),
    flexCount: new FormControl(null),
    flexType: new FormControl(null),
    frequencyType: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    occursOnCount: new FormControl(null, Validators.required),
    occursOnType: new FormControl(null, Validators.required),
    performOn: new FormControl(null, Validators.required),
    priority: new FormControl(null, Validators.required),
    repeatEveryCount: new FormControl([]),
    repeatEveryType: new FormControl([]),
    repeatOn: new FormControl([]),
    subtasks: new FormControl([]),
  });

  public activeTab: 'details' | 'subtasks' | 'frequency' = 'details';
  public assignees: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {task: TaskModel},
    private dialogRef: MatDialogRef<EditTaskComponent>,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {
    this.form.patchValue(this.data.task);
  }

  ngOnInit(): void {}

  getFilteredAssigneeSubscription() {
    return this.assigneeCtrl.valueChanges.pipe(
      startWith(null),
      map((assignee: string | null) => {
        if (assignee) {
          return this._filter(assignee);
        }

        return this.allAssignees
          .slice()
          .filter(a => !this.assignees.includes(a))
          .sort((a, b) => a.localeCompare(b));
      })
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAssignees
      .filter(a => !this.assignees.includes(a))
      .filter(assignee => assignee.toLowerCase().includes(filterValue.toLowerCase()))
      .sort((a, b) => a.localeCompare(b));
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.form.markAllAsTouched();
    this.dialogRef.close({
      ...this.form.value,
      assignTo: [...this.assignees],
    });
  }

  addAssignee(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.assignees.push(value);
    }

    this.assigneeInput.nativeElement.value = '';

    this.assigneeCtrl.setValue(null);
  }

  removeAssignee(fruit: string): void {
    const index = this.assignees.indexOf(fruit);

    if (index >= 0) {
      this.assignees.splice(index, 1);
    }
    this.assigneeCtrl.setValue(null);
  }

  assigneeSelected(event: MatAutocompleteSelectedEvent): void {
    this.assignees.push(event.option.viewValue);
    this.assigneeInput.nativeElement.value = '';
    this.assigneeCtrl.setValue(null);
  }

  onPerformOnChipClick(value: string) {
    const control = this.form.get('performOn');

    if (!control.value) {
      control.patchValue([value]);
    } else if (control.value?.includes(value)) {
      control.patchValue(control.value.filter((v: string) => v !== value));
    } else {
      control.patchValue([...control.value, value]);
    }
  }

  // tslint:disable-next-line:no-any
  drop(event: CdkDragDrop<any[]>) {
    const subtasks = [...this.form.get('subtasks').value];
    const item = subtasks.splice(event.previousIndex, 1)[0];

    subtasks.splice(event.currentIndex, 0, item);
    this.form.get('subtasks').patchValue(subtasks);
  }

  addSubtask(a: HTMLInputElement) {
    const subtasks = this.form.get('subtasks').value || [];
    this.form.get('subtasks').patchValue([...subtasks, a.value]);
    a.value = '';
  }

  editSubtask(i: number) {
    const subtasks = this.form.get('subtasks').value;

    this.dialog
      .open(RenameSubtaskComponent, {
        ...new MatDialogConfig(),
        data: {
          currentName: subtasks[i],
        },
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          subtasks[i] = res;

          this.form.get('subtasks').patchValue([...subtasks]);
          this.cdRef.detectChanges();
        }
      });
  }

  removeSubtask(i: number) {
    const subtasks = this.form.get('subtasks').value || [];
    subtasks.splice(i, 1);
    this.form.get('subtasks').patchValue([...subtasks]);
  }
}
