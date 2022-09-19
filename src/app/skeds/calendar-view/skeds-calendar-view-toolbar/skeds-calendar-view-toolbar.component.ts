import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';

@Component({
  selector: 'skeds-calendar-view-toolbar',
  templateUrl: './skeds-calendar-view-toolbar.component.html',
  styleUrls: ['./skeds-calendar-view-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkedsCalendarViewToolbarComponent {
  @Input()
  public name: string;

  @Input()
  public status: string;

  @Input()
  public zoomIndex: number;

  @Input()
  public zoomLength: number;

  @Input()
  public calendarOptions: CalendarOptions;

  @Output()
  public navigateWeek = new EventEmitter();

  @Output()
  public zoom = new EventEmitter<number>();

  public onZoom(action: string) {
    const index = action === 'out' ? this.zoomIndex + 1 : this.zoomIndex - 1;
    this.zoom.emit(index);
  }
}
