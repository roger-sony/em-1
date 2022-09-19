import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {ProjectTemplateModel, TaskModel} from '../../../core/store/project-builder/project-builder-dummy-data';
import {
  selectProjectBuilderCurrentProject,
  selectProjectBuilderProjectTemplates,
  selectProjectBuilderTabIndex,
  selectProjectBuilderTaskTemplates,
  selectUnsavedProjectChanges,
} from '../../../core/store/project-builder/project-builder.selectors';
import {
  CreateProjectAction,
  CreateTaskAction,
  RemoveCurrentProject,
  SetCurrentProjectAction,
  SetProjectBuilderTabIndexAction,
} from '../../../core/store/project-builder/project-builder.action';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CreateTaskComponent} from '../../create-task/create-task.component';
import {UnsavedChangesConfirmComponent} from '../../../core/store/project-builder/unsaved-changes-confirm/unsaved-changes-confirm.component';
import {take} from 'rxjs/operators';

@Component({
  selector: 'side-tabs',
  templateUrl: './side-tabs.component.html',
  styleUrls: ['./side-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideTabsComponent implements OnInit {
  public readonly tabIndex: Observable<number> = this.store$.pipe(select(selectProjectBuilderTabIndex));
  public readonly taskTemplates: Observable<TaskModel[]> = this.store$.pipe(select(selectProjectBuilderTaskTemplates));
  public readonly projects: Observable<ProjectTemplateModel[]> = this.store$.pipe(
    select(selectProjectBuilderProjectTemplates)
  );
  public readonly currentProject: Observable<ProjectTemplateModel> = this.store$.pipe(
    select(selectProjectBuilderCurrentProject)
  );
  public readonly hasUnsavedChanges: Observable<boolean> = this.store$.pipe(select(selectUnsavedProjectChanges));

  constructor(private store$: Store, private dialog: MatDialog) {}

  ngOnInit(): void {}

  onTabChange(event: MatTabChangeEvent) {
    this.store$.dispatch(new SetProjectBuilderTabIndexAction({tabIndex: event.index}));
  }

  onProjectChange(event: MouseEvent, project: ProjectTemplateModel, currentProject: ProjectTemplateModel) {
    event.preventDefault();
    event.stopPropagation();

    if (project.id === currentProject?.id) {
      return;
    }

    this.hasUnsavedChanges.pipe(take(1)).subscribe(hasUnsavedChanges => {
      if (hasUnsavedChanges) {
        this.dialog
          .open(UnsavedChangesConfirmComponent, {...new MatDialogConfig()})
          .afterClosed()
          .subscribe(res => {
            if (res) {
              if (!project.title && !project.color && !project.tasks?.length) {
                this.store$.dispatch(new RemoveCurrentProject());
              }

              this.store$.dispatch(new SetCurrentProjectAction({id: project.id}));
            }
          });
      } else {
        this.store$.dispatch(new SetCurrentProjectAction({id: project.id}));
      }
    });
  }

  createTask() {
    this.dialog
      .open(CreateTaskComponent, {
        ...new MatDialogConfig(),
        panelClass: 'project-builder-task-create',
      })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.store$.dispatch(new CreateTaskAction({task: result}));
        }
      });
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
}
