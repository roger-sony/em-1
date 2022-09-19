import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MobileSearchPageModule} from './mobile-search-page.module';

storiesOf('Mobile/Search Page', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileSearchPageModule],
    })
  )
  .add('Select Noun', () => ({
    template: `
        <div style="border: 1px solid #ccc; width: 320px; height: 300px; overflow: auto">
            <mobile-search-page [items]="items" [placeholder]="placeholder" (save)="onSave($event)" (cancel)="onCancel($event)"></mobile-search-page>
        </div>
    `,
    props: {
      items: [
        {value: 'Barrington Coffee Order Placed'},
        {
          displayValue: 'Coffee-Decaf Gold',
          value: 42,
        },
        {value: 'Coffee-Gold'},
        {value: 'Coffee-Colombian Supremo Medium'},
        {value: 'Coffee-Dark Roast-Starbucks'},
        {value: 'Coffee Mugs'},
      ],
      placeholder: 'Select Noun',
      onSave: item => action('onSave')(JSON.stringify(item)),
      onCancel: () => action('onCancel')(),
    },
  }));
