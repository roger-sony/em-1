import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConditionFormComponent} from './condition-form.component';
import {NounSelectComponent} from './noun-condition-form/noun-select/noun-select.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {NounConditionFormComponent} from './noun-condition-form/noun-condition-form.component';
import {ConditionAttributeSelectComponent} from './noun-condition-form/attribute-select/condition-attribute-select.component';
import {ConditionOperatorSelectComponent} from './noun-condition-form/condition-operator-select/condition-operator-select.component';
import {ConditionValueInputComponent} from './noun-condition-form/condition-value-input/condition-value-input.component';
import {ConditionFormBackButtonComponent} from './back-button/condition-form-back-button.component';
import {ConditionFormConjunctionComponent} from './conjunction/condition-form-conjunction.component';
import {ConditionTaskInputComponent} from './task-input/condition-task-input.component';
import {ConditionFormDecisionComponent} from './shared/condition-form-decision/condition-form-decision.component';
import {ConditionFormDateSelectComponent} from './date-select/condition-form-date-select.component';

@NgModule({
  declarations: [
    ConditionFormComponent,
    NounSelectComponent,
    NounConditionFormComponent,
    ConditionAttributeSelectComponent,
    ConditionOperatorSelectComponent,
    ConditionValueInputComponent,
    ConditionFormBackButtonComponent,
    ConditionFormConjunctionComponent,
    ConditionTaskInputComponent,
    ConditionFormDecisionComponent,
    ConditionFormDateSelectComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [ConditionFormComponent],
})
export class ConditionFormModule {}
