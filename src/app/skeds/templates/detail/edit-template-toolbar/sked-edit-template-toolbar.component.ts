import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';
import {Router} from '@angular/router';
import {FlexSkedTemplate} from 'src/app/core/model/flex-sked-template';

@Component({
  selector: 'sked-edit-template-toolbar',
  templateUrl: './sked-edit-template-toolbar.component.html',
  styleUrls: ['./sked-edit-template-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedEditTemplateToolbarComponent {
  @Output() public use = new EventEmitter();

  @Input() public template: FlexSkedTemplate;
  @Input() public canEdit: boolean;

  constructor(private router: Router) {}

  public onEditClick() {
    this.router.navigate([], {queryParams: {editing: true}});
  }

  public onBackClick() {
    this.router.navigate(['chapters']);
  }
}
