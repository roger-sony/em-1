import {moduleMetadata, storiesOf} from '@storybook/angular';
import {OphInputModule} from './oph-input.module';

storiesOf('Inputs/Input', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphInputModule],
    })
  )
  .add('placeholder', () => ({
    template: `<input ophInput placeholder="Type something...">`,
  }));

storiesOf('Input', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphInputModule],
    })
  )
  .add('content', () => ({
    template: `<input ophInput value="Content">`,
  }));

storiesOf('Input', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphInputModule],
    })
  )
  .add('disabled', () => ({
    template: `<input ophInput disabled value="Content">`,
  }));
