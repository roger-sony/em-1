import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {OphMenuComponent} from '../../../../../../../../shared/design/oph-menu/oph-menu.component';

@Component({
  selector: 'plan-noun-condition-menu',
  templateUrl: './plan-noun-condition-menu.component.html',
  styleUrls: ['./plan-noun-condition-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanNounConditionMenuComponent {
  @Output()
  public edit = new EventEmitter();

  @Output()
  public delete = new EventEmitter();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  @ViewChild('menuButton')
  public menuButtonElement: ElementRef<HTMLButtonElement>;

  public onMenuClick() {
    this.menu.open();
  }

  public onEditClick() {
    this.edit.emit();
  }

  public onDeleteClick() {
    this.delete.emit();
  }
}
