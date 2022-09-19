import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TaskService} from '../../../core/api/legacy/task.service';
import {TaskDto} from '../../../core/api/dto/task.dto';
import {RangeConfigDto} from '../../../core/api/dto/unit-of-measure.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'app-decision-table-report-detail',
  templateUrl: './decision-table-report-detail.component.html',
  styleUrls: ['./decision-table-report-detail.component.css'],
})
export class DecisionTableReportDetailComponent implements OnInit {
  @Input() report: any = {};
  @Input() itemMeasurementSettings: any;
  @Output() closeReportModalClick = new EventEmitter<boolean>();
  tasks: any;

  /*******************************************************************
                      Constructor, Lifecycle Hooks
  *******************************************************************/
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  /*******************************************************************
                            Service Calls
  *******************************************************************/
  getTasks(): void {
    this.taskService.getTasks().subscribe((t: TaskDto[]) => {
      // Create hash table to lookup tasks by _id
      this.tasks = t.reduce((map: Record<string, TaskDto>, obj) => ((map[obj._id] = obj), map), {});
    });
  }

  // TODO: This should probably be factored out into a service
  getRangeMeasurementValue(subcategory: string, qty: number) {
    const valueObj = this.itemMeasurementSettings[subcategory].range_config.find(
      (c: RangeConfigDto) => c.value === qty
    );
    if (valueObj && valueObj.display_value) {
      return valueObj.display_value;
    } else {
      return 'Error: Current Value no longer exists for this Noun';
    }
  }

  /*******************************************************************
                          Click Handlers
  *******************************************************************/
  handleCloseModalClick() {
    this.closeReportModalClick.emit(true);
  }
}
