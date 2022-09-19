import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sked-new-template-toolbar',
  templateUrl: './sked-new-template-toolbar.component.html',
  styleUrls: ['./sked-new-template-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedNewTemplateToolbarComponent {
  @Input()
  public name: string;

  @Output()
  public cancel = new EventEmitter();

  @Output()
  public save = new EventEmitter();

  public onNameChange(input: string) {
    this.name = input;
  }

  public onSaveClick() {
    this.save.emit(this.name);
  }
}
