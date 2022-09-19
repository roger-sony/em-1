import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {DesktopLayoutModule} from '../desktop-layout.module';
import {DesktopTopBarComponent} from './desktop-top-bar.component';

storiesOf('Layout/Desktop', module)
  .addDecorator(
    moduleMetadata({
      imports: [RouterTestingModule, DesktopLayoutModule, OverlayModule],
    })
  )
  .add('top bar', () => ({
    component: DesktopTopBarComponent,
  }));
