import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {SkedDayNamePipe} from './sked-day-name.pipe';
import {SkedTimeNamePipe} from './sked-time-name.pipe';
import {RuleFormComponent} from './rule-form.component';
import {RuleFormButtonComponent} from './button/rule-form-button.component';
import {RuleAttributeSelectComponent} from './attribute-select/rule-attribute-select.component';
import {RuleOperatorSelectComponent} from './operator-select/rule-operator-select.component';
import {RuleValueInputComponent} from './value-input/rule-value-input.component';
import {RuleConjunctionSelectComponent} from './conjunction-select/rule-conjunction-select.component';
import {RuleTaskInputComponent} from './task-input/rule-task-input.component';
import {RuleSkedDaySelectComponent} from './sked-day-select/rule-sked-day-select.component';
import {RuleSkedTimeSelectComponent} from './sked-time-select/rule-sked-time-select.component';

@NgModule({
  imports: [SharedModule],
  declarations: [
    RuleFormComponent,
    SkedDayNamePipe,
    SkedTimeNamePipe,
    RuleFormButtonComponent,
    RuleAttributeSelectComponent,
    RuleOperatorSelectComponent,
    RuleValueInputComponent,
    RuleConjunctionSelectComponent,
    RuleTaskInputComponent,
    RuleSkedDaySelectComponent,
    RuleSkedTimeSelectComponent,
  ],
  exports: [SharedModule, RuleFormComponent],
})
export class RuleFormModule {}
