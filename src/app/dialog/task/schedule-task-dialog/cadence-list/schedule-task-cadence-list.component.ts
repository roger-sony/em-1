import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CadenceForm} from 'src/app/core/model/form/cadence-form';

@Component({
  selector: 'schedule-task-cadence-list',
  templateUrl: './schedule-task-cadence-list.component.html',
  styleUrls: ['./schedule-task-cadence-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleTaskCadenceListComponent implements OnChanges {
  @Input()
  public cadences: CadenceForm[];

  @Output()
  public valueChange = new EventEmitter<CadenceForm[]>();

  public cadences$ = new BehaviorSubject<CadenceForm[]>(null);

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cadences && this.cadences) {
      this.cadences$.next(this.cadences);
    }
  }

  public onDelete(index: number) {
    const cadences = [...this.cadences$.value];
    cadences.splice(index, 1);
    this.valueChange.emit(cadences);
  }
}
