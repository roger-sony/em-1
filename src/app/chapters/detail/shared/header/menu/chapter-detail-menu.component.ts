import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {OphMenuComponent} from '../../../../../shared/design/oph-menu/oph-menu.component';

@Component({
  selector: 'chapter-detail-menu',
  templateUrl: './chapter-detail-menu.component.html',
  styleUrls: ['./chapter-detail-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterDetailMenuComponent {
  @Output()
  public edit = new EventEmitter();

  @Output()
  public delete = new EventEmitter();

  @ViewChild(OphMenuComponent)
  public menu: OphMenuComponent;

  public onToggleClick() {
    this.menu.open();
  }

  public onEditClick() {
    this.menu.close();
    this.edit.emit();
  }

  public onDeleteClick() {
    this.menu.close();
    this.delete.emit();
  }
}
