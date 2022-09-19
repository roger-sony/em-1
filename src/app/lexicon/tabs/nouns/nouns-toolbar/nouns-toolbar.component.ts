import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {SearchParams} from '../../../../core/model/search/search-params';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {SortOption} from '../../../../core/model/search/sort-option';
import {UpdateDisplayedColumnsAction} from '../../../../core/store/nouns/nouns.action';
import {NounDto} from '../../../../core/api/dto/noun.dto';

@Component({
  selector: 'nouns-toolbar',
  templateUrl: './nouns-toolbar.component.html',
  styleUrls: ['./nouns-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounsToolbarComponent implements AfterViewInit, OnChanges {
  @Input() cardView: boolean;
  @Input() displayedColumns: string[];
  @Input() readonly possibleColumns: string[];
  @Input() includeConcrete: boolean = true;
  @Input() includeAbstract: boolean = true;
  @Input() includeAction: boolean = false;
  @Input() searchParams: SearchParams;

  @Output()
  inactiveStateChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output()
  includeConcreteChange: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output()
  includeAbstractChange: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  @Output()
  includeActionChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output()
  createNoun: EventEmitter<{action: string; noun?: NounDto}> = new EventEmitter<{action: string; noun?: NounDto}>();
  @Output()
  public displayedColumnsChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()
  public toggleView: EventEmitter<boolean> = new EventEmitter<boolean>();

  public columnsMenuOpened: boolean = false;
  public hideDisabled: boolean = false;
  public sortField: string;
  public sortDirection: string;
  public name: string;
  public readonly sortOptions: SortOption[] = [
    {
      field: 'name',
      label: 'Name',
    },
    {
      field: 'updatedAt',
      label: 'Last modified',
    },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private store$: Store<{}>) {}

  ngAfterViewInit() {
    this.hideDisabled = this.searchParams?.hideDisabled || false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchParams?.currentValue) {
      this.sortField = this.searchParams.sortField || 'name';
      this.sortDirection = this.searchParams.sortDirection || 'asc';
      this.name = this.searchParams.name || null;
      this.hideDisabled = this.searchParams.hideDisabled || false;
    }
  }

  public isChecked(column: string) {
    return this.displayedColumns.includes(column);
  }

  public toggleColumn(e: MouseEvent, column: string) {
    e.preventDefault();
    e.stopPropagation();

    if (this.isChecked(column)) {
      this.displayedColumns = this.displayedColumns.filter(c => c !== column);
      this.displayedColumns = this.possibleColumns.filter(c => this.displayedColumns.includes(c));
    } else {
      this.displayedColumns.push(column);
      this.displayedColumns = this.possibleColumns.filter(c => this.displayedColumns.includes(c));
    }

    this.store$.dispatch(new UpdateDisplayedColumnsAction({displayedColumns: this.displayedColumns}));
  }

  onSortFieldChange(field: string) {
    this.updateNouns({...this.searchParams, sortField: field || null});
  }

  onSortDirectionChange(dir: 'asc' | 'desc') {
    this.updateNouns({...this.searchParams, sortDirection: dir || null});
  }

  public onTextChange(text: string) {
    this.updateNouns({...this.searchParams, name: text || null});
  }

  updateNouns(searchParams: SearchParams) {
    this.onSearchParamsChange(searchParams);
  }

  onIncludeConcreteClick() {
    this.includeConcrete = !this.includeConcrete;
    this.includeConcreteChange.emit(this.includeConcrete);
  }

  onIncludeAbstractClick() {
    this.includeAbstract = !this.includeAbstract;
    this.includeAbstractChange.emit(this.includeAbstract);
  }

  onIncludeActionClick() {
    this.includeAction = !this.includeAction;
    this.includeActionChange.emit(this.includeAction);
  }

  onHideDisabledChange(hideDisabled: boolean) {
    this.updateNouns({...this.searchParams, hideDisabled});
  }

  public onSearchParamsChange(searchParams: SearchParams) {
    this.router.navigate([], {
      queryParams: {
        name: searchParams.name || null,
        chapters: null,
        empty: searchParams.empty || null,
        hideDisabled: searchParams.hideDisabled || null,
        sortField: searchParams.sortField || null,
        sortDirection: searchParams.sortDirection || null,
      },
      queryParamsHandling: 'merge',
      relativeTo: this.route,
    });
  }

  public trackByOptionField(index: number, option: SortOption) {
    return option.field;
  }

  public onToggleView() {
    this.toggleView.emit(!this.cardView);
  }

  public onCreateClick() {
    this.createNoun.emit({action: 'create'});
  }
}
