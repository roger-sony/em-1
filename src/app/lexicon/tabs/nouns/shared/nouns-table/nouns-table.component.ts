import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UnitOfMeasureService} from '../../../../../core/api/legacy/unit-of-measure.service';
import {RangeConfigDto, UnitOfMeasureDto} from '../../../../../core/api/dto/unit-of-measure.dto';
import {Subscription} from 'rxjs';
import {NounDto} from '../../../../../core/api/dto/noun.dto';

@Component({
  selector: 'nouns-table',
  templateUrl: './nouns-table.component.html',
  styleUrls: ['./nouns-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NounsTableComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  @Input() public nouns: NounDto[];
  @Input() public queryParams: Params;
  @Input() public displayedColumns: string[];

  readonly subscriptions: Subscription = new Subscription();

  public pageSize: number = 10;
  public dataSource: MatTableDataSource<NounDto>;
  public expandedTask: Record<string, boolean> = {};
  public filterFields: Record<string, string> = {};
  public locations: string[];
  public selectedLocation: string = 'All';
  public selectedAbandon: string = 'All';
  public viewingInventoryDetail: boolean;
  // tslint:disable-next-line:no-any
  public activeInventoryItem: any;
  public adjustingInventory: boolean;
  public editTrigger: string;
  public adjustInventoryError: string;
  // tslint:disable-next-line:no-any
  public editItem: any;
  public editValue: string;
  // tslint:disable-next-line:no-any
  public itemMeasurementSettings: {[key: string]: any} = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private uomService: UnitOfMeasureService
  ) {}

  ngOnInit(): void {
    this.filterFields.shortTask = this.queryParams.shortTask || null;
    this.filterFields.category = this.queryParams.category || null;
    this.filterFields.effort = this.queryParams.effort || null;
    this.filterFields.location = this.queryParams.location || null;
    this.filterFields.priority = this.queryParams.priority || null;
    this.filterFields.movability = this.queryParams.movability || null;
    this.filterFields.abandon = this.queryParams.abandon || null;
    this.filterFields.qty = this.queryParams.qty || null;
    this.filterFields.source = this.queryParams.source || null;
    this.filterFields.subcategory = this.queryParams.subcategory || null;
    this.filterFields.unit_of_measure = this.queryParams.unit_of_measure || null;
    this.filterFields.last_updated = this.queryParams.last_updated || null;
    this.filterFields.color = this.queryParams.color || null;
    this.filterFields.maker = this.queryParams.maker || null;
    this.filterFields.model = this.queryParams.model || null;
    this.filterFields.perishable = this.queryParams.perishable || null;
    this.filterFields.sku = this.queryParams.sku || null;
    this.filterFields.type = this.queryParams.type || null;
    this.filterFields.display_name = this.queryParams.display_name || null;
    this.filterFields.master_item = this.queryParams.master_item || null;

    // this.locations = [...new Set(this.nouns.map(noun => noun.location).filter(noun => noun))]
    //   .sort((a, b) => a > b ? 1 : -1);
  }

  ngAfterViewInit(): void {
    this.nouns.forEach(noun => (this.expandedTask[noun.id] = false));
    this.setTableData();
    this.getItemMeasurementSettings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nouns && this.nouns) {
      this.setTableData();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setTableData(): void {
    this.dataSource = new MatTableDataSource(this.nouns.slice(0, this.pageSize));
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
        qty: this.filterFields.qty || null,
        source: this.filterFields.source || null,
        subcategory: this.filterFields.subcategory || null,
        unit_of_measure: this.filterFields.unit_of_measure || null,
        last_updated: this.filterFields.lastUpdated || null,
        color: this.filterFields.color || null,
        maker: this.filterFields.maker || null,
        model: this.filterFields.model || null,
        perishable: this.filterFields.perishable || null,
        sku: this.filterFields.sku || null,
        type: this.filterFields.type || null,
        display_name: this.filterFields.display_name || null,
        master_item: this.filterFields.master_item || null,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute,
    });
  }

  getItemMeasurementSettings(): void {
    this.subscriptions.add(
      this.uomService.getUOMConfigs().subscribe(c => {
        this.itemMeasurementSettings = c.reduce(
          (map: Record<string, UnitOfMeasureDto>, obj) => ((map[obj.noun_subcategory] = obj), map),
          {}
        );
      })
    );
  }

  getRangeMeasurementValue(subcategory: string, qty: string) {
    const valueObj = this.itemMeasurementSettings[subcategory].range_config.find(
      (c: RangeConfigDto) => String(c.value) === String(qty)
    );
    if (valueObj && valueObj.display_value) {
      return valueObj.display_value;
    } else {
      return null;
    }
  }

  isFilterable(column: string): boolean {
    const nonFilterable = [
      'details',
      'adjust_inventory',
      'last_updated',
      'expiry_date',
      'lastUpdated',
      'expiryDate',
      'active',
    ];
    return !nonFilterable.includes(column);
  }

  shouldShowLabel(c: string) {
    return !['adjust_inventory', 'active', 'details'].includes(c);
  }

  // tslint:disable-next-line:no-any
  handleEditClick(editType: string, item: any): void {
    this.editItem = JSON.parse(JSON.stringify(item));
    this.adjustingInventory = editType === 'adjust';
    this.editTrigger = 'Adjustment'; // set as default trigger
    if (editType === 'cancel') {
      this.adjustInventoryError = '';
      this.editValue = null;
      this.editTrigger = null;
    }
  }

  // tslint:disable-next-line:no-any
  openInventoryDetail(item: any) {
    this.viewingInventoryDetail = true;
    this.activeInventoryItem = item;
  }
}
