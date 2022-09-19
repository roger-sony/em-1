import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormArray, Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {UnitOfMeasureDto} from '../../../core/api/dto/unit-of-measure.dto';

/* tslint:disable:no-any */
@Component({
  selector: 'noun-measurement-settings',
  templateUrl: './measurement-settings.component.html',
  styleUrls: ['./measurement-settings.component.css'],
})
export class MeasurementSettingsComponent implements OnInit {
  objectKeys: any = Object.keys;
  @Input() config: UnitOfMeasureDto;
  @Input() unitOfMeasureOptions: any = [];
  @Input() nounType: string;
  @Output() updatedMeasurementSettings = new EventEmitter<any>();
  rangeOptions: FormArray; // FormControls for config.range_config

  form = this.fb.group({
    type: ['number', Validators.required],
    display_name: ['', Validators.required],
    noun_subcategory: ['', Validators.required],
    range_config: this.fb.array([]),
  });

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.setInitialFormValues();
    this.setInitialRangeOptions();

    this.onFormValueChange();
  }

  handleDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rangeOptions.value, event.previousIndex, event.currentIndex);
    console.log(this.rangeOptions);
  }

  handleAddClick(): void {
    const greatestExistingValue = Math.max.apply(
      Math,
      this.rangeOptions.getRawValue().map(r => r.value)
    );
    const newRangeOptionValue = greatestExistingValue + 1;
    this.addRangeOption(newRangeOptionValue, '');
  }

  handleDeleteClick(index: number): void {
    if (
      confirm(
        'Are you sure you want to delete this option? If any Nouns or Decision Tables are using this option, you will have to update them.'
      )
    ) {
      this.rangeOptions.removeAt(index);
    }
  }

  setInitialFormValues(): void {
    console.log('--Setting initial form values');
    this.f.noun_subcategory.setValue(this.config.noun_subcategory);
    this.f.display_name.setValue(this.config.display_name);

    // Change 11/12/19: The noun type now determines the unit of measure type.
    const unitOfMeasureType = this.nounType === 'abstract' ? 'range' : 'number';
    this.f.type.setValue(unitOfMeasureType);
  }

  setInitialRangeOptions(): void {
    if (this.config.range_config && this.config.range_config.length > 0) {
      this.config.range_config.forEach(option => {
        this.addRangeOption(option.value, option.display_value);
      });
    } else if (!this.rangeOptions && this.f.type.value === 'range') {
      this.addRangeOption(1, '');
    }
  }

  addRangeOption(value: number, displayValue: string): void {
    this.rangeOptions = this.form.get('range_config') as FormArray;
    this.rangeOptions.push(
      this.fb.group({
        value: value,
        display_value: [displayValue, Validators.required],
      })
    );
  }

  onFormValueChange(): void {
    this.form.valueChanges.subscribe(val => {
      console.log('Got a form change...', val);
      this.updatedMeasurementSettings.emit(val);
    });
  }
}
