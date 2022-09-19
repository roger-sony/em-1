import {MatButtonModule} from '@angular/material/button';
import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MobileHeaderModule} from './mobile-header.module';

storiesOf('Mobile/Header', module)
  .addDecorator(
    moduleMetadata({
      imports: [MobileHeaderModule, MatButtonModule],
    })
  )
  .add('New Plan', () => ({
    template: `
        <div style="background-color: #f9fafb; border: 1px solid #ccc; width: 375px; height: 300px; overflow: auto">
            <div style="height: 1200px">
                <mobile-header (back)="onBack()">
                    New Plan
                    <button mat-flat-button color="primary" class="header-buttons">Save</button>
                </mobile-header>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    `,
    props: {
      onBack: () => action('onBack')(),
    },
  }));
