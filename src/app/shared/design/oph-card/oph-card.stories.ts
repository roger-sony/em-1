import {moduleMetadata, storiesOf} from '@storybook/angular';
import {MaterialModule} from '../../material/material.module';
import {OphIconModule} from '../oph-icon/oph-icon.module';
import {OphCardModule} from './oph-card.module';

storiesOf('Cards', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphCardModule],
    })
  )
  .add('decision table', () => ({
    template: `
        <oph-card [iconName]="iconName" [title]="title" style="width: 364px">
            <div style="margin: 24px; text-align: center; font-family: 'Lato', sans-serif; font-size: 14px;">Content</div>
            <oph-card-menu-button class="oph-card-header-button"></oph-card-menu-button>
        </oph-card>
    `,
    props: {
      buttonIconName: 'ellipsis',
      iconName: 'rules',
      title: 'Amazon Replenish',
    },
  }));

storiesOf('Cards', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphCardModule],
    })
  )
  .add('selected decision table', () => ({
    template: `
        <oph-card [iconName]="iconName" [selected]="selected" [title]="title" style="width: 364px">
            <div style="margin: 24px; text-align: center; font-family: 'Lato', sans-serif; font-size: 14px;">Content</div>
            <oph-card-menu-button class="oph-card-header-button"></oph-card-menu-button>
        </oph-card>
    `,
    props: {
      iconName: 'rules',
      selected: true,
      title: `Men's Bathroom Cleaning`,
    },
  }));

storiesOf('Cards', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphCardModule, OphIconModule, MaterialModule],
    })
  )
  .add('triggers', () => ({
    template: `
        <oph-card [backgroundColor]="'rgba(0,0,0,0.02)'" [iconName]="iconName" [title]="title" style="width: 697px">
            <div style="margin: 24px; text-align: center; font-family: 'Lato', sans-serif; font-size: 14px;">
                There are no Triggers for this DTable yet
            </div>
            <button mat-button color="primary" class="oph-card-header-button">
                <oph-icon [name]="'plus'" [size]="16"></oph-icon>
                Add Trigger
            </button>
        </oph-card>
    `,
    props: {
      iconName: 'rules',
      title: 'Triggers',
    },
  }));

storiesOf('Cards', module)
  .addDecorator(
    moduleMetadata({
      imports: [OphCardModule],
    })
  )
  .add('rule noun', () => ({
    template: `
        <oph-card [iconName]="iconName" [selected]="selected" [title]="title" style="width: 343px">
            <div style="margin: 29px; text-align: center; font-family: 'Lato', sans-serif; font-size: 14px;">
                There are no conditions for this noun yet
            </div>
            <oph-card-menu-button class="oph-card-header-button"></oph-card-menu-button>
        </oph-card>
    `,
    props: {
      iconName: 'bottle',
      title: 'Whole Milk',
    },
  }));
