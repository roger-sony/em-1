import {moduleMetadata, storiesOf} from '@storybook/angular';
import {SearchBoxComponent} from './search-box.component';
import {SearchBoxModule} from './search-box.module';

storiesOf('Inputs/Search Box', module)
  .addDecorator(
    moduleMetadata({
      imports: [SearchBoxModule],
    })
  )
  .add('search for nouns', () => ({
    component: SearchBoxComponent,
    props: {
      placeholder: 'Search for Nouns',
    },
  }));
