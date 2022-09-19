import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'time-item',
  templateUrl: './time-item.component.html',
  styleUrls: ['./time-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeItemComponent {
  @Input()
  public time: Moment;
}
