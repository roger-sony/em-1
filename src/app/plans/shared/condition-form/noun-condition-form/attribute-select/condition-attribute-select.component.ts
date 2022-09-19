import {Component, ChangeDetectionStrategy, Input, SimpleChanges, Output, EventEmitter, OnChanges} from '@angular/core';
import {FieldValues} from 'src/app/core/model/field-values';
import {PlanNounCondition} from 'src/app/core/model/plan-noun-condition';

@Component({
  selector: 'condition-attribute-select',
  templateUrl: './condition-attribute-select.component.html',
  styleUrls: ['./condition-attribute-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionAttributeSelectComponent implements OnChanges {
  @Input()
  public formValue: PlanNounCondition;

  @Input()
  public fieldValues: FieldValues;

  @Output()
  public valueChange = new EventEmitter<string>();

  public fieldKeys: string[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.fieldValues && this.fieldValues) {
      this.fieldKeys = this.createFieldKeys(this.fieldValues);
    }
  }

  public onAttributeSelect(value: string) {
    this.valueChange.emit(value);
  }

  public trackByTaskId(index: number, attribute: string): string {
    return attribute;
  }

  private createFieldKeys(fieldValues: FieldValues): string[] {
    return Object.keys(fieldValues)
      .concat('expiry_date', '_last_updated', 'qty')
      .filter(key => !['_trigger', 'unit_of_measure', 'subcategory'].includes(key));
  }
}
