import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {InventoryService} from '../../core/api/legacy/inventory.service';
import {UnitOfMeasureService} from '../../core/api/legacy/unit-of-measure.service';
import {SpinnerService} from '../../core/page/spinner.service';
import {SharedService} from '../../services/shared.service';
import {RuleTriggerService} from '../../core/api/legacy/rule-trigger.service';
import {DecisionTableService} from '../../core/api/legacy/decision-table.service';
import {TitleService} from '../../core/page/title.service';
import {RangeConfigDto, UnitOfMeasureDto} from '../../core/api/dto/unit-of-measure.dto';
import {NounRuleTriggerDto} from '../../core/api/dto/noun-rule-trigger.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit {
  inventory: any[];
  itemMeasurementSettings: any = {};
  editItem: any = {};
  editValue: number;
  editTrigger: string;
  objectKeys: any = Object.keys;
  triggerOptions: string[];
  rules: any;
  // Adjust Inventory
  adjustingInventory: boolean = false;
  adjustInventoryError: string;
  // Delete Inventory
  deletingInventory: boolean = false;
  deleteItem: any;
  deleteSimilarItems: any[];
  deleteItemRuleTriggers$: any;
  // Inventory Detail Modal
  viewingInventoryDetail: boolean = false;
  activeInventoryItem: any = {};
  inventoryFilters: any = {input: {}};
  pageSize: number;

  /******************************************************************************
                            Table Configuration
******************************************************************************/
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  displayActiveItems: boolean = true;
  displayInactiveItems: boolean = false;
  displayFilters: any = {};
  displayedColumns: string[] = [];
  possibleColumns: string[] = [];
  dataSource: any = [];
  searchValue: string = '';

  /*******************************************************************************
                      Constructor, Lifecycle Hooks
*******************************************************************************/
  constructor(
    private inventoryService: InventoryService,
    private ruleTriggerService: RuleTriggerService,
    private dTableService: DecisionTableService,
    private uomService: UnitOfMeasureService,
    private sharedService: SharedService,
    private loading: SpinnerService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.titleService.setPageTitle('Nouns');

    this.loading.show();
    this.getTriggerOptions();
    this.getAttributes();
    this.getInventory();
    this.getItemMeasurementSettings();
    this.getDefaultRows();
    this.getDecisionTables();
  }

  initializeInventoryTable(): void {
    this.checkLocalStorage();
    this.dataSource = new MatTableDataSource(this.inventory);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      switch (property) {
        case 'qty':
          return parseFloat(item.qty);
        default:
          return item[property];
      }
    };
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter: boolean[] = [];
      const filters: any[] = JSON.parse(filtersJson);
      filters.forEach(filter => {
        const val = data[filter.id] === (null || undefined) ? '' : data[filter.id].toString();
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });
      return matchFilter.every(Boolean); // AND condition
      // return matchFilter.some(Boolean); // OR condition
    };
    this.filterActiveInventory();
    this.loading.hide();
  }

  isUnfilterable(column: string): boolean {
    const unfilterableColumns = ['details', 'adjust_inventory', 'last_updated', 'expiry_date', 'active'];
    return unfilterableColumns.includes(column);
  }

  updateFilters(columnId: string, value: string) {
    this.inventoryFilters.input[columnId] = value;
    localStorage.setItem('inventoryFilters', JSON.stringify(this.inventoryFilters));
    this.displayFilters[columnId] = value;
    this.applyFilters(); // TODO: May need debounce
  }

  applyFilters() {
    const tableFilters: any[] = [];
    const filterKeys = this.objectKeys(this.displayFilters);
    filterKeys.forEach((filter: string) => {
      tableFilters.push({
        id: filter,
        value: this.displayFilters[filter],
      });
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  // TODO: As amt of data increases, front-end only filtering will
  // no longer suffice.
  filterActiveInventory() {
    if (this.displayActiveItems && this.displayInactiveItems) {
      delete this.displayFilters['active'];
    } else if (this.displayActiveItems) {
      this.displayFilters['active'] = 'true';
    } else if (this.displayInactiveItems) {
      this.displayFilters['active'] = 'false';
    } else {
      this.displayFilters['active'] = 'none';
    }
    this.applyFilters();
  }

  /*******************************************************************************
                          Click Handlers
*******************************************************************************/
  handleEditClick(editType: string, item: any): void {
    this.editItem = JSON.parse(JSON.stringify(item));
    this.adjustingInventory = editType === 'adjust' ? true : false;
    this.editTrigger = 'Adjustment'; // set as default trigger
    if (editType === 'cancel') {
      this.adjustInventoryError = '';
      this.editValue = null;
      this.editTrigger = null;
    }
  }

  handleSaveClick(): void {
    const item = this.editItem;
    item._transaction_type = this.editValue > item.qty ? 'delivered' : 'consumed';
    item.qty = this.editValue > item.qty ? this.editValue - item.qty : item.qty - this.editValue;
    item._trigger = this.editTrigger;
    console.log('Adjusting item', item);
    this.createInventory(item);
    this.adjustingInventory = false;
  }

  handleDeleteClick(item: any): void {
    this.deleteItem = item;
    if (this.deleteItem.type === 'concrete') {
      this.deleteSimilarItems = this.inventory.filter(i => i.subcategory === item.subcategory && i._id !== item._id);
    }
    if (this.deleteItem.type === 'abstract') {
      this.deleteItemRuleTriggers$ = this.ruleTriggerService.getNounRuleTriggerBySubcategory(
        this.deleteItem.subcategory
      );
    }
    this.deletingInventory = true;
  }

  closeDeleteInventoryModal(): void {
    this.deletingInventory = false;
    this.deleteItem = null;
    this.deleteSimilarItems = [];
    this.deleteItemRuleTriggers$ = null;
  }

  openInventoryDetail(item: any) {
    this.viewingInventoryDetail = true;
    this.activeInventoryItem = item;
  }

  closeInventoryDetail() {
    this.viewingInventoryDetail = false;
  }

  handleInventoryActiveToggle(item: any) {
    if (item.active) {
      if (confirm(`Are you sure you want to deactivate ${item._display_name}?`)) {
        this.toggleInventoryActiveState(item);
      }
    } else {
      this.toggleInventoryActiveState(item);
    }
  }

  /*******************************************************************************
                            Service Calls
*******************************************************************************/
  getInventory(): void {
    this.inventoryService.getInventory().subscribe(i => {
      this.inventory = i;
      this.initializeInventoryTable();
    });
  }

  getAttributes(): void {
    this.inventoryService.getItemAttributes().subscribe(a => {
      this.possibleColumns = this.objectKeys(a).filter((i: string) => i.charAt(0) !== '_' && i !== 'edit_reason');
      this.possibleColumns.unshift('_display_name');
      this.possibleColumns.unshift('last_updated');
      this.possibleColumns.unshift('details');
      this.possibleColumns.push('adjust_inventory');
      this.possibleColumns.push('active');
    });
  }

  getItemMeasurementSettings(): void {
    this.uomService.getUOMConfigs().subscribe(c => {
      this.itemMeasurementSettings = c.reduce(
        (map: Record<string, UnitOfMeasureDto>, obj) => ((map[obj.noun_subcategory] = obj), map),
        {}
      );
    });
  }

  createInventory(item: any): void {
    this.inventoryService.addItem(item).subscribe(i => {
      this.editValue = null;
      this.editTrigger = null;
      this.editItem = {};
      this.loading.show();
      // TODO: Get response from backend, remove this hack
      setTimeout(() => this.getInventory(), 3500);
    });
  }

  getTriggerOptions(): void {
    this.inventoryService.searchValuesForField('_trigger').subscribe(t => {
      this.triggerOptions = t;
    });
  }

  getDecisionTables(): void {
    this.dTableService.getDTables().subscribe(d => {
      this.rules = d.reduce((map: Record<string, string>, obj) => ((map[obj._id] = obj.display_name), map), {});
    });
  }

  toggleInventoryActiveState(item: any) {
    this.inventoryService.setItemActiveState(item._id, !item.active).subscribe(r => {
      this.getInventory();
    });
  }

  getDefaultRows(): void {
    this.sharedService.getDefaultRows().subscribe(rows => (this.pageSize = rows));
  }

  async deleteItems() {
    this.loading.show();
    const deleteObj = await this.constructItemDeleteObject();
    this.inventoryService.deleteItems(deleteObj).subscribe(
      res => {
        console.log('Deleted items backend response:', res);
        this.deletingInventory = false;
        this.deleteItem = null;
        this.deleteSimilarItems = [];
        this.deleteItemRuleTriggers$ = null;
        this.loading.hide();
        this.getInventory(); // Refresh inventory table to remove deleted item
      },
      err => {
        console.error('Got error', err);
        this.deletingInventory = false;
        this.deleteItem = null;
        this.deleteSimilarItems = [];
        this.deleteItemRuleTriggers$ = null;
        this.loading.hide();
      }
    );
  }

  /*******************************************************************************
                            Local Storage Persistence
*******************************************************************************/
  checkLocalStorage(): void {
    this.possibleColumns.forEach(e => {
      this.inventoryFilters.input[e] = '';
    });
    const inventoryFilters = JSON.parse(localStorage.getItem('inventoryFilters'));

    this.inventoryFilters.input =
      inventoryFilters && inventoryFilters.input ? inventoryFilters.input : this.inventoryFilters.input;
    this.displayedColumns =
      inventoryFilters && inventoryFilters.columns
        ? inventoryFilters.columns
        : [
            'details',
            'last_updated',
            'source',
            'subcategory',
            'location',
            'qty',
            'unit_of_measure',
            'expiry_date',
            'adjust_inventory',
            'active',
          ];
    this.pageSize = inventoryFilters && inventoryFilters.pageSize ? inventoryFilters.pageSize : this.pageSize;
    this.inventoryFilters.columns = this.displayedColumns;
    this.inventoryFilters.pageSize = this.pageSize;

    //find values to trigger filter
    if (inventoryFilters && inventoryFilters.input) {
      for (const e in inventoryFilters.input) {
        if (inventoryFilters.input[e].length > 0) {
          this.displayFilters[e] = inventoryFilters.input[e];
        }
      }
    }
  }

  selectChange(): void {
    this.inventoryFilters.columns = this.displayedColumns;
    localStorage.setItem('inventoryFilters', JSON.stringify(this.inventoryFilters));
  }

  pageSizeChange(size: string): void {
    this.inventoryFilters.pageSize = parseInt(size);
    localStorage.setItem('inventoryFilters', JSON.stringify(this.inventoryFilters));
  }

  clearStorage(): void {
    localStorage.removeItem('inventoryFilters');
    this.checkLocalStorage();
    this.displayFilters = {};
    this.applyFilters();
  }

  /*******************************************************************************
                          Getters, Utilities
*******************************************************************************/
  getRangeMeasurementValue(subcategory: string, qty: string) {
    const valueObj = this.itemMeasurementSettings[subcategory]?.range_config.find(
      (c: RangeConfigDto) => String(c.value) === String(qty)
    );
    console.log(valueObj);
    if (valueObj && valueObj.display_value) {
      return valueObj.display_value;
    } else {
      return null;
    }
  }

  async constructItemDeleteObject() {
    // Set up default object
    const itemDeleteObj = {
      subcategory: this.deleteItem.subcategory,
      nouns: [this.deleteItem],
      ruleTriggers: [] as string[],
    };

    // If similar items were found, check if any have been marked for
    // deletion and add them to the nouns array.
    if (this.deleteSimilarItems && this.deleteSimilarItems.length > 0) {
      console.log('--Found similar items. Adding them to the delete obj.');
      for await (const item of this.deleteSimilarItems) {
        if (item.delete === true) {
          itemDeleteObj.nouns.push(item);
        }
      }
    }

    // If rule triggers were found, add them to the ruleTriggers array
    if (this.deleteItemRuleTriggers$) {
      console.log('--Found rule triggers. Adding them to the delete obj.');
      const triggers: NounRuleTriggerDto[] = await this.deleteItemRuleTriggers$.toPromise();
      itemDeleteObj.ruleTriggers = triggers.map(r => r._id);
    }

    console.log('Completed item delete obj:', itemDeleteObj);
    return itemDeleteObj;
  }
}
