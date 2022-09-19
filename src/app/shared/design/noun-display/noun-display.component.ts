import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'noun-display',
  templateUrl: './noun-display.component.html',
  styleUrls: ['./noun-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NounDisplayComponent {
  @Input()
  public name: string;
}
