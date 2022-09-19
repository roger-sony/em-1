import {storiesOf} from '@storybook/angular';
import {OphIconSize} from './oph-icon-size';
import {OphIconComponent} from './oph-icon.component';

storiesOf('Icons', module).add('small', () => ({
  component: OphIconComponent,
  props: {
    name: 'integration',
    size: OphIconSize.Small,
  },
}));

storiesOf('Icons', module).add('medium', () => ({
  component: OphIconComponent,
  props: {
    name: 'search',
    size: OphIconSize.Medium,
  },
}));

storiesOf('Icons', module).add('large', () => ({
  component: OphIconComponent,
  props: {
    name: 'delete',
    size: OphIconSize.Large,
  },
}));

storiesOf('Icons', module).add('extra large', () => ({
  component: OphIconComponent,
  props: {
    name: 'edit',
    size: OphIconSize.ExtraLarge,
  },
}));
