import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  @Input()
  public buttonText: string;

  @Input()
  public orangeColor: boolean;
}
