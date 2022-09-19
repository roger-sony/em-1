import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {Adjective} from '../../../../core/model/adjective';
import {ADJECTIVE_ICON_MAP} from '../shared/adjective-types';
import {Sort} from '@angular/material/sort/sort';

@Component({
  selector: 'adjective-table',
  templateUrl: './adjective-table.component.html',
  styleUrls: ['./adjective-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectiveTableComponent implements AfterViewInit, OnChanges {
  @Input()
  public adjectives: Adjective[];

  @Input()
  public initialSort: MatSort;

  public readonly iconMap: Record<string, string> = ADJECTIVE_ICON_MAP;

  public displayedColumns: string[] = ['name', 'source', 'type', 'values', 'menu'];
  public dataSource = new MatTableDataSource([]);
  public activeIndex$ = new BehaviorSubject<number>(null);

  @Output()
  public menu = new EventEmitter<{type: string; id: string}>();

  @Output()
  public sortOutput: EventEmitter<Sort> = new EventEmitter<null>();

  @ViewChild(MatSort)
  public sort: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.adjectives && this.adjectives) {
      this.formatTableData();
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  private formatTableData() {
    this.dataSource = new MatTableDataSource(this.adjectives);
  }

  public onRowHover(index: number) {
    this.activeIndex$.next(index);
  }

  public onRowLeave(index: number) {
    this.activeIndex$.next(null);
  }

  public onMenuAction(type: string, id: string) {
    this.menu.emit({type, id});
  }

  public onSortChange(e: Sort) {
    this.sortOutput.emit(e);
  }
}
