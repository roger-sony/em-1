import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {SearchParams} from 'src/app/core/model/search/search-params';
import {TaskTableColumn} from 'src/app/core/model/task';

@Component({
  selector: 'table-toolbar',
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableToolbarComponent {
  @Input()
  public searchParams: SearchParams;

  @Input()
  public allColumns: string[];

  @Input()
  public columnsChecked: Record<string, boolean>;

  @Output()
  public columnsToDisplay = new EventEmitter<TaskTableColumn>();

  public onCheckboxClick(event: MatCheckboxChange, column: string) {
    this.columnsToDisplay.emit({name: column, checked: event.checked});
  }
}
