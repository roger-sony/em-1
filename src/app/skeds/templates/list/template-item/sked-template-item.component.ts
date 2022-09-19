import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {FlexSkedTemplate} from 'src/app/core/model/flex-sked-template';

@Component({
  selector: 'sked-template-item',
  templateUrl: './sked-template-item.component.html',
  styleUrls: ['./sked-template-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplateItemComponent {
  @Input() public template: FlexSkedTemplate;
  @Input() public canEdit: boolean;

  public onMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
