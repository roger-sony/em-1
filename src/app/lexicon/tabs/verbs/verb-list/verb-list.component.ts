import {BehaviorSubject} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges, OnChanges} from '@angular/core';
import {Verb} from './../../../../core/model/verb';

@Component({
  selector: 'verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerbListComponent implements OnChanges {
  @Input()
  public verbs: Verb[];

  @Output()
  public delete = new EventEmitter<string>();

  public displayedColumns: string[] = ['name', 'description', 'menu'];
  public dataSource = new MatTableDataSource([]);

  public activeIndex$ = new BehaviorSubject<number>(null);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.verbs && this.verbs) {
      this.dataSource = new MatTableDataSource(this.verbs);
    }
  }

  public onRowHover(index: number) {
    this.activeIndex$.next(index);
  }

  public onRowLeave(index: number) {
    this.activeIndex$.next(null);
  }

  public onDelete(id: string) {
    this.delete.emit(id);
  }
}
