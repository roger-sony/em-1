import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MobileSelectOption} from './mobile-select-option';

@Component({
  selector: 'mobile-select-page',
  templateUrl: './mobile-select-page.component.html',
  styleUrls: ['./mobile-select-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileSelectPageComponent implements OnChanges {
  @Input()
  public multiple: boolean;

  @Input()
  public options: MobileSelectOption[];

  @Input()
  // tslint:disable-next-line:no-any
  public selectedValues: any[];

  @Input()
  public title: string;

  @Output()
  public save = new EventEmitter<MobileSelectOption[]>();

  public selectedValues$ = new BehaviorSubject([]);

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedValues && this.selectedValues) {
      this.selectedValues$.next(this.selectedValues);
    }
  }

  public onBack() {
    const selectedOptions = this.options.filter(option => this.selectedValues$.getValue().includes(option.value));
    this.save.emit(selectedOptions);
  }

  public onOptionClick(option: MobileSelectOption) {
    if (option.onClick) {
      option.onClick();
    }

    if (this.selectedValues$.getValue().includes(option.value)) {
      this.unselectOption(option);
    } else {
      this.selectOption(option);
    }
  }

  private unselectOption(option: MobileSelectOption) {
    this.selectedValues$.next(
      this.multiple ? this.selectedValues$.getValue().filter(value => value !== option.value) : []
    );
  }

  private selectOption(option: MobileSelectOption) {
    this.selectedValues$.next(this.multiple ? this.selectedValues$.getValue().concat(option.value) : [option.value]);
  }

  public trackByOptionValue(index: number, option: MobileSelectOption): string {
    return option.displayValue || option.value;
  }
}
