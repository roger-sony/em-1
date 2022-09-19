import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, Subscription} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {ListPickerConfig} from './list-picker-config';
import {ListPickerItem} from './list-picker-item';

/* tslint:disable:no-any */
@Component({
  selector: 'mobile-list-picker',
  templateUrl: './mobile-list-picker.component.html',
  styleUrls: ['./mobile-list-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MobileListPickerComponent),
    },
  ],
})
export class MobileListPickerComponent implements OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input()
  public config: ListPickerConfig;

  @Input()
  public items: ListPickerItem<any>[];

  @Input()
  public value: any;

  @Output()
  public valueChange = new EventEmitter<any>();

  @ViewChildren('listPickerItem')
  public itemElements: QueryList<ElementRef<HTMLDivElement>>;

  public contentMargin$ = new BehaviorSubject(0);
  public value$ = new BehaviorSubject<any>(null);

  private subscriptions = new Subscription();

  constructor(private element: ElementRef<HTMLElement>) {}

  private subscribeToSelectedIndex(): Subscription {
    return this.value$
      .pipe(
        map(value => (this.items || []).findIndex(item => item.value === value)),
        distinctUntilChanged()
      )
      .subscribe(selectedIndex => {
        if (selectedIndex || selectedIndex === 0) {
          const element = this.itemElements.toArray()[selectedIndex];
          if (element) {
            element.nativeElement.scrollIntoView({block: 'center'});
          }
        }
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.items) {
      this.value$.next(this.value);
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.contentMargin$.next(this.element.nativeElement.clientHeight / 2 - 60));

    this.element.nativeElement.scroll({top: 60});
    setTimeout(() => this.subscriptions.add(this.subscribeToSelectedIndex()));
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onItemClick(value: any) {
    this.value$.next(value);
    this.updateControlValue(value);
    this.updateControlTouched();
    this.valueChange.emit(value);
  }

  private updateControlValue: (value: any) => void = () => {};

  public registerOnChange(onChange: any): void {
    this.updateControlValue = onChange;
  }

  private updateControlTouched: () => void = () => {};

  public registerOnTouched(onTouched: any): void {
    this.updateControlTouched = onTouched;
  }

  public setDisabledState(disabled: boolean): void {}

  public writeValue(value: any): void {
    this.value$.next(value);
  }

  public trackByItemValue(item: ListPickerItem<any>) {
    return item.value;
  }
}
