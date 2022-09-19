import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarGroupComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  public active: boolean;

  @Input()
  public icon: string;

  @Input()
  public text: string;

  @Output()
  public expand = new EventEmitter();

  public expanded$ = new BehaviorSubject(false);

  public iconSuffix = '';
  public caretIconSuffix = '';

  private subscriptions = new Subscription();

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.active) {
      this.expanded$.next(this.active);
      this.iconSuffix = this.active ? '_active' : '';
    }
  }

  public ngOnInit() {
    this.subscriptions.add(this.subscribeToExpanded());
  }

  private subscribeToExpanded(): Subscription {
    return this.expanded$.pipe(filter(expanded => expanded)).subscribe(() => this.expand.emit());
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    if (!this.active) {
      this.iconSuffix = '_hover';
    }

    this.caretIconSuffix = '_hover';
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    if (!this.active) {
      this.iconSuffix = '';
    }

    this.caretIconSuffix = '';
  }

  public onClick() {
    this.expanded$.next(!this.expanded$.getValue());
  }

  public collapse() {
    this.expanded$.next(false);
  }
}
