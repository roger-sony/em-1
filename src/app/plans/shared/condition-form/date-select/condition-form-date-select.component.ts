import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import {ConditionForm} from 'src/app/core/model/condition-form';
import {createTimePickerOptions} from 'src/app/shared/design/oph-time-picker/create-time-picker-options';

@Component({
  selector: 'condition-form-date-select',
  templateUrl: './condition-form-date-select.component.html',
  styleUrls: ['./condition-form-date-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionFormDateSelectComponent implements OnInit, OnChanges {
  @Input()
  public value: ConditionForm;

  @Output()
  public valueChange = new EventEmitter<{}>();

  public daySelect = new FormControl();
  public timeSelect = new FormControl();

  public readonly daysOfWeek: string[] = moment.weekdays();
  public times: string[];

  constructor() {}

  ngOnInit(): void {
    this.times = createTimePickerOptions();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value && this.value) {
      this.daySelect.setValue(this.value.day);
      this.timeSelect.setValue(this.value.time);
    }
  }

  public onSelectionChange(day: string, time: string) {
    if (time) {
    }
    this.valueChange.emit({
      day: this.daySelect.value,
      time: time,
    });
  }
}
