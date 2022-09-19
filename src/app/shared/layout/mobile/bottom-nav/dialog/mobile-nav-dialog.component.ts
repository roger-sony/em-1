import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MobileNavDialogType} from './mobile-nav-dialog-type';

@Component({
  selector: 'mobile-nav-dialog',
  templateUrl: './mobile-nav-dialog.component.html',
  styleUrls: ['./mobile-nav-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileNavDialogComponent {
  public readonly dialogType = MobileNavDialogType;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<MobileNavDialogComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public type: MobileNavDialogType
  ) {}

  public onItemClick() {
    this.bottomSheetRef.dismiss();
  }
}
