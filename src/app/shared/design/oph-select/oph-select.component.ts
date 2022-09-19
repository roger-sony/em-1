import {FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {Portal, TemplatePortal} from '@angular/cdk/portal';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subscription, timer} from 'rxjs';
import {distinctUntilChanged, map, mergeAll, startWith, switchMap} from 'rxjs/operators';
import {convertDropdownToConnectedPositions, DropdownPosition} from '../oph-menu/dropdown-position';
import {OphOptionComponent} from './oph-option/oph-option.component';

/* tslint:disable:no-any */
@Component({
  selector: 'oph-select',
  templateUrl: './oph-select.component.html',
  styleUrls: ['./oph-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => OphSelectComponent),
    },
  ],
})
export class OphSelectComponent implements OnChanges, AfterViewInit, AfterContentInit, OnDestroy, ControlValueAccessor {
  @Input()
  public disabled: boolean;

  @Input()
  public multiple: boolean;

  @Input()
  public placeholder: string;

  @Input()
  public value: any;

  @Input()
  public minWidth: string;

  @Input()
  public staticDisplay: string;

  @Input()
  public chip: boolean;

  @Input()
  public hideBorder: boolean;

  @Input()
  public hideIcons: boolean;

  @Input()
  public darkBackground: boolean;

  @Output()
  public valueChange = new EventEmitter<any>();

  @ContentChildren(OphOptionComponent)
  public options: QueryList<OphOptionComponent>;

  @ViewChild('dropdown')
  public dropdown: TemplateRef<any>;

  @ViewChild('trigger')
  public trigger: ElementRef<HTMLDivElement>;

  @HostBinding('class.oph-select')
  public rootClass = true;

  private options$: Observable<OphOptionComponent[]>;
  private selectedOptions$: Observable<OphOptionComponent[]>;
  public displayValue$: Observable<string>;
  private value$ = new BehaviorSubject<any>(null);

  private readonly positions: DropdownPosition[] = [DropdownPosition.BottomStart, DropdownPosition.TopStart];

  private overlayRef: OverlayRef;
  private portal: Portal<any>;

  private subscriptions = new Subscription();

  constructor(private overlay: Overlay, private viewContainer: ViewContainerRef) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.value$.next(this.value);
    }
  }

  public ngAfterViewInit() {
    this.portal = new TemplatePortal(this.dropdown, this.viewContainer);
    this.subscriptions.add(this.subscribeToOptionChanges());
  }

  public ngAfterContentInit() {
    this.options$ = this.observeOptions();
    this.selectedOptions$ = this.observeSelectedOptions();
    this.displayValue$ = this.observeDisplayValue();
    this.subscriptions.add(this.subscribeToOptionClick());
    this.subscriptions.add(this.subscribeToValue());
  }

  private observeOptions(): Observable<OphOptionComponent[]> {
    return this.options.changes.pipe(
      map(() => this.options.toArray()),
      startWith(this.options.toArray())
    );
  }

  private observeSelectedOptions(): Observable<OphOptionComponent[]> {
    return combineLatest([this.options$, this.value$]).pipe(
      map(([options, value]) =>
        options.filter(option => {
          if (this.multiple) {
            return (value || []).includes(option.value);
          } else {
            return option.value === value;
          }
        })
      )
    );
  }

  private observeDisplayValue(): Observable<string> {
    return timer(100).pipe(
      switchMap(() => this.selectedOptions$),
      map(options => this.staticDisplay || options.map(option => option.content.nativeElement.innerHTML).join(', '))
    );
  }

  private subscribeToOptionChanges(): Subscription {
    return this.options$.subscribe(options => {
      if (this.multiple) {
        options?.forEach(option => {
          option.multiple = true;
          option.changeDetector.markForCheck();
        });
      }
    });
  }

  private subscribeToOptionClick(): Subscription {
    return this.options$
      .pipe(
        switchMap(options => options.map(option => option.clicked$)),
        mergeAll()
      )
      .subscribe(value => {
        if (this.multiple) {
          const values: any[] = this.value$.getValue() || [];
          if (values.includes(value)) {
            this.updateValue(values.filter(v => v !== value));
          } else {
            this.updateValue(values.concat(value));
          }
        } else {
          this.close();
          this.updateValue(value);
        }
      });
  }

  private subscribeToValue(): Subscription {
    return this.options$.pipe(switchMap(() => this.value$.pipe(distinctUntilChanged()))).subscribe(value => {
      this.options?.forEach(option => {
        if (this.multiple) {
          option.selected = (value || []).includes(option.value);
        } else {
          option.selected = option.value === value;
        }
      });
    });
  }

  private updateValue(value: any) {
    if (value === this.value$.getValue()) {
      return;
    }
    this.value$.next(value);
    this.updateControlValue(value);
    this.valueChange.emit(value);
  }

  public ngOnDestroy() {
    this.close();
    this.subscriptions.unsubscribe();
  }

  public onTriggerClick() {
    if (this.disabled) {
      return;
    }

    if (this.overlayRef) {
      this.close();
    } else {
      this.open();
    }
  }

  public open() {
    if (this.overlayRef) {
      return;
    }

    const overlayConfig = this.createOverlayConfig();

    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.attach(this.portal);

    this.overlayRef.backdropClick().subscribe(() => this.close());
  }

  private createPositionStrategy(): FlexibleConnectedPositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.trigger)
      .withPush(false)
      .withFlexibleDimensions(false)
      .withGrowAfterOpen(true)
      .withViewportMargin(8)
      .withPositions(convertDropdownToConnectedPositions(this.positions))
      .withDefaultOffsetY(4);
  }

  private createOverlayConfig(): OverlayConfig {
    return {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      disposeOnNavigation: true,
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.trigger.nativeElement.clientWidth,
      positionStrategy: this.createPositionStrategy(),
    };
  }

  public close() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private updateControlValue: (value: any) => void = () => {};

  public registerOnChange(onChange: () => void): void {
    this.updateControlValue = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {}

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  public writeValue(value: any): void {
    this.value$.next(value);
  }
}
