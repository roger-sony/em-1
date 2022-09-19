import {OverlayModule} from '@angular/cdk/overlay';
import {RouterTestingModule} from '@angular/router/testing';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {DesktopLayoutModule} from '../desktop-layout.module';

storiesOf('Layout/Desktop/Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [RouterTestingModule, DesktopLayoutModule, OverlayModule],
    })
  )
  .add('active item', () => ({
    template: `<desktop-sidebar [routerUrl]="'/nouns'"></desktop-sidebar>`,
  }));

storiesOf('Layout/Desktop/Sidebar', module)
  .addDecorator(
    moduleMetadata({
      imports: [RouterTestingModule, DesktopLayoutModule, OverlayModule],
    })
  )
  .add('active group', () => ({
    template: `<desktop-sidebar [routerUrl]="'/decision-table-reports'"></desktop-sidebar>`,
  }));
