import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AdjectiveModel} from '../../../sked.model';

@Component({
  selector: 'bottom-sheet-select',
  templateUrl: './bottom-sheet-select.component.html',
  styleUrls: ['./bottom-sheet-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetSelectComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {adjective: AdjectiveModel; multiselect: boolean},
    private bottomSheetRef: MatBottomSheetRef<BottomSheetSelectComponent>
  ) {}

  ngOnInit(): void {}

  selectOption(option: string) {
    if (!this.data.multiselect) {
      this.bottomSheetRef.dismiss(option);
    }
  }

  isOptionSelected(option: string) {
    return this.data.adjective.value?.includes(option);
  }

  onSelectionChange(option: string) {
    if (typeof this.data.adjective.value === 'string') {
      if (this.data.adjective.value?.includes(option)) {
        this.data.adjective.value = this.data.adjective.value
          ?.split(',')
          .filter(o => o !== o)
          .join(',');
      } else {
        this.data.adjective.value = [...this.data.adjective.value?.split(','), option].join(',');
      }
    } else if (Array.isArray(this.data.adjective.value)) {
      if (this.data.adjective.value?.includes(option)) {
        this.data.adjective.value = this.data.adjective.value.filter(o => o !== o);
      } else {
        this.data.adjective.value.push(option);
      }
    }
  }
}
