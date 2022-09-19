import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MobileListPickerModule} from './mobile-list-picker.module';

const items = [
  {value: 'Does Not Repeat'},
  {value: 'Every Minute'},
  {value: 'Hourly'},
  {value: 'Daily'},
  {value: 'Weekly'},
  {value: 'Monthly'},
  {value: 'Every Year'},
];

storiesOf('Mobile/List Picker', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileListPickerModule],
    })
  )
  .add('not selected', () => ({
    template: `
        <mobile-list-picker [items]="items" style="width: 218px; height: 216px"></mobile-list-picker>
    `,
    props: {
      items,
    },
  }));

storiesOf('Pickers/List Picker', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileListPickerModule],
    })
  )
  .add('first selected', () => ({
    template: `
        <mobile-list-picker [items]="items" [value]="'Does Not Repeat'" style="width: 218px; height: 216px"></mobile-list-picker>
    `,
    props: {
      items,
    },
  }));

storiesOf('Pickers/List Picker', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileListPickerModule],
    })
  )
  .add('middle selected', () => ({
    template: `
        <mobile-list-picker [items]="items" [value]="'Daily'" style="width: 218px; height: 216px"></mobile-list-picker>
    `,
    props: {
      items,
    },
  }));

storiesOf('Pickers/List Picker', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileListPickerModule],
    })
  )
  .add('last selected', () => ({
    template: `
        <mobile-list-picker [items]="items" [value]="'Every Year'" style="width: 218px; height: 216px"></mobile-list-picker>
    `,
    props: {
      items,
    },
  }));
