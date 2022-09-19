import {HttpClientModule} from '@angular/common/http';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {TaskFormModule} from './task-form.module';

storiesOf('Forms/Task', module)
  .addDecorator(
    moduleMetadata({
      imports: [BrowserAnimationsModule, HttpClientModule, TaskFormModule, MatDatepickerModule, MatMomentDateModule],
      providers: [{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}],
    })
  )
  .add('desktop', () => ({
    template: `<div style="width: 528px; padding: 16px"><task-form></task-form></div>`,
  }))
  .add('mobile', () => ({
    template: `<div style="width: 320px; padding: 16px"><task-form></task-form></div>`,
  }));
