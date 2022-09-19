import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {AutocompleteNounFilterService} from '../../../services/autocomplete-noun-filter.service';
import {trimString} from '../../utils/trim-string';

/* tslint:disable:no-any */
@Component({
  selector: 'app-autocomplete-noun-filters',
  templateUrl: './autocomplete-noun-filters.component.html',
  styleUrls: ['./autocomplete-noun-filters.component.css'],
})
export class AutocompleteNounFiltersComponent implements OnInit, OnChanges {
  @Input() options: any;
  @Input() placeholder: string = 'Text Value';
  @Input() currentValue: string;
  @Input() fieldRequired: boolean;
  @Input() fieldDisabled: boolean;
  @Input() wide: boolean = false;
  @Input() label: string;
  @Input() inputError: boolean = false;
  @Input() activeOptions: any;
  @Input() inactiveOptions: any;
  @Input() filterName: any;
  @Input() index: number;
  @Input() inputValue: any;
  inputText: any;
  autocompleteInputData: any;

  @Output()
  public valueChange = new EventEmitter<string>();

  constructor(private autoCompleteData: AutocompleteNounFilterService) {}

  ngOnInit() {
    this.autoCompleteData.currentMessage.subscribe(message => (this.autocompleteInputData = message));
  }

  ngOnChanges() {
    if (this.inputValue === '' || (this.autocompleteInputData && !this.autocompleteInputData.input)) {
      this.inputText = '';
    }
  }

  onFocus(): void {
    if (!this.filterName) {
      this.activeOptions = [];
      this.inactiveOptions = [];
    }
  }

  onChange(): void {
    this.autoCompleteData.changeMessage({input: this.inputText, index: this.index});
    this.valueChange.emit(this.inputText);
  }

  getWidth(): string {
    return this.wide ? '500px' : '201px';
  }

  onBlur(): void {
    this.autoCompleteData.changeMessage({input: trimString(this.inputText), index: this.index});
    this.valueChange.emit(this.inputText);
  }
}
