import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {OphMenuComponent} from '../../../shared/design/oph-menu/oph-menu.component';
import {DecisionTable} from 'src/app/core/model/decision-table';

/* tslint:disable:no-any */
@Component({
  selector: 'add-task-shortcut',
  templateUrl: './add-task-shortcut.component.html',
  styleUrls: ['./add-task-shortcut.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskShortcutComponent implements OnChanges {
  @Output() addTaskClick = new EventEmitter();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild('addTaskButton')
  public addTaskButtonElement: ElementRef<HTMLButtonElement>;

  @Input()
  tasks: any;

  @Input()
  plan: DecisionTable;

  @Input()
  sked: any;

  filteredTasks: any[];
  searchText: string;

  public onMenuOpen() {
    this.menu.open();
  }

  public onMenuClose() {
    this.menu.close();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.tasks && this.tasks) {
      this.searchInput('');
    }
  }

  public searchInput(noun: string): void {
    this.filteredTasks = this.tasks.filter((tasks: any) => tasks.shortTask.toLowerCase().includes(noun.toLowerCase()));
  }

  public setInputClick(task: any): void {
    const doesItExist = this.sked?.tasks.filter(
      (tasks: any) => tasks.shortTask.toLowerCase() === task.shortTask.toLowerCase()
    );
    const isItComplete = doesItExist.filter(
      (tasks: any) => tasks.status === 'in progress' || tasks.status === 'created'
    );
    if (doesItExist.length === 0) {
      this.addTaskClick.emit(task);
    }
    if (doesItExist.length > 0 && isItComplete.length === 0) {
      this.addTaskClick.emit(task);
    }
    this.onMenuClose();
  }
}
