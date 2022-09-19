import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {SkedDialogService} from 'src/app/dialog/sked-dialog.service';

@Component({
  selector: 'sked-templates-empty',
  templateUrl: './sked-templates-empty.component.html',
  styleUrls: ['./sked-templates-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplatesEmptyComponent {
  @Input() canEdit: boolean;

  constructor(private skedDialogService: SkedDialogService) {}

  public createNewTemplate() {
    this.skedDialogService.openNewSkedTemplateDialog();
  }
}
