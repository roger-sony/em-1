import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MobileTimePickerModule} from './mobile-time-picker.module';

storiesOf('Mobile/Time Picker', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileTimePickerModule],
    })
  )
  .add('not selected', () => ({
    template: `
        <mobile-time-picker (valueChange)="onValueChange($event)" style="width: 128px; height: 220px"></mobile-time-picker>
    `,
    props: {
      onValueChange: e => {
        action('onValueChange')(e);
      },
    },
  }));
