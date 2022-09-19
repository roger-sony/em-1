import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MobileSelectPageModule} from './mobile-select-page.module';

storiesOf('Mobile/Select Page', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileSelectPageModule],
    })
  )
  .add('single', () => ({
    template: `
        <div style="border: 1px solid #ccc; width: 320px; height: 300px; overflow: auto">
            <mobile-select-page [options]="options" [title]="title" [selectedValues]="selectedValues" (save)="onSave($event)"></mobile-select-page>
        </div>
    `,
    props: {
      options: [
        {value: 'Does not repeat'},
        {
          displayValue: 'Every Minute',
          value: 42,
        },
        {value: 'Hourly'},
        {value: 'Daily'},
        {value: 'Weekly'},
        {value: 'Monthly'},
        {value: 'Every Year'},
        {value: 'Custom…', onClick: () => action('onClick')()},
      ],
      title: 'Repeat',
      selectedValues: ['Does not repeat'],
      onSave: item => action('onSave')(JSON.stringify(item)),
    },
  }));

storiesOf('Mobile/Select Page', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileSelectPageModule],
    })
  )
  .add('multiple', () => ({
    template: `
        <div style="border: 1px solid #ccc; width: 320px; height: 300px; overflow: auto">
            <mobile-select-page [multiple]="true" [options]="options" [title]="title" [selectedValues]="selectedValues" (save)="onSave($event)"></mobile-select-page>
        </div>
    `,
    props: {
      options: [
        {value: 0, displayValue: 'Sunday'},
        {value: 1, displayValue: 'Monday'},
        {value: 2, displayValue: 'Tuesday'},
        {value: 3, displayValue: 'Wednesday'},
        {value: 4, displayValue: 'Thursday'},
        {value: 5, displayValue: 'Friday'},
        {value: 6, displayValue: 'Saturday'},
      ],
      title: 'Repeat On',
      selectedValues: ['Does not repeat'],
      onSave: item => action('onSave')(JSON.stringify(item)),
    },
  }));
