import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject} from 'rxjs';
import {Sentence} from './../../../../core/model/sentence';

@Component({
  selector: 'sentence-list',
  templateUrl: './sentence-list.component.html',
  styleUrls: ['./sentence-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentenceListComponent implements OnChanges {
  @Input()
  public sentences: Sentence[];

  @Output()
  public delete = new EventEmitter<string>();

  public displayedColumns: string[] = ['name', 'menu'];
  public dataSource = new MatTableDataSource([]);

  public activeIndex$ = new BehaviorSubject<number>(null);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sentences && this.sentences) {
      this.dataSource = new MatTableDataSource(this.sentences);
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
