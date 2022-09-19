import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {OphMenuComponent} from './../../../../../shared/design/oph-menu/oph-menu.component';

@Component({
  selector: 'adjective-menu',
  templateUrl: './adjective-menu.component.html',
  styleUrls: ['./adjective-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjectiveMenuComponent {
  @Input()
  public disabled: boolean;

  @Output()
  public menuAction = new EventEmitter<string>();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild('menuButton')
  public menuButtonElement: ElementRef<HTMLButtonElement>;

  public onMenuClick() {
    this.menu.open();
  }

  public onMenuAction(type: string) {
    this.menuAction.emit(type);
    this.menu.close();
  }
}
