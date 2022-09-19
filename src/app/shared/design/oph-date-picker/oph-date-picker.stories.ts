import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import * as moment from 'moment';
import {DATE_PICKER_FORMATS} from '../../../core/core.module';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphDatePickerModule} from './oph-date-picker.module';

storiesOf('Inputs/Date Picker', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, OphIconModule, OphDatePickerModule, MatMomentDateModule],
      providers: [{provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMATS}],
    })
  )
  .add('with value', () => ({
    template: `<oph-date-picker [value]="value" (valueChange)="onValueChange($event)"></oph-date-picker>`,
    props: {
      value: moment(),
      onValueChange: event => action('onValueChange')(event),
    },
  }))
  .add('with default placeholder', () => ({
    template: `<oph-date-picker [value]="value" (valueChange)="onValueChange($event)"></oph-date-picker>`,
    props: {
      value: null,
      onValueChange: event => action('onValueChange')(event),
    },
  }))
  .add('with custom placeholder', () => ({
    template: `<oph-date-picker [placeholder]="placeholder" [value]="value" (valueChange)="onValueChange($event)"></oph-date-picker>`,
    props: {
      placeholder: 'Choose...',
      value: null,
      onValueChange: event => action('onValueChange')(event),
    },
  }));
