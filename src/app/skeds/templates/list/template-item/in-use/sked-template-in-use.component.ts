import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'sked-template-in-use',
  templateUrl: './sked-template-in-use.component.html',
  styleUrls: ['./sked-template-in-use.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedTemplateInUseComponent {
  @Input()
  public status: string;
}
