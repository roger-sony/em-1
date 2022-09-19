import {addParameters} from '@storybook/angular';

addParameters({
  paddings: [
    {name: 'Small', value: '16px', default: true},
    {name: 'Medium', value: '32px'},
    {name: 'Large', value: '64px'},
  ],
});
