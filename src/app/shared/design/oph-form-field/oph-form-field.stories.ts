import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphInputModule} from '../oph-input/oph-input.module';
import {OphSelectModule} from '../oph-select/oph-select.module';
import {OphFormFieldModule} from './oph-form-field.module';

storiesOf('Inputs/Form Field', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        OphFormFieldModule,
        OphIconModule,
        OphInputModule,
        OphSelectModule,
        OverlayModule,
      ],
    })
  )
  .add('input', () => ({
    template: `<oph-form-field>
                 <input ophInput>
               </oph-form-field>`,
    props: {},
  }))
  .add('input with errors', () => ({
    template: `<oph-form-field>
                 <input ophInput id="input-with-errors" [value]="value">
                 <oph-error>{{error}}</oph-error>
               </oph-form-field>`,
    props: {
      error: 'Email address not found!',
      value: 'email@domain.com',
    },
  }))
  .add('input with start icon', () => ({
    template: `<oph-form-field>
                 <oph-icon [name]="iconName" [size]="iconSize"></oph-icon>
                 <input ophInput id="input-with-label">
               </oph-form-field>`,
    props: {
      iconName: 'edit',
      iconSize: 24,
    },
  }))
  .add('input with end icon', () => ({
    template: `<oph-form-field>
                 <input ophInput id="input-with-label">
                 <oph-icon [name]="iconName" [size]="iconSize"></oph-icon>
               </oph-form-field>`,
    props: {
      iconName: 'edit',
      iconSize: 24,
    },
  }))
  .add('input with label', () => ({
    template: `<oph-form-field>
                 <oph-label>{{labelText}}</oph-label>
                 <input ophInput id="input-with-label">
               </oph-form-field>`,
    props: {
      labelText: 'Field Label',
    },
  }))
  .add('select', () => ({
    template: `<oph-form-field>
                 <oph-select id="select" [value]="1">
                   <oph-option [value]="1">One</oph-option>
                   <oph-option [value]="2">Two</oph-option>
                   <oph-option [value]="3">Three</oph-option>
                 </oph-select>
               </oph-form-field>`,
    props: {},
  }))
  .add('select with label', () => ({
    template: `<oph-form-field>
                 <oph-label>{{labelText}}</oph-label>
                 <oph-select id="select" [placeholder]="placeholder">
                   <oph-option [value]="1">One</oph-option>
                   <oph-option [value]="2">Two</oph-option>
                   <oph-option [value]="3">Three</oph-option>
                 </oph-select>
               </oph-form-field>`,
    props: {
      labelText: 'Field Label',
      placeholder: 'Choose...',
    },
  }));
