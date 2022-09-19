import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {FieldValues} from '../../../../core/model/field-values';
import {Observable} from 'rxjs';
import {debounceTime, startWith, map} from 'rxjs/operators';

@Component({
  selector: 'rule-attribute-select',
  templateUrl: './rule-attribute-select.component.html',
  styleUrls: ['./rule-attribute-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RuleAttributeSelectComponent implements OnChanges, OnInit {
  @Input()
  public fieldValues: FieldValues;

  @Input()
  public control: AbstractControl;

  public filteredAttributes$: Observable<string[]>;

  public fieldKeys: string[] = [];

  public ngOnInit() {
    this.filteredAttributes$ = this.observeFilteredAttributes();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.fieldValues && this.fieldValues) {
      this.fieldKeys = this.createFieldKeys(this.fieldValues);
    }
  }

  private observeFilteredAttributes(): Observable<string[]> {
    return this.control.valueChanges.pipe(
      debounceTime(200),
      startWith(''),
      map(
        nameValue =>
          this.fieldKeys?.filter(attribute => attribute.toLowerCase().includes(nameValue.toLowerCase())) || []
      )
    );
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
