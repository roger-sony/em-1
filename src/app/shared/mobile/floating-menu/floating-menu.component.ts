import {ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'floating-menu',
  templateUrl: './floating-menu.component.html',
  styleUrls: ['./floating-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingMenuComponent {
  @Input()
  public iconName: string;

  @ViewChild('expandedMenu')
  public expandedMenu: ElementRef<HTMLDivElement>;

  public open$ = new BehaviorSubject(false);

  public onExpandedMenuClick(event: MouseEvent) {
    if (event.target === this.expandedMenu.nativeElement) {
      this.open$.next(false);
    }
  }

  public onDefaultButtonClick() {
    this.open$.next(true);
  }
}
