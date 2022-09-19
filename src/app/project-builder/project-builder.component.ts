import {Component, ChangeDetectionStrategy, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {
  selectSaveInProgress,
  selectProjectBuilderCurrentProject,
  selectProjectBuilderType,
  selectUnsavedProjectChanges,
} from '../core/store/project-builder/project-builder.selectors';
import {ProjectTemplateModel, TaskModel} from '../core/store/project-builder/project-builder-dummy-data';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {CreateTaskComponent} from './create-task/create-task.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  ClearProjectBuilderAction,
  CreateProjectAction,
  CreateTaskAction,
  SaveCurrentProjectAction,
  SetSaveInProgressAction,
  UpdateCurrentProjectAction,
} from '../core/store/project-builder/project-builder.action';
import {EditTaskComponent} from './edit-task/edit-task.component';
// import {RenameProjectComponent} from './rename-project/rename-project.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'project-builder',
  templateUrl: './project-builder.component.html',
  styleUrls: ['./project-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectBuilderComponent implements OnDestroy {
  @ViewChild(MatMenuTrigger) colorsTrigger: MatMenuTrigger;

  public readonly currentProject: Observable<ProjectTemplateModel> = this.store$.pipe(
    select(selectProjectBuilderCurrentProject)
  );
  public readonly hasUnsavedChanges: Observable<boolean> = this.store$.pipe(select(selectUnsavedProjectChanges));
  public readonly saveInProgress: Observable<boolean> = this.store$.pipe(select(selectSaveInProgress));
  public readonly builderType: Observable<'horizontal' | 'vertical'> = this.store$.pipe(
    select(selectProjectBuilderType)
  );
  public readonly colors: string[] = [
    '#FF9F2D',
    '#FF5656',
    '#FFD12D',
    '#6DC628',
    '#795FF9',
    '#4AA8FF',
    '#2167A7',
    '#6DD1AD',
    '#3CD2DC',
    '#FF63F9',
    '#FF93C7',
    '#FD6A3C',
    '#B3E746',
    '#834DAE',
  ];

  public readonly form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  });

  public isEditingProjectName: boolean = false;

  constructor(
    // @Inject(MAT_DIALOG_DATA) data: {title: string},
    private store$: Store,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef // private data: { //   title: string; // }
  ) {
    // this.form.get('title')?.patchValue(this.form);
    // console.log(this.form.get('title'));
  }

  save() {
    console.log(this.form.get('title')?.value);
  }

  ngOnDestroy(): void {
    this.store$.dispatch(new ClearProjectBuilderAction());
  }

  // tslint:disable-next-line:no-any
  drop(event: CdkDragDrop<{[key: string]: string | string[] | number | boolean} & any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const transferItem = {...event.previousContainer.data[event.previousIndex]};
      const isDuplicate = event.container.data.some((i: TaskModel) => i.name === transferItem.name);

      if (!isDuplicate) {
        const item = JSON.parse(JSON.stringify(event.previousContainer.data[event.previousIndex]));
        event.container.data.push(item);
      }
    }
  }

  createTaskForTemplate(project: ProjectTemplateModel) {
    this.dialog
      .open(CreateTaskComponent, {
        ...new MatDialogConfig(),
        panelClass: 'project-builder-task-create',
      })
      .afterClosed()
      .subscribe(result => {
        if (project && result) {
          this.store$.dispatch(
            new CreateTaskAction({
              task: {
                actualEffort: 0,
                assignedTo: [],
                batchID: '',
                cadence: {},
                canBeAbandoned: false,
                conditions: [],
                description: '',
                endsAfter: 0,
                endsType: 'never',
                endsOn: '',
                flexCount: 0,
                flexType: '',
                frequencyType: 'repeat',
                instanceStartTime: '',
                occursOn: '',
                paragraph: {},
                priority: 0,
                repeatEveryCount: 0,
                repeatEveryType: '',
                repeatOn: '',
                score: 0,
                actions: [],
                startedAt: '',
                startsDay: 1,
                startsOnDate: '',
                startsType: 'day',
                status: 'unclaimed',

                ...result,
              },
              onSuccess: () => project.tasks.push({...result}),
            })
          );
        }
      });
  }

  editTask(project: ProjectTemplateModel, taskIndex: number) {
    this.dialog
      .open(EditTaskComponent, {
        ...new MatDialogConfig(),
        panelClass: 'project-builder-task-edit',
        data: {
          task: JSON.parse(JSON.stringify(project.tasks[taskIndex])),
        },
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          project.tasks[taskIndex] = res;
          this.cdRef.detectChanges();
        }
      });
  }

  removeTask(project: ProjectTemplateModel, taskIndex: number) {
    project.tasks = project.tasks.filter((t, i) => i !== taskIndex);
  }

  isProjectSelected(project: ProjectTemplateModel) {
    return !!Object.keys(project).length;
  }

  createProject() {
    this.store$.dispatch(
      new CreateProjectAction({
        project: {
          title: '',
          color: null,
          assignTo: [],
          tasks: [],
          id: null,
        },
      })
    );
  }

  // editProjectName(project: ProjectTemplateModel) {
  //   this.dialog
  //     .open(RenameProjectComponent, {
  //       ...new MatDialogConfig(),
  //       data: {
  //         title: `${project.title}`,
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe(res => {
  //       if (res) {
  //         project.title = res;
  //         this.store$.dispatch(new UpdateCurrentProjectAction({project}));
  //
  //         setTimeout(() => {
  //           this.store$.dispatch(new SetSaveInProgressAction({saveInProgress: true}));
  //           this.store$.dispatch(new SaveCurrentProjectAction({project}));
  //         }, 2500);
  //       }
  //     });
  // }

  editProjectName(project: ProjectTemplateModel) {
    // {
    // ...new MatDialogConfig(),
    //   data: {
    //     title: `${project.title}`,
    //   },
    // }

    if (this.form.get('title')?.value) {
      project.title = this.form.get('title')?.value;
      this.store$.dispatch(new UpdateCurrentProjectAction({project}));

      setTimeout(() => {
        this.store$.dispatch(new SetSaveInProgressAction({saveInProgress: true}));
        this.store$.dispatch(new SaveCurrentProjectAction({project}));
      }, 2500);
    }
  }

  checkIfEditingProjectName() {
    return this.isEditingProjectName;
  }

  setIsEditingProjectName() {
    this.isEditingProjectName = true;
  }

  setIsNotEditingProjectName() {
    this.isEditingProjectName = false;
  }

  toggleEditingProjectName(project: ProjectTemplateModel) {
    this.isEditingProjectName = !this.isEditingProjectName;

    this.editProjectName(project);
  }

  onColorMenuClick(project: ProjectTemplateModel) {
    if (!this.isProjectSelected(project)) {
      this.colorsTrigger.closeMenu();
    }
  }

  onColorSelect(project: ProjectTemplateModel, color: string) {
    project.color = color;
    this.store$.dispatch(new UpdateCurrentProjectAction({project}));

    setTimeout(() => {
      this.store$.dispatch(new SetSaveInProgressAction({saveInProgress: true}));
      this.store$.dispatch(new SaveCurrentProjectAction({project}));
    }, 2500);
  }

  saveProject(project: ProjectTemplateModel) {
    this.store$.dispatch(new SetSaveInProgressAction({saveInProgress: true}));
    this.store$.dispatch(new SaveCurrentProjectAction({project}));
  }
}
