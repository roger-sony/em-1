import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MobileLayoutModule} from '../mobile-layout.module';

storiesOf('Layout/Mobile/Bottom Navigation', module)
  .addDecorator(
    moduleMetadata({
      imports: [RouterTestingModule, MobileLayoutModule, OverlayModule],
    })
  )
  .add('item active', () => ({
    template: `
        <div style="padding-top: 420px">
            <mobile-bottom-nav></mobile-bottom-nav>
        </div>
    `,
  }));
