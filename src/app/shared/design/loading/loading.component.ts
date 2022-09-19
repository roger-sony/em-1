import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'loading-screen',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  @Input()
  public message: string;
}
