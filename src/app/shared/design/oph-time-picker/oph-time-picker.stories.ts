import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import * as moment from 'moment';
import {OphTimePickerModule} from './oph-time-picker.module';

storiesOf('Inputs/Time Picker', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphTimePickerModule],
    })
  )
  .add('with value', () => ({
    template: `<oph-time-picker [value]="value" (valueChange)="onValueChange($event)"></oph-time-picker>`,
    props: {
      value: moment(),
      onValueChange: event => action('onValueChange')(event),
    },
  }))
  .add('with default placeholder', () => ({
    template: `<oph-time-picker [value]="value" (valueChange)="onValueChange($event)"></oph-time-picker>`,
    props: {
      value: null,
      onValueChange: event => action('onValueChange')(event),
    },
  }))
  .add('with custom placeholder', () => ({
    template: `<oph-time-picker [placeholder]="placeholder" [value]="value" (valueChange)="onValueChange($event)"></oph-time-picker>`,
    props: {
      placeholder: 'Choose...',
      value: null,
      onValueChange: event => action('onValueChange')(event),
    },
  }));
