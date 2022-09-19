import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  SimpleChanges,
  ElementRef,
  OnChanges,
} from '@angular/core';
import {AddMenuOption} from '../add-menu-option';
import {OphMenuComponent} from '../../../design/oph-menu/oph-menu.component';
import {OphInputDirective} from '../../../design/oph-input/oph-input.directive';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'add-menu-dropdown',
  templateUrl: './add-menu-dropdown.component.html',
  styleUrls: ['./add-menu-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMenuDropdownComponent implements OnInit, OnChanges {
  @Input()
  public createOptionText: string;

  @Input()
  public inputPlaceholder: string;

  @Input()
  public options: AddMenuOption[];

  @Input()
  public origin: ElementRef | HTMLElement;

  @Output()
  public add = new EventEmitter<AddMenuOption>();

  @Output()
  public create = new EventEmitter();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild(OphInputDirective)
  public input: OphInputDirective;

  public search$ = new BehaviorSubject('');
  private options$ = new BehaviorSubject<AddMenuOption[]>([]);

  public filteredOptions$: Observable<AddMenuOption[]>;

  public ngOnInit(): void {
    this.filteredOptions$ = combineLatest([this.options$, this.search$]).pipe(
      map(([options, search]) => {
        const pureSearch = String(search || '')
          .trim()
          .toLowerCase();
        return options?.filter(
          option =>
            !pureSearch ||
            String(option.displayValue || option.value || '')
              .toLowerCase()
              .includes(pureSearch)
        );
      })
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.options && this.options) {
      this.options$.next(this.options);
    }
  }

  public onMenuShow(shown: boolean) {
    if (shown) {
      this.input.element.nativeElement.focus();
    } else {
      this.search$.next('');
    }
  }

  public onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search$.next(input.value);
  }

  public onAddClick(option: AddMenuOption) {
    this.add.emit(option);
    this.menu.close();
  }

  public onCreateClick() {
    this.create.emit();
    this.menu.close();
  }

  public trigger() {
    this.menu.trigger();
  }

  public close() {
    this.menu.close();
  }

  public trackByOptionValue(index: number, option: AddMenuOption): string {
    return option.value;
  }
}
