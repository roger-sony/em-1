import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {AddMenuOption} from './add-menu-option';
import {AddMenuDropdownComponent} from './dropdown/add-menu-dropdown.component';

@Component({
  selector: 'add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMenuComponent {
  @Input()
  public addButtonText: string;

  @Input()
  public createOptionText: string;

  @Input()
  public inputPlaceholder: string;

  @Input()
  public options: AddMenuOption[];

  @Output()
  public add = new EventEmitter<AddMenuOption>();

  @Output()
  public create = new EventEmitter();

  @ViewChild(AddMenuDropdownComponent)
  public dropdown: AddMenuDropdownComponent;

  public onToggleClick() {
    this.dropdown.trigger();
  }

  public onAdd(option: AddMenuOption) {
    this.add.emit(option);
  }

  public onCreate() {
    this.create.emit();
  }

  public close() {
    this.dropdown.close();
  }
}
