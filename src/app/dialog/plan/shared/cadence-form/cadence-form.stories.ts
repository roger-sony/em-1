import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import * as moment from 'moment';
import {CadenceFormComponent} from './cadence-form.component';
import {CadenceFormModule} from './cadence-form.module';
import {CadenceRepetition} from './cadence-repetition';

storiesOf('Plans/Cadence Form', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, CadenceFormModule, MatDatepickerModule, MatMomentDateModule],
      providers: [{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}],
    })
  )
  .add('empty', () => ({
    component: CadenceFormComponent,
    props: {
      required: true,
      valueChange: event => action('onValueChange')(event),
    },
  }))
  .add('filled no repetition', () => ({
    component: CadenceFormComponent,
    props: {
      value: {
        startDateTime: moment(),
      },
      valueChange: event => action('onValueChange')(event),
    },
  }))
  .add('filled custom', () => ({
    component: CadenceFormComponent,
    props: {
      value: {
        startDateTime: moment(),
        repetition: CadenceRepetition.Custom,
      },
      valueChange: event => action('onValueChange')(event),
    },
  }));
