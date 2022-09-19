import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {TaskFull} from 'src/app/core/model/task';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OphMenuComponent} from 'src/app/shared/design/oph-menu/oph-menu.component';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TaskTableComponent implements OnInit, AfterViewInit, OnChanges {
  public pageSize: number = 50;
  public dataSource: MatTableDataSource<TaskFull>;
  public expandedTask: Record<string, boolean> = {};
  public showMenuButton: Record<string, boolean> = {};
  public filterFields: Record<string, string> = {};
  public locations: string[];
  public selectedLocation: string = 'All';
  public selectedAbandon: string = 'All';

  @Input()
  public displayedColumns: string[];

  @Input()
  public tasks: TaskFull[];

  @Input()
  public queryParams: Params;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.filterFields.shortTask = this.queryParams.shortTask || null;
    this.filterFields.category = this.queryParams.category || null;
    this.filterFields.effort = this.queryParams.effort || null;
    this.filterFields.location = this.queryParams.location || null;
    this.filterFields.priority = this.queryParams.priority || null;
    this.filterFields.movability = this.queryParams.movability || null;
    this.filterFields.abandon = this.queryParams.abandon || null;

    this.locations = [...new Set(this.tasks.map(task => task.location).filter(task => task))].sort((a, b) =>
      a > b ? 1 : -1
    );
  }

  ngAfterViewInit(): void {
    this.tasks.forEach(task => (this.expandedTask[task.id] = false));
    this.tasks.forEach(task => (this.showMenuButton[task.id] = false));
    this.setTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks && this.tasks) {
      this.setTableData();
    }
  }

  setTableData(): void {
    this.dataSource = new MatTableDataSource(this.tasks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateFilters(key: string, value: string): void {
    if (key === 'location' && value === 'All') {
      value = null;
    }
    if (key === 'abandon' && value === 'All') {
      value = null;
    }
    this.filterFields[key] = value;
    this.router.navigate([], {
      queryParams: {
        shortTask: this.filterFields.shortTask || null,
        category: this.filterFields.category || null,
        effort: this.filterFields.effort || null,
        location: this.filterFields.location || null,
        priority: this.filterFields.priority || null,
        movability: this.filterFields.movability || null,
        abandon: this.filterFields.abandon || null,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }

  onMouseEnter(id: string) {
    this.showMenuButton[id] = true;
  }

  onMouseLeave(id: string) {
    this.showMenuButton[id] = !this.showMenuButton[id];
  }

  menuButtonClick(id: string) {
    this.showMenuButton[id] = false;
  }

  hideMenuButton(id: string) {
    return this.showMenuButton[id] ? 'menu-button-visible' : 'menu-button-hidden';
  }
}
