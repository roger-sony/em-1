import {FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {Portal, TemplatePortal} from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {convertDropdownToConnectedPositions, DropdownPosition} from './dropdown-position';

@Component({
  selector: 'oph-menu',
  templateUrl: './oph-menu.component.html',
  styleUrls: ['./oph-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OphMenuComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input()
  public origin: ElementRef | HTMLElement;

  @Input()
  public positions: DropdownPosition[] = [DropdownPosition.BottomEnd, DropdownPosition.TopEnd];

  @Input()
  public minWidth: number;

  @Input()
  public minHeight: number;

  @Output()
  public show = new EventEmitter<boolean>();

  @ViewChild('dropdown')
  public dropdown: TemplateRef<void>;

  private overlayRef: OverlayRef;
  private portal: Portal<void>;

  constructor(private overlay: Overlay, private viewContainer: ViewContainerRef) {}

  public ngAfterViewInit() {
    this.portal = new TemplatePortal(this.dropdown, this.viewContainer);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.minWidth || changes.minHeight) {
      if (this.overlayRef) {
        this.overlayRef.updateSize({minWidth: this.minWidth, minHeight: this.minHeight});
        this.overlayRef.updatePosition();
      }
    }
  }

  public ngOnDestroy() {
    this.close();
  }

  public open(offsetX?: number) {
    if (this.overlayRef) {
      return;
    }

    const overlayConfig = this.createOverlayConfig(offsetX);

    this.overlayRef = this.overlay.create(overlayConfig);
    this.overlayRef.attach(this.portal);

    this.overlayRef.backdropClick().subscribe(() => this.close());

    this.show.emit(true);
  }

  private createPositionStrategy(): FlexibleConnectedPositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPush(false)
      .withFlexibleDimensions(false)
      .withGrowAfterOpen(true)
      .withViewportMargin(8)
      .withDefaultOffsetY(4)
      .withPositions(convertDropdownToConnectedPositions(this.positions));
  }

  private createOverlayConfig(offsetX?: number): OverlayConfig {
    let positionStrategy = this.createPositionStrategy();

    if (offsetX || offsetX === 0) {
      positionStrategy = positionStrategy.withDefaultOffsetX(offsetX);
    }

    return {
      backdropClass: 'cdk-overlay-transparent-backdrop',
      disposeOnNavigation: true,
      hasBackdrop: true,
      // panelClass: ['position-absolute', 'w-max-content'],
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minWidth: this.minWidth,
      minHeight: this.minHeight,
      positionStrategy,
    };
  }

  public close() {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;

      this.show.emit(false);
    }
  }

  public trigger() {
    if (this.overlayRef) {
      this.close();
    } else {
      this.open();
    }
  }
}
