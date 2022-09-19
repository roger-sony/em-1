import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {InventoryService} from '../../../core/api/legacy/inventory.service';
import {SkedService} from '../../../core/api/legacy/sked.service';
import {UnitOfMeasureService} from '../../../core/api/legacy/unit-of-measure.service';
import {SpinnerService} from '../../../core/page/spinner.service';
import {RangeConfigDto, UnitOfMeasureDto} from '../../../core/api/dto/unit-of-measure.dto';
import {TaskCheckListItemDto} from '../../../core/api/dto/task.dto';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {ProductionEnvironmentService} from 'src/app/core/page/production-environment.service';

/* tslint:disable:no-any */
@Component({
  selector: 'sked-begin-task-ph-modal',
  templateUrl: './begin-task-ph-modal.component.html',
  styleUrls: ['./begin-task-ph-modal.component.css'],
})
export class BeginTaskPhModalComponent implements OnInit {
  @Input() task: any = {};
  @Input() activeTask: any;
  @Output() openAbandonModalClick = new EventEmitter<boolean>();
  @Output() handlePauseTask = new EventEmitter<boolean>();
  @Output() closeTaskDetailDoneClick = new EventEmitter<boolean>();
  @Output() observations = new EventEmitter<object>();
  subtaskInputs: any = {};
  selection: any = {};
  panelOpenState: any[] = [];
  icon: any[] = [];
  valueUpdated: any[] = [];
  viewingSubmitModal: boolean = false;
  subtasks: any[] = [];
  filteredSubtasks: any[] = [];
  itemMeasurementSettings: any;
  rangeTypeSubmitted: boolean = false;
  observationToSend: any = {};
  subtaskStorage: any = {};
  locations: any[] = [];
  selected: string;
  noExpiryArr: any[] = [];

  public skedsLegacy$: Observable<boolean>;

  constructor(
    private inventoryService: InventoryService,
    private skedService: SkedService,
    private uomService: UnitOfMeasureService,
    private loading: SpinnerService,
    private productionEnvironmentService: ProductionEnvironmentService
  ) {}

  ngOnInit() {
    this.loading.show();
    this.skedsLegacy$ = this.productionEnvironmentService.observeHostname();

    this.getSubtasks();
  }

  /*******************************************************************************
                            General Utilities
*******************************************************************************/

  observationUpdate(): void {
    const checkOb = (obj: any) => obj.observations;
    if (!this.valueUpdated.some(checkOb)) {
      this.valueUpdated.push({observations: this.task.observations});
    } else {
      this.valueUpdated.map((e, index) => {
        if (e.observations) {
          e.observations = this.task.observations;
          e.createdDate = new Date();
        }
      });
    }
    this.subtaskStorage[this.activeTask._id] = this.valueUpdated;
    localStorage.setItem('subtasks', JSON.stringify(this.subtaskStorage));
  }

  iconArray(): void {
    this.icon = [];
    if (this.subtasks && this.subtasks.length > 0) {
      this.subtasks.map(e => {
        this.icon.push('expand_more');
      });
    }
  }

  subtaskUpdate(id: string, input: any): void {
    if (input) {
      this.subtaskInputs[id] = input;
    }
  }

  //This is used to make a copy of the object - one is for display, one for sending to backend
  iterationCopy(src: any) {
    const target: any = {};
    for (const prop in src) {
      if (src.hasOwnProperty(prop)) {
        // if the value is a nested object, recursively copy all it's properties
        if (this.isObject(src[prop])) {
          target[prop] = this.iterationCopy(src[prop]);
        } else {
          target[prop] = src[prop];
        }
      }
    }
    return target;
  }

  isObject(obj: any) {
    const type = typeof obj;
    return type === 'function';
  }

  async matchSubtaskToUOM() {
    await this.subtasks.map((task, index) => {
      for (const i in this.itemMeasurementSettings) {
        if (i === task.noun.subcategory) {
          task.uom = this.itemMeasurementSettings[i];
        }
      }
    });
    this.searchLocalStorage();
    this.iconArray();
    this.findCurrentRangeValue();
  }

  async findCurrentRangeValue() {
    await this.subtasks.map(task => {
      if (task.uom && task.uom.type === 'range') {
        task.uom.range_config.map((r: RangeConfigDto) => {
          if (r.value === task.noun.qty.$numberDecimal) {
            task.uom.currentValue = r.display_value;
          }
        });
      }
    });
    await this.findExpiryDates(this.subtasks);
    await this.handleSelectionChange();
    this.loading.hide();
  }

  searchLocalStorage(): void {
    const localStorageSubtask = JSON.parse(localStorage.getItem('subtasks'));
    const localStorageLocationfilter = JSON.parse(localStorage.getItem('locationFilter'));
    if (localStorageSubtask) {
      this.subtaskStorage = localStorageSubtask;
      for (const i in localStorageSubtask) {
        if (i === this.activeTask._id) {
          const tempId = this.activeTask._id;
          this.valueUpdated = localStorageSubtask[tempId];
          this.subtasks.map(subtask => {
            localStorageSubtask[tempId].map((e: any) => {
              if (subtask.noun._id === e.id && e.type === 'range') {
                subtask.updated = true;
                subtask.uom.range_config.map((r: any) => {
                  if (parseFloat(subtask.noun.qty.$numberDecimal) === r.value) {
                    r.checked = true;
                  }
                });
              } else if (subtask.noun._id === e.id && e.type === 'Current value') {
                subtask.updated = true;
              } else if (e.observations && e.observations.length > 0) {
                this.task = e;
              }
            });
          });
        }
      }
    }
    if (localStorageLocationfilter) {
      this.selected = localStorageLocationfilter.location;
    } else {
      this.selected = 'All';
    }
  }

  filterUpdateValues(newData: any): void {
    const checkId = (obj: any) => obj.id === newData.id;
    if (!this.valueUpdated.some(checkId)) {
      this.valueUpdated.push(newData);
    } else {
      this.valueUpdated.map((e, index) => {
        if (e.id === newData.id) {
          this.valueUpdated[index].value = newData.value;
          this.valueUpdated[index].createdDate = new Date();
          this.valueUpdated[index].subtask = newData.subtask;
        }
      });
    }

    this.subtaskStorage[this.activeTask._id] = this.valueUpdated;
    localStorage.setItem('subtasks', JSON.stringify(this.subtaskStorage));
  }

  findLocations(): void {
    this.subtasks.map(task => {
      if (this.locations.indexOf(task.noun.location) === -1) {
        this.locations.push(task.noun.location);
      }
      if (!task.noun.location) {
        this.noExpiryArr.unshift(task);
      }
    });
    this.locations.map((l, index) => {
      if (!l) {
        this.locations[index] = '(No location specified)';
      }
    });
  }

  async findExpiryDates(tasks: any[]) {
    const tempArrExpiry: any[] = [];
    const tempArrNoExpiry: any[] = [];
    tasks.map(t => {
      if (t.noun.expiry_date) {
        tempArrExpiry.push(t);
      } else {
        tempArrNoExpiry.push(t);
      }
    });
    tempArrExpiry.sort(this.compare);
    const newArr = tempArrExpiry.concat(tempArrNoExpiry);
    this.subtasks = newArr;
  }

  /*******************************************************************************
                            Service Calls
*******************************************************************************/

  createInventory(item: any): void {
    this.inventoryService.addItem(item).subscribe(i => {
      this.getSubtasks();
    });
  }

  getSubtasks(): void {
    this.loading.show();
    this.skedsLegacy$.pipe(take(1)).subscribe(skedLegacy => {
      if (skedLegacy) {
        this.getLegacySubtasks();
      } else {
        this.getFlexSubtasks();
      }
    });
  }

  getLegacySubtasks() {
    this.skedService.getSkedSubtasks(this.activeTask._id).subscribe(s => {
      this.getItemMeasurementSettings();
      this.subtasks = s.slice();
      //change class of updated item to display green on UI
      if (this.valueUpdated && this.valueUpdated.length > 0) {
        this.subtasks.map(subtask => {
          this.valueUpdated.map(e => {
            if (subtask.noun._id === e.id) {
              subtask.updated = true;
            }
          });
        });
      }
      this.findLocations();
    });
  }

  getFlexSubtasks() {
    this.skedService.getFlexSkedSubtasks(this.activeTask._id).subscribe(s => {
      this.getItemMeasurementSettings();
      this.subtasks = s.slice();
      //change class of updated item to display green on UI
      if (this.valueUpdated && this.valueUpdated.length > 0) {
        this.subtasks.map(subtask => {
          this.valueUpdated.map(e => {
            if (subtask.noun._id === e.id) {
              subtask.updated = true;
            }
          });
        });
      }
      this.findLocations();
    });
  }

  getItemMeasurementSettings(): void {
    this.uomService.getUOMConfigs().subscribe(c => {
      this.itemMeasurementSettings = c.reduce(
        (map: Record<string, UnitOfMeasureDto>, obj) => ((map[obj.noun_subcategory] = obj), map),
        {}
      );
      this.matchSubtaskToUOM();
    });
  }

  /*******************************************************************
                          Click Handlers
  *******************************************************************/
  handleCancelModalClick(): void {
    this.openAbandonModalClick.emit(true);
  }

  togglePanel(i: number): void {
    this.panelOpenState[i] = !this.panelOpenState[i];
    this.icon[i] = this.panelOpenState[i] ? 'expand_less' : 'expand_more';
  }

  handleChangeCurrentValue(id: string, index: number, type: string): void {
    const task = this.subtasks.filter(t => t.noun._id === id);
    const item = task[0].noun;
    const userInput = parseFloat(this.subtaskInputs[id]);
    if (userInput) {
      item._transaction_type = userInput > parseFloat(item.qty.$numberDecimal) ? 'delivered' : 'consumed';
      item.qty = Math.abs(userInput - item.qty.$numberDecimal);
      item._trigger = 'Subtask Adjustment';

      const s = type === 'pH' ? '' : 's';
      const data = {
        id: id,
        type: 'Current value',
        subtask: `${this.subtasks[index].verb} ${item.subcategory}`,
        value: `${type}: ${userInput} ${item.unit_of_measure}${s}`,
        createdDate: new Date(),
      };
      this.filterUpdateValues(data);
      console.log('Adjusting item', item);
      //makes deep copy of object to send to backend
      const itemSend = this.iterationCopy(item);
      this.adjustItemForBackend(itemSend);
    }
  }

  adjustItemForBackend(item: any): void {
    this.createInventory(item);
  }

  handleChangeRangeValue(value: number, displayValue: string, id: string): void {
    const task = this.subtasks.filter(t => t.noun._id === id);
    const item = task[0].noun;
    item._trigger = 'Subtask Adjustment';
    const data = {
      id: item._id,
      type: 'range',
      subtask: `${task[0].verb} ${item.subcategory}`,
      value: `${displayValue}`,
      createdDate: new Date(),
    };
    this.filterUpdateValues(data);
    item._transaction_type = value > item.qty.$numberDecimal ? 'delivered' : 'consumed';
    item.qty = Math.abs(value - item.qty.$numberDecimal);
    this.rangeTypeSubmitted = true;
    console.log('Adjusting item', item);
    //makes deep copy of object to send to backend
    const itemSend = this.iterationCopy(item);
    this.adjustItemForBackend(itemSend);
  }

  submitTask(): void {
    if (this.task.observations && this.task.observations.length > 0) {
      this.valueUpdated.push({observations: this.task.observations});
      this.observationToSend = {id: this.activeTask._id, observations: this.task.observations};
    } else {
      this.observationToSend = {id: this.activeTask._id, observations: ''};
    }
    this.viewingSubmitModal = true;
  }

  closeSubmitModalOnly(): void {
    this.viewingSubmitModal = false;
  }

  closeSubmitModal(): void {
    this.viewingSubmitModal = false;
    this.observations.emit(this.observationToSend);
    this.closeTaskDetailDoneClick.emit(true);
  }

  handlePauseTaskClick(): void {
    this.handlePauseTask.emit(true);
  }

  handleSelectionChange(): void {
    this.filteredSubtasks = [];
    const locationFilter = JSON.stringify({location: this.selected});
    localStorage.setItem('locationFilter', locationFilter);
    if (this.selected === 'All') {
      this.filteredSubtasks = this.subtasks;
    } else if (this.selected === '(No location specified)') {
      this.filteredSubtasks = this.noExpiryArr;
    } else {
      this.subtasks.map(task => {
        if (this.selected === task.noun.location) {
          this.filteredSubtasks.push(task);
        }
      });
    }
  }

  compare(a: any, b: any) {
    const date1 = a.noun.expiry_date;
    const date2 = b.noun.expiry_date;

    let comparison = 0;
    if (date1 > date2) {
      comparison = 1;
    } else if (date1 < date2) {
      comparison = -1;
    }
    return comparison;
  }

  /** Whether the number of selected items matches the total number of items. */
  areAllCheckListItemsSelected() {
    const numSelectedItems = this.activeTask.checkList.filter((c: TaskCheckListItemDto) => c.value === true).length;
    const numTotalItems = this.activeTask.checkList.length;
    return numSelectedItems === numTotalItems;
  }

  /** Selects all items if they are not all selected; otherwise clear selection. */
  masterCheckListToggle() {
    this.areAllCheckListItemsSelected()
      ? this.activeTask.checkList.forEach((c: TaskCheckListItemDto) => (c.value = false))
      : this.activeTask.checkList.forEach((c: TaskCheckListItemDto) => (c.value = true));
  }
}
