import {map, startWith, switchMap, mergeAll} from 'rxjs/operators';
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
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {convertDropdownToConnectedPositions} from 'src/app/shared/design/oph-menu/dropdown-position';
import {DropdownPosition} from './../../../../../../shared/design/oph-menu/dropdown-position';
import {NewAdjectiveSelectOptionComponent} from './option/new-adjective-select-option.component';

@Component({
  selector: 'new-adjective-select',
  templateUrl: './new-adjective-select.component.html',
  styleUrls: ['./new-adjective-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAdjectiveSelectComponent implements AfterViewInit, OnChanges, OnDestroy, AfterContentInit {
  @Input()
  public types: string[];

  @Input()
  public value: string;

  @Input()
  public hidePlaceholderIcon: boolean;

  @Input()
  public width: number;

  @ViewChild('adjDropdown')
  // tslint:disable-next-line:no-any
  public adjDropdown: TemplateRef<any>;

  @ViewChild('trigger')
  public trigger: ElementRef<HTMLDivElement>;

  @Output()
  public valueChange = new EventEmitter<string>();

  @ContentChildren(NewAdjectiveSelectOptionComponent)
  public options: QueryList<NewAdjectiveSelectOptionComponent>;

  private options$: Observable<NewAdjectiveSelectOptionComponent[]>;

  public selectedName$ = new BehaviorSubject<string>('');
  public orangeBorder$ = new BehaviorSubject<boolean>(false);

  private overlayRef: OverlayRef;
  // tslint:disable-next-line:no-any
  private portal: Portal<any>;

  private subscriptions = new Subscription();

  private readonly positions: DropdownPosition[] = [DropdownPosition.BottomStart, DropdownPosition.TopStart];

  constructor(private overlay: Overlay, private viewContainer: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && this.value) {
      this.selectedName$.next(this.value);
    }
  }

  ngAfterViewInit() {
    this.portal = new TemplatePortal(this.adjDropdown, this.viewContainer);
  }

  ngAfterContentInit() {
    this.options$ = this.observeOptions();
    this.subscriptions.add(this.subscribeToOptions());
    this.subscriptions.add(this.subscribeToOptionClick());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private subscribeToOptions(): Subscription {
    return this.options$.subscribe(options => {});
  }

  private subscribeToOptionClick(): Subscription {
    return this.options$
      .pipe(
        switchMap(options => options.map(option => option.clicked$)),
        mergeAll()
      )
      .subscribe((type: string) => {
        this.valueChange.emit(type);
        this.selectedName$.next(type);
        this.close();
      });
  }

  private observeOptions(): Observable<NewAdjectiveSelectOptionComponent[]> {
    return this.options.changes.pipe(
      map(() => this.options.toArray()),
      startWith(this.options.toArray())
    );
  }

  public onTriggerClick() {
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

    this.orangeBorder$.next(true);
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
      this.orangeBorder$.next(false);
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  public onOptionClick() {
    this.close();
  }
}
