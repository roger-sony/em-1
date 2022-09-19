import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphSelectModule} from './oph-select.module';

storiesOf('Inputs/Select', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, OphIconModule, OphSelectModule, OverlayModule],
    })
  )
  .add('select', () => ({
    template: `<oph-select [value]="value" (valueChange)="onValueChange($event)">
                 <oph-option [value]="1">One</oph-option>
                 <oph-option [value]="2">Two</oph-option>
                 <oph-option [value]="3">Three</oph-option>
               </oph-select>`,
    props: {
      value: 1,
      onValueChange: event => action('onValueChange')(event),
    },
  }))
  .add('select with placeholder', () => ({
    template: `<oph-select placeholder="Choose..." (valueChange)="onValueChange($event)">
                 <oph-option [value]="1">One</oph-option>
                 <oph-option [value]="2">Two</oph-option>
                 <oph-option [value]="3">Three</oph-option>
               </oph-select>`,
    props: {
      onValueChange: event => action('onValueChange')(event),
    },
  }));
