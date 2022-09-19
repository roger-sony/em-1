import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Moment} from 'moment';

@Component({
  selector: 'date-item',
  templateUrl: './date-item.component.html',
  styleUrls: ['./date-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateItemComponent {
  @Input()
  public text: string;

  @Input()
  public date: Moment;
}
