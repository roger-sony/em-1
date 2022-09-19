import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ArrayIncludesPipe} from './array-includes.pipe';
import {BackgroundClassesPipe} from './background-classes.pipe';
import {DayOfWeekInMonthPipe} from './date/day-of-week-in-month.pipe';
import {MomentPipe} from './date/moment.pipe';
import {DisplayFormatPipe} from './display-format.pipe';
import {ChildFormControlPipe} from './form/child-form-control.pipe';
import {ChildFormGroupPipe} from './form/child-form-group.pipe';
import {FormArrayControlPipe} from './form/form-array-control.pipe';
import {InventoryFieldNamePipe} from './inventory/inventory-field-name.pipe';
import {InventoryFieldOperatorNamePipe} from './inventory/inventory-field-operator-name.pipe';
import {InventoryFieldOperatorsPipe} from './inventory/inventory-field-operators.pipe';
import {InventoryFieldValuePipe} from './inventory/inventory-field-value.pipe';
import {LogPipe} from './log.pipe';
import {OrdinalPipe} from './number/ordinal.pipe';
import {PlanPipesModule} from './plan/plan-pipes.module';
import {RangeMeasurementValuePipe} from './range-measurement-value.pipe';
import {ReplacePipe} from './replace.pipe';
import {StringifyPipe} from './stringify.pipe';
import {TimeFormatPipe, WeekdayFormatPipe} from './time.pipe';
import {UnCamelCasePipe} from './uncamelcase.pipe';
import {WithLoadingPipe} from './with-loading.pipe';
import {SkedTemplateNamePipe} from './sked/sked-template-name.pipe';
import {TimeAgoPipe} from './date/time-ago.pipe';
import {SplitPipe} from './split.pipe';
import {HexToRgbaPipe} from './color/hexToRgba.pipe';
import {SkedNamePipe} from './sked/sked-name.pipe';
import {SkedLinkPipe} from './sked/sked-link.pipe';
import {UserAvatarPipe} from './user-avatar.pipe';
import {IconNamePipe} from './icon-name.pipe';
import {InventoryPreviewDisplayPipe} from './inventory/inventory-preview-display.pipe';
import {SkedMidnightTimePipe} from './sked/sked-midnight-time.pipe';
import {ColumnNamePipe} from './tasks/column-name.pipe';
import {TaskCadenceStartPipe} from './task/task-cadence-start.pipe';
import {TaskCadenceEndPipe} from './task/task-cadence-end.pipe';
import {NoSanitizerPipe} from './no-sanitizer.pipe';
import {MultiWordTitlecasePipe} from './multi-word-titlecase.pipe';
import {AdjectiveIconSrcPipe} from './adjective/adjective-icon-src.pipe';

@NgModule({
  imports: [CommonModule, PlanPipesModule],
  declarations: [
    BackgroundClassesPipe,
    ReplacePipe,
    DisplayFormatPipe,
    UnCamelCasePipe,
    TimeFormatPipe,
    WeekdayFormatPipe,
    WithLoadingPipe,
    InventoryFieldNamePipe,
    InventoryFieldOperatorsPipe,
    InventoryFieldOperatorNamePipe,
    InventoryFieldValuePipe,
    FormArrayControlPipe,
    ChildFormControlPipe,
    LogPipe,
    StringifyPipe,
    RangeMeasurementValuePipe,
    ArrayIncludesPipe,
    MomentPipe,
    DayOfWeekInMonthPipe,
    OrdinalPipe,
    ChildFormGroupPipe,
    SkedTemplateNamePipe,
    TimeAgoPipe,
    SplitPipe,
    HexToRgbaPipe,
    SkedNamePipe,
    SkedLinkPipe,
    UserAvatarPipe,
    IconNamePipe,
    InventoryPreviewDisplayPipe,
    SkedMidnightTimePipe,
    ColumnNamePipe,
    TaskCadenceStartPipe,
    TaskCadenceEndPipe,
    NoSanitizerPipe,
    MultiWordTitlecasePipe,
    AdjectiveIconSrcPipe,
  ],
  exports: [
    BackgroundClassesPipe,
    ReplacePipe,
    DisplayFormatPipe,
    UnCamelCasePipe,
    TimeFormatPipe,
    WeekdayFormatPipe,
    WithLoadingPipe,
    InventoryFieldNamePipe,
    InventoryFieldOperatorsPipe,
    InventoryFieldOperatorNamePipe,
    InventoryFieldValuePipe,
    FormArrayControlPipe,
    ChildFormControlPipe,
    LogPipe,
    StringifyPipe,
    RangeMeasurementValuePipe,
    ArrayIncludesPipe,
    MomentPipe,
    DayOfWeekInMonthPipe,
    OrdinalPipe,
    ChildFormGroupPipe,
    PlanPipesModule,
    SkedTemplateNamePipe,
    TimeAgoPipe,
    SplitPipe,
    HexToRgbaPipe,
    SkedNamePipe,
    SkedLinkPipe,
    UserAvatarPipe,
    IconNamePipe,
    InventoryPreviewDisplayPipe,
    SkedMidnightTimePipe,
    ColumnNamePipe,
    TaskCadenceStartPipe,
    TaskCadenceEndPipe,
    NoSanitizerPipe,
    MultiWordTitlecasePipe,
    AdjectiveIconSrcPipe,
  ],
})
export class PipesModule {}
