import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {action} from '@storybook/addon-actions';
import {moduleMetadata, storiesOf} from '@storybook/angular';
import {SharedModule} from '../../../shared/shared.module';
import {RuleFormModule} from './rule-form.module';
import {
  ruleFormDecisionTableFacts,
  ruleFormDecisionTableRule,
  ruleFormFieldValues,
  ruleFormTasks,
} from './rule-form.stories.data';

storiesOf('Plans/Rule Form', module)
  .addDecorator(
    moduleMetadata({
      imports: [RuleFormModule, BrowserAnimationsModule, SharedModule],
    })
  )
  .add('new global rule', () => ({
    template: `
        <rule-form [fieldValues]="fieldValues" [global]="true" [tasks]="tasks" (cancel)="onCancel()" (save)="onSave($event)"></rule-form>
    `,
    props: {
      fieldValues: ruleFormFieldValues,
      tasks: ruleFormTasks,
      onCancel: () => action('onCancel')(),
      onSave: e => action('onSave')(e),
    },
  }))
  .add('existing global rule', () => ({
    template: `
        <rule-form [facts]="facts" [fieldValues]="fieldValues" [global]="true" [tasks]="tasks" (cancel)="onCancel()" (save)="onSave($event)"></rule-form>
    `,
    props: {
      facts: ruleFormDecisionTableFacts,
      fieldValues: ruleFormFieldValues,
      tasks: ruleFormTasks,
      onCancel: () => action('onCancel')(),
      onSave: e => action('onSave')(e),
    },
  }))
  .add('new noun rule', () => ({
    template: `
        <rule-form [fieldValues]="fieldValues" [tasks]="tasks" (cancel)="onCancel()" (save)="onSave($event)"></rule-form>
    `,
    props: {
      fieldValues: ruleFormFieldValues,
      tasks: ruleFormTasks,
      onCancel: () => action('onCancel')(),
      onSave: e => action('onSave')(e),
    },
  }))
  .add('existing noun rule', () => ({
    template: `
        <rule-form [fieldValues]="fieldValues" [rule]="rule" [tasks]="tasks" (cancel)="onCancel()" (save)="onSave($event)"></rule-form>
    `,
    props: {
      rule: ruleFormDecisionTableRule,
      fieldValues: ruleFormFieldValues,
      tasks: ruleFormTasks,
      onCancel: () => action('onCancel')(),
      onSave: e => action('onSave')(e),
    },
  }));
