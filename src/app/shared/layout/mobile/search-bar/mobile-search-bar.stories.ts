import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MobileLayoutModule} from '../mobile-layout.module';

storiesOf('Layout/Mobile', module)
  .addDecorator(
    moduleMetadata({
      imports: [RouterTestingModule, MobileLayoutModule, OverlayModule],
    })
  )
  .add('search bar', () => ({
    template: `
      <div style="background-color: #f9fafb; padding: 16px">
        <mobile-search-bar></mobile-search-bar>
      </div>
    `,
  }));
